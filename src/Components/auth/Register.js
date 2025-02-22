import React, { useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Checkbox } from 'primereact/checkbox';
import { Button } from 'primereact/button';
import { useNavigate } from 'react-router-dom';

const Register = ({ onRegisterSuccess }) => {
    const [checked, setChecked] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const navigate = useNavigate();

    const handleRegister = () => {
        if (!name || !email || !password || !confirmPassword) {
            alert("Please fill in all fields!");
            return;
        }
        if (password !== confirmPassword) {
            alert("Passwords do not match!");
            return;
        }
        alert("Registration Successful! 🎉");
        onRegisterSuccess(); 
    };

    return (
        <div className="flex justify-content-center align-items-center min-h-screen">
            <div className="surface-card p-4 shadow-2 border-round w-full lg:w-6">
                <div className="text-center mb-5">
                    <img src="https://res.cloudinary.com/dha1tbwhv/image/upload/v1740219946/tag-icon_u4f6id.png" alt="logo" height={50} className="mb-3" />
                    <div className="text-900 text-3xl font-medium mb-3">Create an Account</div>
                    <span className="text-600 font-medium line-height-3">Already have an account?</span>
                    <a className="font-medium underline ml-2 cursor-pointer" onClick={() =>
                        navigate('/signin')
                    }>Sign in here!</a>
                </div>
                <div>
                    <label htmlFor="name" className="block text-900 font-medium mb-2">Full Name</label>
                    <InputText id="name" type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Your Name" className="w-full mb-3" />

                    <label htmlFor="email" className="block text-900 font-medium mb-2">Email</label>
                    <InputText id="email" type="text" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email address" className="w-full mb-3" />
                    <div className="flex gap-3">
                        <div className="flex-1">
                            <label htmlFor="password" className="block text-900 font-medium mb-2">Password</label>
                            <Password id="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" className="w-full" toggleMask />
                        </div>

                        <div className="flex-1">
                            <label htmlFor="confirmPassword" className="block text-900 font-medium mb-2">Confirm Password</label>
                            <Password id="confirmPassword" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Confirm Password" className="w-full" toggleMask feedback={false} />
                        </div>
                    </div>

                    {/* <div className="flex align-items-center justify-content-between mb-6 pt-4">
                        <div className="flex align-items-center">
                            <Checkbox id="terms" className="mr-2" checked={checked} onChange={(e) => setChecked(e.checked)} />
                            <label htmlFor="terms">I agree to the Terms and Conditions</label>
                        </div>
                    </div> */}

                    <Button label="Register" icon="pi pi-user-plus" className="w-full mt-4" onClick={handleRegister} />
                </div>
            </div>
        </div>
    );
};

export default Register;
