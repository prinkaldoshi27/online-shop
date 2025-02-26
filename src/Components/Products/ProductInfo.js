import React, { useState, useEffect,useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from 'primereact/button';
import { Rating } from 'primereact/rating';
import { Tag } from 'primereact/tag';
import { InputTextarea } from 'primereact/inputtextarea';
import { InputText } from 'primereact/inputtext';
import { Panel } from 'primereact/panel';
import { Divider } from 'primereact/divider';
import { Avatar } from 'primereact/avatar';
import axios from 'axios';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { productsFetch, itemUpdate } from '../../features/ProductSlice';
import { addToCart, removeFromCart, increaseQuantity, decreaseQuantity } from '../../features/CartSlice';
import { Toast } from 'primereact/toast';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';

const ProductInfo = () => {
    const location = useLocation();
    const { product } = location.state || {};
    const navigate = useNavigate();
        const toast = useRef(null);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState({ name: "", rating: 5, comment: "" });
    const [loading, setLoading] = useState(false);
    const [visibleComments, setVisibleComments] = useState(4);

    const cart = useSelector((state) => state.cart);
    const cartItems = cart?.cartItems || [];
    const handleCart = (product) => {
        dispatch(addToCart(product));
        showIncrease();
    }

    useEffect(() => {
        const calculateAverageRating = (comments) => {
            if (!comments.length) return 0;
            const sum = comments.reduce((total, c) => total + c.rating, 0);
            return (sum / comments.length).toFixed(1);
        };
        calculateAverageRating(comments)
    }, [product.comments])

    const dispatch = useDispatch();

    useEffect(() => {
        setTimeout(() => {
            dispatch(productsFetch())
        }, 1000)
    }, [dispatch]);

    useEffect(() => {
        if (product?._id) {
            axios.get(`https://online-shop-backend-production.up.railway.app/products/${product._id}`)
                .then(response => setComments(response.data.comments || []))
                .catch(error => console.error("Error fetching comments:", error));
        }
    }, [product?._id]);

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
    
    if (!product) return <p className="text-center text-gray-500 mt-10">Product not found!</p>;

    const handleAddComment = async () => {
        if (newComment.name && newComment.comment) {
            setLoading(true);
            try {
                await axios.post(`https://online-shop-backend-production.up.railway.app/products/${product._id}/comments`, newComment);
                setComments([...comments, newComment]);
                setNewComment({ name: "", rating: 5, comment: "" });
            } catch (error) {
                console.error("Error adding comment:", error);
            } finally {
                setLoading(false);
            }
        }
    };

    const ratingCounts = [5, 4, 3, 2, 1].map(star => ({
        rating: `${star} Stars`,
        count: comments.filter(c => c.rating === star).length
    }));

    return (
        <div className="p-5 bg-gray-100 min-h-screen">
               <Toast ref={toast} />
            <div className="grid">
                <div className="col-12 md:col-5 flex justify-content-center">
                    <img
                        src={product.image}
                        alt={product.name}
                        className="w-8 border-round shadow-3 bg-white p-3"
                        style={{ maxHeight: "350px", objectFit: "contain" }}
                    />
                </div>
                <div className="col-12 md:col-7">
                    <h1 className="text-3xl font-bold">{product.name}</h1>
                    <Rating value={comments.length ? (comments.reduce((sum, c) => sum + c.rating, 0) / comments.length).toFixed(1) : 0} readOnly cancel={false} />
                    <p className="text-lg font-semibold text-primary mt-2">Price: <span className="text-2xl">${product.price}</span></p>
                    <p className="mt-3 text-justify text-gray-600">{product.description}</p>
                    <Tag value={product.inventoryStatus} className="mt-2 text-sm" severity={{ INSTOCK: 'success', LOWSTOCK: 'warning', OUTOFSTOCK: 'danger' }[product.inventoryStatus]} />
                    <div className="mt-4 flex gap-3">
                        
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
                            <Button label="Add to Cart" icon="pi pi-shopping-cart" className="p-button-rounded p-button-success"
                                onClick={() => { handleCart(product); }} />
                                            )}
                        
                     
                        <Button label="Back" icon="pi pi-arrow-left" className="p-button-text" onClick={() => navigate(-1)} />
                    </div>
                </div>
            </div>

            <div className="mt-6 p-4 bg-white shadow-md border-round grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <h3 className="text-lg font-semibold">Leave a Review</h3>
                    <InputText value={newComment.name} onChange={(e) => setNewComment({ ...newComment, name: e.target.value })} className="w-full p-2 text-sm border rounded-md" placeholder="Your Name" />
                    <Rating value={newComment.rating} onChange={(e) => setNewComment({ ...newComment, rating: e.value })} cancel={false} className='py-3' />
                    <InputTextarea value={newComment.comment} onChange={(e) => setNewComment({ ...newComment, comment: e.target.value })} className="w-full p-2 text-sm border rounded-md" rows={3} placeholder="Your Review" />
                    <Button label={loading ? "Submitting..." : "Submit Review"} className="p-button-sm p-button-primary w-full" onClick={handleAddComment} disabled={loading} />
                </div>
                <div>
                    <h3 className="text-lg font-semibold">Rating Distribution</h3>
                    <ResponsiveContainer width="100%" height={200}>
                        <BarChart data={ratingCounts} layout="vertical" margin={{ left: 20 }}>
                            <XAxis type="number" hide />
                            <YAxis dataKey="rating" type="category" width={80} />
                            <Tooltip />
                            <Bar dataKey="count" fill="#3182CE" barSize={20} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>

            <div className="mt-6 p-4 bg-white shadow-md border-round">
                <h2 className="text-lg font-semibold">Customer Reviews</h2>
                <Divider />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {comments.slice(0, visibleComments).map((c, index) => (
                        <Panel key={index} header={
                            <div className="flex items-center gap-2">
                                <Avatar label={c.name[0].toUpperCase()} shape="circle" />
                                <span className="font-medium">{c.name}</span>
                                <Rating value={c.rating} readOnly cancel={false} className="scale-90" />
                            </div>
                        }>
                            <p className="text-sm text-gray-600">{c.comment}</p>
                        </Panel>
                    ))}
                </div>
                {comments.length > visibleComments && (
                    <Button label="Load More Comments" className="p-button-text mt-3" onClick={() => setVisibleComments(visibleComments + 4)} />
                )}
            </div>
        </div>
    );
};

export default ProductInfo;