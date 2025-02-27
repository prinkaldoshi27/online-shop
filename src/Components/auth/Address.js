import React, { useState, useEffect } from "react";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";

const AddressesPage = () => {
    const getStoredAddresses = () => {
        const storedAddresses = localStorage.getItem("addresses");
        return storedAddresses ? JSON.parse(storedAddresses) : [];
    };

    const [addresses, setAddresses] = useState(getStoredAddresses);
    const [defaultAddressId, setDefaultAddressId] = useState(null);
    const [formData, setFormData] = useState({ id: "", name: "", address: "", phone: "", postalCode: "" });
    const [isEditing, setIsEditing] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);

    useEffect(() => {
        localStorage.setItem("addresses", JSON.stringify(addresses));
    }, [addresses]);

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = () => {
        if (isEditing) {
            setAddresses(addresses.map(addr => addr.id === formData.id ? formData : addr));
        } else {
            setAddresses([...addresses, { ...formData, id: Date.now() }]);
        }
        setFormData({ id: "", name: "", address: "", phone: "", postalCode: "" });
        setIsEditing(false);
        setModalVisible(false);
    };

    const handleEdit = (address) => {
        setFormData(address);
        setIsEditing(true);
        setModalVisible(true);
    };

    const handleDelete = (id) => {
        setAddresses(addresses.filter(addr => addr.id !== id));
    };

    const handleSetDefault = (id) => {
        setDefaultAddressId(id);
    };

    return (
        <div>
            <h2>Manage Addresses</h2>
            <Button label="Add Address" icon="pi pi-plus" onClick={() => setModalVisible(true)} className="p-button-success" />

            <Dialog header="Add/Edit Address" visible={modalVisible} style={{ width: "450px", padding: "20px" }} onHide={() => setModalVisible(false)}>
                <div className="p-fluid">
                    <div className="p-field">
                        <label>Name</label>
                        <InputText name="name" value={formData.name} onChange={handleInputChange} required />
                    </div>
                    <div className="p-field">
                        <label>Address</label>
                        <InputText name="address" value={formData.address} onChange={handleInputChange} required />
                    </div>
                    <div className="p-field">
                        <label>Phone Number</label>
                        <InputText name="phone" value={formData.phone} onChange={handleInputChange} required />
                    </div>
                    <div className="p-field">
                        <label>Postal Code</label>
                        <InputText name="postalCode" value={formData.postalCode} onChange={handleInputChange} required />
                    </div>
                    <Button label={isEditing ? "Update" : "Add"} onClick={handleSubmit} className="p-button-primary" />
                </div>
            </Dialog>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))", gap: "10px", marginTop: "20px" }}>
                {addresses.map((addr) => (
                    <div key={addr.id} style={{ border: "1px solid #ccc", padding: "10px", borderRadius: "5px", background: addr.id === defaultAddressId ? "#d3ffd3" : "#f9f9f9", cursor: "pointer" }} onClick={() => handleSetDefault(addr.id)}>
                        <p><strong>{addr.name}</strong></p>
                        <p>{addr.address}, {addr.postalCode}</p>
                        <p>{addr.phone}</p>
                        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "5px" }}>
                            <Button icon="pi pi-pencil" label="Edit" onClick={(e) => { e.stopPropagation(); handleEdit(addr); }} className="p-button-text" />
                            <Button icon="pi pi-trash" label="Delete" onClick={(e) => { e.stopPropagation(); handleDelete(addr.id); }} className="p-button-danger p-button-text" />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AddressesPage;
