import React from "react";
import { Menu } from "primereact/menu";
import { Badge } from "primereact/badge";
import { Button } from "primereact/button";
import { useSelector } from "react-redux";

const SideNavbar = () => {
    const cart = useSelector((state) => state.cart);
    const cartItems = cart?.cartItems || [];
    let items = [
        {
            label: "Products",
            icon: "pi pi-fw pi-file",
            items: [
                { label: "Add New Product", icon: "pi pi-fw pi-plus", url: "/add-products" },
                { label: "Search Products", icon: "pi pi-fw pi-search", url: "/" }
            ]
        },
        {
            label: "Orders",
            icon: "pi pi-fw pi-shopping-cart",
            items: [
                { label: "View Orders", icon: "pi pi-fw pi-cog" },
                { label: "Search Orders", icon: "pi pi-fw pi-search" }
            ]
        },
        {
            label: "Customers",
            icon: "pi pi-fw pi-user",
            items: [
                { label: "Add New Customer", icon: "pi pi-fw pi-plus" },
                { label: "Search Customers", icon: "pi pi-fw pi-search" }
            ]
        },
    ];

    return (
        <div className="flex flex-column justify-between" style={{ width: "250px", height: "100vh", backgroundColor: "#f8f9fa", padding: "1rem" }}>
            <Menu model={items} style={{ width: "100%" }} />

            <Button
                label="My Cart"
                icon="pi pi-shopping-cart"
                className="p-button-outlined p-button-primary w-full mt-3"
                onClick={() => window.location.href = "/cart"}
            >
                <Badge value={cartItems.length} severity="warning" />
            </Button>
        </div>
    );
};

export default SideNavbar;
