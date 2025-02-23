import React, { useState, useEffect } from 'react';
import { InputText } from 'primereact/inputtext';
import { Checkbox } from 'primereact/checkbox';
import { Button } from 'primereact/button';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { usersFetch } from '../../features/UserSlice';
import { useDispatch } from 'react-redux';

const Signin = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [checked1, setChecked1] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    const { users, status } = useSelector(state => state.users);
        useEffect(() => {
            setTimeout(() => {
                dispatch(usersFetch())
            }, 1000)
        }, [dispatch]);

    const handleSignIn = () => {
        const matchedUser = users.find(user => user.email === email && user.password === password);
        console.log("Username : ", email)
        console.log("Password : ", password)
        console.log(users)
        if (matchedUser) {
            navigate("/products");
            console.log("HURRAY");
        } else {
            alert("Invalid credentials! Try again.");
        }
    };

    return (
        <div className="flex justify-content-center align-items-center min-h-screen">
            <div className="surface-card p-4 shadow-2 border-round w-full lg:w-6">
                <div className="text-center mb-5">
                    <img src="https://res.cloudinary.com/dha1tbwhv/image/upload/v1740219946/tag-icon_u4f6id.png" alt="hyper" height={50} className="mb-3" />
                    <div className="text-900 text-3xl font-medium mb-3">Welcome Back</div>
                    <span className="text-600 font-medium line-height-3">Don't have an account?</span>

                    <a className="font-medium underline ml-2 text-blue-500 cursor-pointer" onClick={() => navigate('/register')}>Create today!</a>
                </div>

                <div>
                    <label htmlFor="email" className="block text-900 font-medium mb-2">Email</label>
                    <InputText id="email" type="text" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email address" className="w-full mb-3" />

                    <label htmlFor="password" className="block text-900 font-medium mb-2">Password</label>
                    <InputText id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" className="w-full mb-3" />

                    <div className="flex align-items-center justify-content-between mb-6">
                        <div className="flex align-items-center">
                            <Checkbox id="rememberme" className="mr-2" checked={checked1} onChange={(e) => setChecked1(e.checked)} />
                            <label htmlFor="rememberme">Remember me</label>
                        </div>
                        <a className="font-medium no-underline ml-2 text-blue-500 text-right cursor-pointer">Forgot your password?</a>
                    </div>

                    <Button label="Sign In" icon="pi pi-user" className="w-full" onClick={handleSignIn} />
                </div>
            </div>
        </div>
    );
};

export default Signin;
