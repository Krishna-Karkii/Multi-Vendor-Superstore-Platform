import React, { useState, useEffect } from 'react';
import Input from '../ui/Input';

export default function Login({}) {

    const [status, setStatus] = useState('idle');
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [errors, setErrors] = useState({email: '', password: ''});
    const [serverError, setServerError] = useState('');
    // tracing how the state changes
    useEffect(() => {
        console.log("Server Error: ", serverError);
        console.log("Form Data: ", formData);
        console.log("Status: ", status);
    }, [serverError, formData, status]);

    function handleChange(e: React.ChangeEvent<HTMLInputElement>){
            const { name, value } = e.target;
            setFormData((prev) => ({
                ...prev,
                [name]: value
            }));
        }
        
    function validate(data) {
        const newErrors = {
            email: '',
            password: ''
        };
        // Validation Logic
        if (!data.email) newErrors.email = 'Please Enter the email!';
        
        if (!data.password) newErrors.password = 'Please Enter the Password!';
        return newErrors;
    }

    async function handleSubmit(event) {
        event.preventDefault();
        const validation = validate(formData);
        if (validation.email || validation.password){
            setErrors(validation);
            return;
        }
        setStatus('submitting');
        setErrors({email: '', password: ''});
        
        try {
            setServerError('');
            const response = await fetch("http://127.0.0.1:8000/auth/login", {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(
                    {
                        email: formData.email,
                        password: formData.password
                    }
                ),
            });

            const data = await response.json();

            if (response.ok === false){
                if (response.status === 401){
                    setServerError('Invalid Email or Password!');
                }
                else {
                    setServerError('Something went wrong. Please try again.');
                }
                setStatus('idle');
                setFormData({
                    ...formData, 
                    password: ''
                }
                );
                console.log("status: ", response.status);
                console.log("ok: ", response.ok);
                console.log("data: ", data)
                return;
            }

            console.log("data: ", data);

            setStatus('success');
            setFormData({
                ...formData,
                password: ''
            });

        } catch (error) {
            setServerError('Unable to connect to the server!');
            setStatus('idle');
        }
    }

    return (
    <div>
        <h1>Login</h1>
        <div>
        <form id='form' onSubmit={handleSubmit}>
            <Input
            id="email"
            name="email"
            label="Email Address"
            type="email"
            value={formData.email}
            onChange={handleChange}
            error={errors.email}
            />
            <br />
            <Input
            id="password"
            name="password"
            label="Password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            error={errors.password}
            />
            <br />
            <button 
            id="button"
            disabled={status==='submitting'}>{
            status === "idle" ? "Log in" : "Logging in..."}</button>
        </form>
        {serverError && <span>{serverError}</span>}
        {status === 'success' && <span>Logged In Successfully</span>}
        </div>
    </div>
    );
}