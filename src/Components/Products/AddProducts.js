import { Card } from "primereact/card";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { Button } from "primereact/button";
import { InputNumber } from "primereact/inputnumber";
import { Dropdown } from "primereact/dropdown";
import ImageUpload from "./ImageUpload";
import { useState, useEffect, useRef } from "react";
import { productsCreate, productsFetch } from "../../features/ProductSlice";
import { useDispatch } from "react-redux";
import { Toast } from "primereact/toast";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const AddProducts = () => {
    const [imageUrl, setImageUrl] = useState(null);
    const dispatch = useDispatch();
    const rating = Math.floor(Math.random() * 5) + 1;
    useEffect(() => {
        setTimeout(() => {
            dispatch(productsFetch())
        }, 1000)
    }, [dispatch]);
      const { products, status } = useSelector(state => state.products);
     const newId = products.length > 0 ? products[products.length - 1].id + 1 : 1;
    
     {
        console.log(newId)
     }
    const toast = useRef(null);
    const labelStyle = {
        width: "fit-content",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
    };

    const [product, setProduct] = useState({
        id: "",
        name: "",
        description: "",
        price: null,
        category: null,
        quantity: null,
        inventoryStatus: null,
        rating: null,
        image: null
    });

    const categories = [
        { label: "Electronics", value: "Electronics" },
        { label: "Clothing", value: "Clothing" },
        { label: "Fitness", value: "Fitness" },
        { label: "Accessories", value: "Accessories" }
    ];

    useEffect(() => {
        if (product.quantity > 10) {
            setProduct((prevProduct) => ({
                ...prevProduct,
                inventoryStatus: "INSTOCK"
            }));
        } else if (product.quantity > 0 && product.quantity <= 10) {
            setProduct((prevProduct) => ({
                ...prevProduct,
                inventoryStatus: "LOWSTOCK"
            }));
        } else if (product.quantity === 0) {
            setProduct((prevProduct) => ({
                ...prevProduct,
                inventoryStatus: "OUTOFSTOCK"
            }));
        }
    }, [product.quantity]);



    const handleChange = (e, field) => {
        setProduct({ ...product, [field]: e.value ?? e.target.value });
    };

    const showSuccess = () => {
        toast.current.show({ severity: "success", summary: "Success", detail: "Product Added Successfully", life: 3000 });
    };

     const handleSubmit = async (e) => {
         setProduct((prevProduct) => ({
             ...prevProduct,
             id: newId,
             rating: rating
         }));
         e.preventDefault();
         dispatch(productsCreate(product))
             .unwrap()
             .then(() => {
                 showSuccess();
                 setProduct({
                    id: "",
                     name: "",
                     description: "",
                     price: null,
                     category: "",
                     quantity: null,
                     inventoryStatus: "",
                     rating: null,
                     image: null
                 });
                 setImageUrl(null);
                 Navigate("/");
             dispatch(productsFetch());
         })
             .catch((error) => {
                 console.error("Submission Error:", error);
             });
     };

    useEffect(() => {
        if (imageUrl) {
            setProduct((prevProduct) => ({
                ...prevProduct,
                image: imageUrl
            }));
        }
    }, [imageUrl]);

    return (
        <form onSubmit={handleSubmit}>
            <Toast ref={toast} />
            <div className="flex justify-center p-4">
                <Card className="shadow-3 w-full max-w-5xl pl-6">
                    <h2 className="text-2xl font-semibold mb-6">Add Product</h2>
                    <div className="flex flex-col lg:flex-row gap-6">
                        <div className="w-full lg:w-3/5">
                            <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="flex items-center gap-4">
                                        <label htmlFor="name" className="font-medium"
                                            style={labelStyle}
                                        >Name</label>
                                    <InputText id="name" value={product.name} onChange={(e) => handleChange(e, "name")} className="w-full" />
                                    <div className="flex-1 flex flex-col gap-2">
                                        <label htmlFor="price" className="font-medium" style={labelStyle}>Price</label>
                                        <InputNumber id="price" value={product.price} onChange={(e) => handleChange(e, "price")} mode="currency" currency="USD" className="w-full" />
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="flex-1 flex flex-col gap-2">
                                        <label htmlFor="category" className="font-medium" style={labelStyle}>Category</label>
                                        <Dropdown id="category" options={categories} value={product.category} onChange={(e) => handleChange(e, "category")} placeholder="Select a Category" className="w-full" />
                                    </div>
                                    <div className="flex-1 flex flex-col gap-2">
                                        <label htmlFor="quantity" className="font-medium" style={labelStyle}>Quantity</label>
                                        <InputNumber id="quantity" value={product.quantity} onChange={(e) => handleChange(e, "quantity")} className="w-full" />
                                    </div>
                                </div>
                                <div className="col-span-1 md:col-span-2 flex flex-col gap-2 w-full">
                                    <label htmlFor="description" className="font-medium">Description</label>
                                    <InputTextarea id="description" rows={5} value={product.description}
                                        onChange={(e) => handleChange(e, "description")}
                                        className="w-full"
                                    />
                                </div>

                            </form>
                        </div>

                        <div
                            className="w-full lg:w-2/5 flex flex-col items-center justify-center lg:border-l lg:pl-6 overflow-y-auto"
                            style={{ maxHeight: "420px" }}
                        >
                            <ImageUpload imageUrl={imageUrl} setImageUrl={setImageUrl} />
                        </div>

                    </div>
                    <div className="flex justify-center mt-3">
                        <Button label="Add Product" icon="pi pi-check" className="px-6 py-3" />
                    </div>
                </Card>
            </div>
        </form>
    );
};

export default AddProducts;
