import React, { useState, useEffect } from 'react';
import Input from '../ui/Input';

export default function Signup({}) {

    const [status, setStatus] = useState('idle');
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [errors, setErrors] = useState({email: '', password: '', confirmPassword: ''});
    const [serverError, setServerError] = useState('');
    // tracing how the state changes
    useEffect(() => {
        console.log("Server Error: ", serverError);
        console.log("Form Data: ", formData);
        console.log("Status: ", status);
        console.log("errors: ", errors);
    }, [serverError, formData, status, errors]);

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
            password: '',
            confirmPassword: '',
        }
        if (!data.email) newErrors.email = 'Please Enter Your Email!';

        if (!data.password) newErrors.password = 'Please Enter Your Password!';
        
        if (!data.confirmPassword) newErrors.confirmPassword = 'Please Enter to Confirm Password!';
        
        if (data.confirmPassword !== data.password) newErrors.confirmPassword = "Password didn't Match";
        return newErrors;
    }

    async function handleSubmit(event) {
        event.preventDefault();
        const validation = validate(formData);
        if (validation.email || validation.password || validation.confirmPassword || validation.checkPassword ){
            setErrors(validation);
            return;
        }
        setServerError("");
        setStatus('submitting');
        try {
            const response = await fetch("http://127.0.0.1:8000/auth/signup", {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify({
                    email: formData.email,
                    password: formData.password,
                    confirmPassword: formData.confirmPassword
                })
            });

            const data = await response.json();
    
            if (!response.ok){
                setStatus('idle');
                setServerError(data.detail);
                return;
            }
            console.log(data);

            setStatus('success');
        }
        catch (e){
            setServerError("Unable to connect to the Server!");
            setStatus('idle');
            console.log(e);
        }
    }

    return (
    <div>
        <h1>Signup</h1>
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
            <Input
            id="confirmPassword"
            name="confirmPassword"
            label="ConfirmPassword"
            type="password"
            value={formData.confirmPassword}
            onChange={handleChange}
            error={errors.confirmPassword}
            />
            <br />
            <button type="submit" disabled={status === 'submitting'}>
            {status === 'submitting' ? 'Signing up...' : 'Sign Up'}
            </button>
        </form>
        {serverError && <span>{serverError}</span>}
        {status === 'success' && <span>Signup Successfully</span>}
        </div>
    </div>
    );
}