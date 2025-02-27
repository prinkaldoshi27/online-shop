import React, { useState, useEffect, useRef } from 'react';
import { Button } from 'primereact/button';
import { DataView, DataViewLayoutOptions } from 'primereact/dataview';
import { Rating } from 'primereact/rating';
import { Tag } from 'primereact/tag';
import { useNavigate } from 'react-router-dom';
import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';
import Loader from './Loader';
import { Toast } from 'primereact/toast';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { productsFetch } from '../../features/ProductSlice';
import { addToCart, removeFromCart, increaseQuantity, decreaseQuantity } from '../../features/CartSlice';

export default function Products() {
    const navigate = useNavigate();

    const toast = useRef(null);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [layout, setLayout] = useState('grid');
    const [sortKey, setSortKey] = useState('');
    const [sortOrder, setSortOrder] = useState(0);
    const [sortField, setSortField] = useState('');
    const [search, setSearch] = useState('');

    const { products, status } = useSelector(state => state.products);


    const cart = useSelector((state) => state.cart);
    const cartItems = cart?.cartItems || [];
    const handleCart = (product) => {
        dispatch(addToCart(product));
        showIncrease();
    }

    const dispatch = useDispatch();

    useEffect(() => {
        setTimeout(() => {
            dispatch(productsFetch())
        }, 1000)
    }, [dispatch]);

    useEffect(() => {
        if (status === 'loading') {
            setFilteredProducts([]);
        } else if (products.length > 0) {
            setFilteredProducts(products);
        }
    }, [status, products]);



    const sortOptions = [
        { label: 'Price High to Low', value: '!price' },
        { label: 'Price Low to High', value: 'price' }
    ];

    const showIncrease = () => {
        toast.current.show({ severity: 'success', summary: 'Product Adding', detail: 'Product Added Successfully', life: 3000 });
    }

    const showDecrease = () => {
        toast.current.show({ severity: 'info', summary: 'Product Removing', detail: 'Product Removed Successfully', life: 3000 });
    }

    const showRemove = () => {
        toast.current.show({ severity: 'error', summary: 'Product Removing', detail: 'Product Removed from the Cart Successfully', life: 3000 });
    }

    const incQuantity = (id, amount) => {
        dispatch(increaseQuantity(id, amount));
        showIncrease();
    }

    const decQuantity = (id, amount) => {
        {
            const cartItem = cartItems.find((cart) => cart.id === id);
            if (cartItem) {
                if (cartItem.cartQuantity > 1) {
                    dispatch(decreaseQuantity(id, amount));
                    showDecrease();
                } else {
                    dispatch(removeFromCart(id, amount));
                    showRemove();
                }
            }
        }
    }

    const onSortChange = (event) => {
        const value = event.value;
        if (value.indexOf('!') === 0) {
            setSortOrder(-1);
            setSortField(value.substring(1));
        } else {
            setSortOrder(1);
            setSortField(value);
        }
        setSortKey(value);
    };

    const handleSearch = (e) => {
        const searchValue = e.target.value.toLowerCase();
        setSearch(searchValue);
        setFilteredProducts(products.filter((product) => product.name.toLowerCase().includes(searchValue)));
    };

    const getSeverity = (product) => {
        switch (product.inventoryStatus) {
            case 'INSTOCK':
                return 'success';
            case 'LOWSTOCK':
                return 'warning';
            case 'OUTOFSTOCK':
                return 'danger';
            default:
                return null;
        }
    };

    const listItem = (product) => (
        <div className="col-12" key={product.id} onClick={() => navigate('/product-info', { state: { product } })} style={{ cursor: 'pointer' }}>
            <div className="flex flex-column xl:flex-row xl:align-items-start p-4 gap-4"
                style={{ marginTop: '1rem', border: '1px solid lightgrey', borderRadius: '8px' }}>
                <img className="w-9 sm:w-16rem xl:w-10rem shadow-2" src={product.image} alt={product.name} />
                <div className="flex flex-column sm:flex-row justify-content-between align-items-center xl:align-items-start flex-1 gap-4">
                    <div className="flex flex-column align-items-center sm:align-items-start gap-3">
                        <div className="text-2xl font-bold text-900">{product.name}</div>
                        <Rating value={product.rating} readOnly cancel={false} />
                        <div className="flex align-items-center gap-3">
                            <span className="flex align-items-center gap-2">
                                <i className="pi pi-tag"></i>
                                <span className="font-semibold">{product.category}</span>
                            </span>
                            <Tag value={product.inventoryStatus} severity={getSeverity(product)}></Tag>
                        </div>
                    </div>
                    <div className="flex sm:flex-column align-items-center sm:align-items-end gap-3 sm:gap-2">
                        <span className="text-2xl font-semibold">${product.price}</span>
                        {cartItems.map((cart) =>
                            cart.id === product.id ? (
                                <div key={cart.id} className="flex items-center gap-3">
                                    <Button
                                        icon="pi pi-minus"
                                        onClick={() => decQuantity(product.id, product.price)}
                                        className="p-button-rounded p-button-outlined"
                                    />

                                    <div className="flex items-center justify-center mt-2">
                                        <span className="text-xl font-semibold">{cart.cartQuantity}</span>
                                    </div>

                                    <Button
                                        icon="pi pi-plus"
                                        onClick={() => incQuantity(product.id, product.price)}
                                        className="p-button-rounded"
                                        disabled={cart.cartQuantity >= product.quantity}
                                    />
                                </div>
                            ) : null
                        )}
                        {!cartItems.some(cart => cart.id === product.id) && (
                            <Button
                                onClick={() => { handleCart(product); }}
                                icon="pi pi-shopping-cart"
                                className="p-button-rounded"
                                disabled={product.inventoryStatus === 'OUTOFSTOCK'}
                            />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );

    const gridItem = (product) => (
        <div className="col-12 sm:col-6 lg:col-4 p-2" key={product.id} onClick={() => navigate('/product-info', { state: { product } })} style={{ cursor: 'pointer' }}>
            <div className="p-4 surface-card"
                style={{ marginTop: '1rem', border: '1px solid lightgrey', borderRadius: '8px' }}>
                <div className="flex flex-wrap align-items-center justify-content-between gap-2">
                    <div className="flex align-items-center gap-2">
                        <i className="pi pi-tag"></i>
                        <span className="font-semibold">{product.category}</span>
                    </div>
                    <Tag value={product.inventoryStatus} severity={getSeverity(product)}></Tag>
                </div>
                <div className="flex flex-column align-items-center gap-3 py-5">
                    <img className="w-9 shadow-2 border-round" src={product.image} alt={product.name}
                        style={{
                            height: '150px',
                            width: '200px'
                        }}
                    />
                    <div className="text-2xl font-bold">{product.name}</div>
                    <Rating value={product.rating} readOnly cancel={false} />
                </div>
                <div className="flex align-items-center justify-content-between">
                    <span className="text-2xl font-semibold">${product.price}</span>

                    {cartItems.map((cart) =>
                        cart.id === product.id ? (
                            <div key={cart.id} className="flex items-center gap-3">
                                <Button
                                    icon="pi pi-minus"
                                    onClick={() => decQuantity(product.id, product.price)}
                                    className="p-button-rounded p-button-outlined"
                                />

                                <div className="flex items-center justify-center mt-2">
                                    <span className="text-xl font-semibold">{cart.cartQuantity}</span>
                                </div>

                                <Button
                                    icon="pi pi-plus"
                                    onClick={() => incQuantity(product.id, product.price)}
                                    className="p-button-rounded"
                                    disabled={cart.cartQuantity >= product.quantity}
                                />
                            </div>
                        ) : null
                    )}
                    {!cartItems.some(cart => cart.id === product.id) && (
                        <Button
                            onClick={() => { handleCart(product); }}
                            icon="pi pi-shopping-cart"
                            className="p-button-rounded"
                            disabled={product.inventoryStatus === 'OUTOFSTOCK'}
                        />
                    )}

                </div>
            </div>
        </div>
    );

    const itemTemplate = (product, layout) => {
        if (!product) return;
        return layout === 'list' ? listItem(product) : gridItem(product);
    };

    const header = () => (
        <div className="flex flex-column sm:flex-row justify-content-between align-items-center gap-3 w-full">
            {/* Search Input */}
            <div className="flex w-full sm:w-6 md:w-4 lg:w-3">
                <InputText
                    value={search}
                    onChange={handleSearch}
                    placeholder="Search products..."
                    className="w-full"
                />
            </div>

            {/* Dropdown and Layout Options */}
            <div className="flex flex-column sm:flex-row gap-3 w-full sm:w-auto">
                <Dropdown
                    options={sortOptions}
                    value={sortKey}
                    optionLabel="label"
                    placeholder="Sort By Price"
                    onChange={onSortChange}
                    className="w-full sm:w-14rem"
                />
                <DataViewLayoutOptions
                    layout={layout}
                    onChange={(e) => setLayout(e.value)}
                    className="w-full sm:w-auto"
                />
            </div>
        </div>
    );

    return (
        <>
            <Toast ref={toast} />

            {status === 'loading' && (
                <>
                    <Loader />
                    <p>Loading products...</p>
                </>
            )}

            {status !== 'loading' && filteredProducts.length > 0 ? (
                <div style={{ marginRight: '1rem' }}>
                    <DataView
                        value={[...filteredProducts].reverse()}
                        itemTemplate={(product) => itemTemplate(product, layout)}
                        layout={layout}
                        header={header()}
                        sortField={sortField}
                        sortOrder={sortOrder}
                    />
                </div>
            ) : (
                status !== 'loading' && <Loader />
            )}
        </>
    );
}