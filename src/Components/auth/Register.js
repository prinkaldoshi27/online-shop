import React, { useState, useRef, useEffect } from 'react';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Button } from 'primereact/button';
import { useNavigate } from 'react-router-dom';
import { usersCreate, usersFetch } from '../../features/UserSlice';
import { Toast } from "primereact/toast";
import { useSelector, useDispatch } from 'react-redux';

const Register = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const toast = useRef(null);

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [errors, setErrors] = useState({});
    const { users } = useSelector(state => state.users);
    
    
        useEffect(() => {
                dispatch(usersFetch())
        }, [dispatch]);
    
    const newId = users.length > 0 ? users[users.length - 1].id + 1 : 1;

    const showSuccess = () => {
        toast.current.show({ severity: "success", summary: "Success", detail: "Successfully Registered!", life: 3000 });
    };

    const validateForm = () => {
        let tempErrors = {};
        if (!name.trim()) tempErrors.name = "Name is required";
        if (!email.trim()) tempErrors.email = "Email is required";
        else if (users.some(user => user.email === email)) tempErrors.email = "Email is already registered";
        if (!password.trim()) tempErrors.password = "Password is required";
        if (!confirmPassword.trim()) tempErrors.confirmPassword = "Confirm Password is required";
        else if (password !== confirmPassword) tempErrors.confirmPassword = "Passwords do not match";

        setErrors(tempErrors);
        return Object.keys(tempErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        const newUser = {
            id: newId,
            name,
            email,
            password
        };

        dispatch(usersCreate(newUser))
            .unwrap()
            .then(() => {
                showSuccess();
                setName('');
                setEmail('');
                setPassword('');
                setConfirmPassword('');
                setErrors({});
                dispatch(usersFetch());
                navigate("/products");
            })
            .catch((error) => {
                console.error("Submission Error:", error);
            });
    };

    return (
        <form onSubmit={handleSubmit}>
            <Toast ref={toast} />
            <div className="flex justify-content-center align-items-center min-h-screen">
                <div className="surface-card p-4 shadow-2 border-round w-full lg:w-6">
                    <div className="text-center mb-5">
                        <img src="https://res.cloudinary.com/dha1tbwhv/image/upload/v1740219946/tag-icon_u4f6id.png" alt="logo" height={50} className="mb-3" />
                        <div className="text-900 text-3xl font-medium mb-3">Create an Account</div>
                        <span className="text-600 font-medium line-height-3">Already have an account?</span>
                        <a className="font-medium underline ml-2 cursor-pointer" onClick={() => navigate('/signin')}>
                            Sign in here!
                        </a>
                    </div>
                    <div>
                        <label htmlFor="name" className="block text-900 font-medium mb-2">Full Name</label>
                        <InputText id="name" type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Your Name" className="w-full mb-1" />
                        {errors.name && <small className="p-error">{errors.name}</small>}

                        <label htmlFor="email" className="block text-900 font-medium mt-3 mb-2">Email</label>
                        <InputText id="email" type="text" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email address" className="w-full mb-1" />
                        {errors.email && <small className="p-error">{errors.email}</small>}

                        <div className="flex gap-3 mt-3">
                            <div className="flex-1">
                                <label htmlFor="password" className="block text-900 font-medium mb-2">Password</label>
                                <Password id="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" className="w-full" toggleMask />
                                {errors.password && <small className="p-error">{errors.password}</small>}
                            </div>

                            <div className="flex-1">
                                <label htmlFor="confirmPassword" className="block text-900 font-medium mb-2">Confirm Password</label>
                                <Password id="confirmPassword" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Confirm Password" className="w-full" toggleMask feedback={false} />
                                {errors.confirmPassword && <small className="p-error">{errors.confirmPassword}</small>}
                            </div>
                        </div>

                        <Button type="submit" label="Register" icon="pi pi-user-plus" className="w-full mt-4" />
                    </div>
                </div>
            </div>
        </form>
    );
};

export default Register;
