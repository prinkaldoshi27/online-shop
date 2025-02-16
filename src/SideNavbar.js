import React from "react";
import { Menu } from "primereact/menu";

const SideNavbar = () => {
    let items = [
        {
            label: "Products",
            icon: "pi pi-fw pi-file",
            items: [
                { label: "Add New Product", icon: "pi pi-fw pi-plus", url: "/add-products" },
                { label: "Search Products", icon: "pi pi-fw pi-search", url: "/search-products" }
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
        }
    ];

    return (
        <div style={{ width: "250px", height: "85%", backgroundColor: "#f8f9fa" }}>
            <Menu model={items} style={{ width: "100%", height: "100%" }} />
        </div>
    );
};

export default SideNavbar;
