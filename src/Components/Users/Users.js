import React, { useState, useEffect } from 'react';
import { DataView } from 'primereact/dataview';
import { classNames } from 'primereact/utils';
import { useDispatch, useSelector } from 'react-redux';
import { usersFetch, userUpdate, userDelete } from '../../features/UserSlice';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';

export default function Users() {
    const { users, status } = useSelector(state => state.users);

    console.log(users)

    const dispatch = useDispatch();

    const [editUser, setEditUser] = useState(null);
    const [deleteUser, setDeleteUser] = useState(null);


    useEffect(() => {
        setTimeout(() => {
            dispatch(usersFetch())
        }, 1000)
    }, [dispatch]);

    const openEditModal = (user) => {
        setEditUser({ ...user });
    };


    const handleUpdateUser = () => {
        if (editUser) {
            dispatch(userUpdate({ id: editUser._id, updatedData: editUser }));
            setEditUser(null);
        }
    };

    const handleDeleteUser = () => {
        if (deleteUser) {
            dispatch(userDelete(deleteUser._id));
            setDeleteUser(null);
        }
    };

    const itemTemplate = (user, index) => {
        return (
            <div style={{
                backgroundColor: "#f8f9fa",
            }}>
                <div className="flex flex-column justify-between">
                    <div className="col-12" key={user.id}>
                        <div className={classNames('flex flex-column xl:flex-col xl:align-users-start p-4', { 'border-top-1 surface-border': index !== 0 })}>
                            <div className="flex flex-column sm:flex-row justify-content-between align-users-center xl:align-users-start flex-1 gap-4">
                                <div className="flex flex-column align-users-center sm:align-users-start gap-3">
                                    <div className="text-xl font-bold text-900">{user.name}</div>
                                    <div className="flex align-users-center gap-3">
                                        <span className="flex align-users-center gap-2">
                                            <i className="pi pi-envelope"></i>
                                            <span className="font-2 font-semibold">{user.email}</span>
                                        </span>
                                    </div>
                                </div>
                                <div className="flex flex-row align-items-center gap-2 ml-auto">
                                    <Button label="Edit" className=" p-button-success" onClick={() => openEditModal(user)} />
                                    <Button label='Delete' className=" p-button-danger" onClick={() => setDeleteUser(user)} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    const listTemplate = (users) => {
        if (!users || users.length === 0) return null;

        let list = users.map((user, index) => {
            return itemTemplate(user, index);
        });

        return <div className="list " style={{
            minHeight: "73vh", backgroundColor: "#f8f9fa",
        }}>{list}</div>;
    };

    return (
        <>
            {status === 'loading' ? <p>Loading </p> :
                <div className="card" >
                    <DataView value={[...users].reverse()} listTemplate={listTemplate} paginator rows={10} />
                </div>

            }
            {editUser && (
                <Dialog visible onHide={() => setEditUser(null)} header="Edit User" style={{ width: '30vw' }}>
                    <div className="flex flex-column gap-3">
                        <div>
                            <label className="font-medium">Name</label>
                            <InputText value={editUser.name} onChange={(e) => setEditUser({ ...editUser, name: e.target.value })} className="w-full" />
                        </div>
                        <div>
                            <label className="font-medium">Email</label>
                            <InputText value={editUser.email} disabled className="w-full" />
                        </div>
                    </div>
                    <div className="flex justify-content-end gap-2 mt-4">
                        <Button label="Cancel" icon="pi pi-times" className="p-button-text" onClick={() => setEditUser(null)} />
                        <Button label="Save" icon="pi pi-check" className="p-button-success" onClick={handleUpdateUser} />
                    </div>
                </Dialog>
            )}
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
