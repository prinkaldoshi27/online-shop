import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Calendar } from "primereact/calendar";
import { Dropdown } from "primereact/dropdown";
import { InputTextarea } from "primereact/inputtextarea";
import ImageUpload from "./ImageUpload";
import { userDelete, userUpdate, usersFetch } from "../../features/UserSlice";
import { Toast } from "primereact/toast";
import { Dialog } from "primereact/dialog";
import { useNavigate } from "react-router-dom";

export default function ProfilePage({ user }) {
    const navigate = useNavigate();
    const [deleteUser, setDeleteUser] = useState("");
    const dispatch = useDispatch();
    const [editUser, setEditUser] = useState({ ...user });
    const [dob, setDob] = useState(user.dob ? new Date(user.dob) : null);
    const [imageUrl, setImageUrl] = useState(user.image || "");

    const toast = useRef(null);
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

        const handleDeleteUser = async () => {
        if (deleteUser) {
            await dispatch(userDelete(deleteUser._id));
            setDeleteUser(null);
            navigate("/signin");
        }
    };
    useEffect(() => {
        if (imageUrl) {
            setEditUser((prevUser) => ({
                ...prevUser,
                image: imageUrl
            }));
        }
    }, [imageUrl]);

    const showSuccess = () => {
        toast.current.show({ severity: "success", summary: "Success", detail: "Profile Updated Successfully", life: 3000 });
    };


    const handleUpdateUser = async () => {
        if (editUser) {
            try {
                await dispatch(userUpdate({ id: editUser._id, updatedData: editUser }));
                showSuccess();
                dispatch(usersFetch());
            } catch (error) {
                console.error("Error updating user:", error);
            }
        }
    };

    return (
        <>
        <div style={{ minHeight: "73vh", backgroundColor: "#f8f9fa", padding: "2rem" }}>
            
            <Toast ref={toast} />
            <div className="flex w-full gap-5">
                <div className="w-1/4 flex flex-column align-items-center">
                    <ImageUpload imageUrl={imageUrl} setImageUrl={setImageUrl} />
                </div>

                <div className="w-3/4">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-lg font-semibold mb-2">Name</label>
                            <InputText className="w-full p-inputtext-lg" value={editUser.name} onChange={(e) => setEditUser({ ...editUser, name: e.target.value })} />
                        </div>
                        <div>
                            <label className="block text-lg font-semibold mb-2">Email</label>
                            <InputText className="w-full p-inputtext-lg" disabled value={editUser.email} />
                        </div>
                        <div>
                            <label className="block text-lg font-semibold mb-2">Phone Number</label>
                            <InputText className="w-full p-inputtext-lg" value={editUser.phone} onChange={(e) => setEditUser({ ...editUser, phone: e.target.value })} />
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
                    <div className="mt-4">
                        <label className="block text-lg font-semibold mb-2">Address</label>
                        <InputTextarea className="w-full" rows={3} value={editUser.address} onChange={(e) => setEditUser({ ...editUser, address: e.target.value })} placeholder="Enter your address" />
                    </div>

                    <div className="flex gap-4 mt-6">
                        <Button label="Update Profile" className="p-button-primary p-button-lg w-full" onClick={handleUpdateUser} />
                            <Button label="Delete Account" className="p-button-danger p-button-lg w-full" onClick={() => setDeleteUser(user)} />
                    </div>
                </div>
            </div>
        </div>
          {deleteUser && (
                         <Dialog visible onHide={() => setDeleteUser(null)} header="Confirm Delete" style={{ width: '25vw' }}>
                             <p>Are you sure you want to delete <b>{deleteUser.name}</b>?</p>
                             <div className="flex justify-content-end gap-2 mt-4">
                                 <Button label="Cancel" icon="pi pi-times" className="p-button-text" onClick={() => setDeleteUser(null)} />
                                 <Button label="Delete" icon="pi pi-trash" className="p-button-danger" onClick={handleDeleteUser} />
                             </div>
                         </Dialog>
                     )}
        </>
    );
}
