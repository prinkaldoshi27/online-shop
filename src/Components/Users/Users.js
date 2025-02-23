import React, { useState, useEffect } from 'react';
import { DataView } from 'primereact/dataview';
import { classNames } from 'primereact/utils';
import { useDispatch, useSelector } from 'react-redux';
import { usersFetch } from '../../features/UserSlice';
import { Button } from 'primereact/button';

export default function Users() {
    const { users, status } = useSelector(state => state.users);

    console.log(users)

    const dispatch = useDispatch();

    useEffect(() => {
        setTimeout(() => {
            dispatch(usersFetch())
        }, 1000)
    }, [dispatch]);

    const itemTemplate = (user, index) => {
        return (
            <div style={{
                backgroundColor: "#f8f9fa",
            }}>
            <div className="flex flex-column justify-between">
            <div className="col-12" key={user.id}>
                <div className={classNames('flex flex-column xl:flex-col xl:align-users-start p-4 gap-4', { 'border-top-1 surface-border': index !== 0 })}>
                    <div className="flex flex-column sm:flex-row justify-content-between align-users-center xl:align-users-start flex-1 gap-4">
                        <div className="flex flex-column align-users-center sm:align-users-start gap-3">
                            <div className="text-2xl font-bold text-900">{user.name}</div>
                            <div className="flex align-users-center gap-3">
                                <span className="flex align-users-center gap-2">
                                            <i className="pi pi-envelope"></i>
                                    <span className="font-semibold">{user.email}</span>
                                </span>
                            </div>
                        </div>
                                <div className="flex flex-row align-items-center gap-2 ml-auto">
                                    <Button label="Edit" className=" p-button-success" />
                                    <Button label='Delete' className=" p-button-danger" />
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
                    <DataView value={[...users].reverse()} listTemplate={listTemplate} paginator rows={5} />
        </div>
        
            }
        </>
    );
}
