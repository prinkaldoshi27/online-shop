import { Card } from "primereact/card";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { Button } from "primereact/button";
import { InputNumber } from "primereact/inputnumber";
import { Dropdown } from "primereact/dropdown";
import ImageUpload from "./ImageUpload";
import { useState } from "react";

const AddProducts = () => {
    const labelStyle = {
        width: "fit-content",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
    };
    const [product, setProduct] = useState({
        code: "",
        name: "",
        description: "",
        price: null,
        category: "",
        quantity: null,
        inventoryStatus: "",
        rating: null
    });

    const categories = [
        { label: "Electronics", value: "electronics" },
        { label: "Clothing", value: "clothing" },
        { label: "Fitness", value: "Fitness" },
        { label: "Accessories", value: "Accessories" }
    ];

    const stocks = [
        { label: "In Stock", value: "instock" },
        { label: "Low Stock", value: "lowstock" },
        { label: "Out of Stock", value: "outstock" }
    ];

    const handleChange = (e, field) => {
        setProduct({ ...product, [field]: e.value ?? e.target.value });
    };

    return (
        <div className="flex justify-center p-4">
            <Card className="shadow-3 w-full max-w-5xl pl-6">
                <h2 className="text-2xl font-semibold mb-6">Add Product</h2>

                {/* Main Flex Layout (60-40 Split) */}
                <div className="flex flex-col lg:flex-row gap-6">

                    {/* Left Section - Form (60%) */}
                    <div className="w-full lg:w-3/5">
                        <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            { /* Row 1: Code and Name */}
                                                        <div className="flex items-center gap-4">
                                                            <div className="flex gap-4 items-center">
                                    <label htmlFor="code" className="font-medium w-32 flex items-center" style={labelStyle} >Code</label>
                                                                <InputText id="code" value={product.code} onChange={(e) => handleChange(e, "code")} className="flex-1" />
                                                            </div>

                                                            <div className="flex-1 flex flex-col gap-2 justify-center">
                                                                <label htmlFor="name" className="font-medium"
                                        style={labelStyle}
                                                                >Name</label>
                                                                <InputText id="name" value={product.name} onChange={(e) => handleChange(e, "name")} className="w-full" />
                                                            </div>
                                                        </div>

                                                        {/* Row 2: Inventory Status and Price */}
                            <div className="flex items-center gap-4">
                                <div className="flex-1 flex flex-col gap-2" style={{ width: "100%" }}>
                                    <label htmlFor="inventoryStatus" className="font-medium" style={labelStyle}>Status</label>
                                    <Dropdown
                                        id="inventoryStatus"
                                        options={stocks}
                                        value={product.inventoryStatus}
                                        onChange={(e) => handleChange(e, "inventoryStatus")}
                                        className="w-full"
                                        style={{ minWidth: "250px", width: "100%" }}
                                    />
                                </div>

                                <div className="flex-1 flex flex-col gap-2">
                                    <label htmlFor="price" className="font-medium" style={labelStyle}>Price</label>
                                    <InputNumber id="price" value={product.price} onChange={(e) => handleChange(e, "price")} mode="currency" currency="USD" className="w-full" />
                                </div>
                            </div>

                            {/* Row 3: Category and Quantity */}
                            <div className="flex items-center gap-4">
                                <div className="flex-1 flex flex-col gap-2">
                                    <label htmlFor="category" className="font-medium" style={labelStyle}>Category</label>
                                    <Dropdown id="category" options={categories} value={product.category} onChange={(e) => handleChange(e, "category")} placeholder="Select a Category" className="w-full" />
                                </div>
                                <div className="flex-1 flex flex-col gap-2">
                                    <label htmlFor="quantity" className="font-medium" style={labelStyle}>Quantity</label>
                                    <InputNumber id="quantity"  value={product.quantity} onChange={(e) => handleChange(e, "quantity")} className="w-full" />
                                </div>
                            </div>

                            {/* Row 4: Description (Full Width) */}
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
                        <ImageUpload />
                    </div>

                    </div>

                    {/* Button Centered at the Bottom */}
                <div className="flex justify-center mt-3">
                    <Button label="Add Product" icon="pi pi-check" className="px-6 py-3" />
                </div>
            </Card>
        </div>
    );
};

export default AddProducts;