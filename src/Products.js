import React, { useState, useEffect, useRef } from 'react';
import { Button } from 'primereact/button';
import { DataView, DataViewLayoutOptions } from 'primereact/dataview';
import { Rating } from 'primereact/rating';
import { Tag } from 'primereact/tag';
import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';
import { Toast } from 'primereact/toast';
import Loader from './Loader';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { productsFetch } from './features/ProductSlice';
import { addToCart, removeFromCart, increaseQuantity, decreaseQuantity } from './features/CartSlice';

export default function Products() {
    const toast = useRef(null);

    const showIncrease = () => {
        toast.current.show({ severity: 'success', summary: 'Product Adding', detail: 'Product Added Successfully', life: 3000 });
    }


    const showDecrease = () => {
        toast.current.show({ severity: 'info', summary: 'Product Removing', detail: 'Product Removed Successfully', life: 3000 });
    }

    const showRemove = () => {
        toast.current.show({ severity: 'error', summary: 'Product Removing', detail: 'Product Removed from the Cart Successfully', life: 3000 });
    }



    const [filteredProducts, setFilteredProducts] = useState([]);
    const [layout, setLayout] = useState('grid');
    const [sortKey, setSortKey] = useState('');
    const [sortOrder, setSortOrder] = useState(0);
    const [sortField, setSortField] = useState('');
    const [search, setSearch] = useState('');

    const { products, status } = useSelector(state => state.products);
    const productList = products?.ProductService || [];

    const dispatch = useDispatch();


    const handleCart = (product) => {
        dispatch(addToCart(product));
        showIncrease();
    }

    const cart = useSelector((state) => state.cart);
    const cartItems = cart?.cartItems || [];

    useEffect(() => {
        dispatch(productsFetch());
    }, [dispatch]);

    useEffect(() => {
        if (status === 'loading') {
            setFilteredProducts([]);
        } else if (productList.length > 0) {
            setFilteredProducts(productList);
        }
    }, [status, productList]);

    const sortOptions = [
        { label: 'Price High to Low', value: '!price' },
        { label: 'Price Low to High', value: 'price' }
    ];

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
        setFilteredProducts(productList.filter((product) => product.name.toLowerCase().includes(searchValue)));
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


    const incQuantity = (id, amount) => {
        dispatch(increaseQuantity(id, amount));
        showIncrease();
    }

    const decQuantity = (id, amount) => {
        {cartItems.map((cart) => 
        {
            if(cart.id === id && cart.cartQuantity > 1)
            {
                dispatch(decreaseQuantity(id, amount));
                showDecrease();
            } else{
                dispatch(removeFromCart(id, amount));
                showRemove();
            }
        })
        } 
    }

    const listItem = (product) => (
        <div className="col-12" key={product.id}>
            <div className="flex flex-column xl:flex-row xl:align-items-start p-4 gap-4"
                style={{ marginTop: '1rem', border: '1px solid lightgrey', borderRadius: '8px' }}>
                <img className="w-9 sm:w-16rem xl:w-10rem shadow-2" src={`https://primefaces.org/cdn/primereact/images/product/${product.image}`} alt={product.name} />
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
                        <Button onClick={
                            () => { incQuantity(product.id, product.price);; }
                        } icon="pi pi-shopping-cart" className="p-button-rounded" disabled={product.inventoryStatus === 'OUTOFSTOCK'}></Button>
                    </div>
                </div>
            </div>
        </div>
    );

    const gridItem = (product) => (
        <div className="col-12 sm:col-6 lg:col-4 p-2" key={product.id} style={{ minWidth: "250px" }}>
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
                    <img className="w-9 shadow-2 border-round" src={`https://primefaces.org/cdn/primereact/images/product/${product.image}`} alt={product.name} />
                    <div className="text-2xl font-bold">{product.name}</div>
                    <Rating value={product.rating} readOnly cancel={false} />
                </div>
                <div className="flex align-items-center justify-content-between">
                    <span className="text-2xl font-semibold">${product.price}</span>
                    {cartItems.map((cart) =>
                        cart.id === product.id ? (
                            <div key={cart.id} className="flex items-center gap-3">
                                <Button icon="pi pi-minus" onClick={() => {
                                    decQuantity(product.id, product.price);;
                                }} className="p-button-rounded p-button-outlined" />
                                <div className="flex items-center justify-center mt-2">
                                    <span className="text-xl font-semibold">{cart.cartQuantity}</span>
                                </div>
                                <Button icon="pi pi-plus" onClick={() => {
                                    incQuantity(product.id, product.price);;
                                }} className="p-button-rounded" />
                            </div>
                        ) : null
                    )}

                    {!cartItems.some(cart => cart.id === product.id) && (
                        <Button
                            onClick={() => { handleCart(product);  }}
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
        <div className="flex flex-column sm:flex-row justify-between gap-7 w-full " >
            <div className="flex sm:w-1/2">
                <InputText
                    style={{ width: "90vh" }}
                    value={search}
                    onChange={handleSearch}
                    placeholder="Search products..."
                />
            </div>

            <div className="flex gap-3 sm:ml-auto">
                <Dropdown options={sortOptions} value={sortKey} optionLabel="label" placeholder="Sort By Price" onChange={onSortChange} className="w-14rem" />
                <DataViewLayoutOptions layout={layout} onChange={(e) => setLayout(e.value)} />
            </div>
        </div>
    );


    return (
        status === 'loading' ? <Loader /> :
            <div style={{
                marginRight: '1rem',
            }}>
                <Toast ref={toast} />
                <DataView
                    value={filteredProducts}
                    itemTemplate={(product) => itemTemplate(product, layout)}
                    layout={layout}
                    header={header()}
                    sortField={sortField}
                    sortOrder={sortOrder}
                />
            </div>

    );
}

