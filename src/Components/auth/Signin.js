import React, { useState, useEffect } from 'react';
import { InputText } from 'primereact/inputtext';
import { Checkbox } from 'primereact/checkbox';
import { Button } from 'primereact/button';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { usersFetch } from '../../features/UserSlice';

const Signin = ({ onLoginSuccess }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [checked1, setChecked1] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const { users } = useSelector(state => state.users);

    // Load stored credentials from localStorage when the component mounts
    useEffect(() => {
        const savedEmail = localStorage.getItem("rememberedEmail");
        const savedPassword = localStorage.getItem("rememberedPassword");
        const rememberMeStatus = localStorage.getItem("rememberMe") === "true";

        if (rememberMeStatus && savedEmail && savedPassword) {
            setEmail(savedEmail);
            setPassword(savedPassword);
            setChecked1(true);
        }

        dispatch(usersFetch());
    }, [dispatch]);

    const handleSignIn = () => {
        const matchedUser = users.find(user => user.email === email && user.password === password);

        if (matchedUser) {
            // If "Remember Me" is checked, store credentials
            if (checked1) {
                localStorage.setItem("rememberedEmail", email);
                localStorage.setItem("rememberedPassword", password);
                localStorage.setItem("rememberMe", "true");
            } else {
                // If "Remember Me" is unchecked, clear saved credentials
                localStorage.removeItem("rememberedEmail");
                localStorage.removeItem("rememberedPassword");
                localStorage.removeItem("rememberMe");
            }

            onLoginSuccess(matchedUser);
            navigate("/products");
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
