import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Calendar } from "primereact/calendar";
import { Dropdown } from "primereact/dropdown";
import ImageUpload from "./ImageUpload";
import { userDelete, userUpdate, usersFetch } from "../../features/UserSlice";
import { Toast } from "primereact/toast";
import { Dialog } from "primereact/dialog";
import { useNavigate } from "react-router-dom";

export default function ProfilePage({ user }) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const toast = useRef(null);

    const [editUser, setEditUser] = useState({ ...user });
    const [dob, setDob] = useState(user.dob ? new Date(user.dob) : null);
    const [imageUrl, setImageUrl] = useState(user.image || "");
    const [deleteDialogVisible, setDeleteDialogVisible] = useState(false);

    const countries = [
        { label: "United States", value: "US" },
        { label: "India", value: "IN" },
        { label: "United Kingdom", value: "UK" },
        { label: "Canada", value: "CA" }
    ];

    const genders = [
        { label: "Male", value: "Male" },
        { label: "Female", value: "Female" },
        { label: "Other", value: "Other" }
    ];

    useEffect(() => {
        dispatch(usersFetch());
    }, [dispatch]);

    useEffect(() => {
        if (imageUrl) {
            setEditUser((prevUser) => ({ ...prevUser, image: imageUrl }));
        }
    }, [imageUrl]);

    const showToast = (severity, summary, detail) => {
        toast.current.show({ severity, summary, detail, life: 3000 });
    };

    const handleUpdateUser = async () => {
        try {
            await dispatch(userUpdate({ id: editUser._id, updatedData: editUser }));
            showToast("success", "Success", "Profile Updated Successfully");
            dispatch(usersFetch());
        } catch (error) {
            console.error("Error updating user:", error);
        }
    };

    const handleDeleteUser = async () => {
        try {
            await dispatch(userDelete(user._id));
            setDeleteDialogVisible(false);
            navigate("/signin");
        } catch (error) {
            console.error("Error deleting user:", error);
        }
    };

    return (
        <div className="flex flex-column justify-content-center p-8">
            <Toast ref={toast} />

            <div className="flex flex-column md:flex-row bg-white rounded-lg shadow-lg w-3/4 md:w-1/2">
                <div className="flex flex-column  md:w-1/3">
                    <ImageUpload imageUrl={imageUrl} setImageUrl={setImageUrl} />
                </div>

                <div className="w-full md:w-2/3 px-5">
                    <div className="grid grid-cols-1 gap-4">
                        <div>
                            <label className="block text-lg font-semibold mb-2">Name</label>
                            <InputText className="w-full" value={editUser.name} onChange={(e) => setEditUser({ ...editUser, name: e.target.value })} />
                        </div>
                        <div>
                            <label className="block text-lg font-semibold mb-2">Email</label>
                            <InputText className="w-full" disabled value={editUser.email} />
                        </div>
                        <div>
                            <label className="block text-lg font-semibold mb-2">Phone Number</label>
                            <InputText className="w-full" value={editUser.phone} onChange={(e) => setEditUser({ ...editUser, phone: e.target.value })} />
                        </div>
                        <div>
                            <label className="block text-lg font-semibold mb-2">Date of Birth</label>
                            <Calendar className="w-full" value={dob} onChange={(e) => { setDob(e.value); setEditUser({ ...editUser, dob: e.value }); }} showIcon />
                        </div>
                        <div>
                            <label className="block text-lg font-semibold mb-2">Country</label>
                            <Dropdown className="w-full" options={countries} value={editUser.country} onChange={(e) => setEditUser({ ...editUser, country: e.value })} placeholder="Select your country" />
                        </div>
                        <div>
                            <label className="block text-lg font-semibold mb-2">Gender</label>
                            <Dropdown className="w-full" options={genders} value={editUser.gender} onChange={(e) => setEditUser({ ...editUser, gender: e.value })} placeholder="Select gender" />
                        </div>
                    </div>

                    <div className="flex gap-4 mt-6">
                        <Button label="Update Profile" className="p-button-primary p-button-lg w-full" onClick={handleUpdateUser} />
                        <Button label="Delete Account" className="p-button-danger p-button-lg w-full" onClick={() => setDeleteDialogVisible(true)} />
                    </div>
                </div>
            </div>

            {deleteDialogVisible && (
                <Dialog visible onHide={() => setDeleteDialogVisible(false)} header="Confirm Delete" style={{ width: '25vw' }}>
                    <p>Are you sure you want to delete <b>{user.name}</b>?</p>
                    <div className="flex justify-content-end gap-2 mt-4">
                        <Button label="Cancel" icon="pi pi-times" className="p-button-text" onClick={() => setDeleteDialogVisible(false)} />
                        <Button label="Delete" icon="pi pi-trash" className="p-button-danger" onClick={handleDeleteUser} />
                    </div>
                </Dialog>
            )}
        </div>
    );
}
