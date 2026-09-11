import React, { useState } from 'react';
import Input from './Input';

export default function Login({}) {

    const [status, setStatus] = useState('idle');
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [errors, setErrors] = useState({email: '', password: ''});
    const [serverError, setServerError] = useState('');

    function validate(data) {
        const newErrors = {
            email: '',
            password: ''
        };
        // Validation Logic
        if (!data.email){
            newErrors.email = 'Please Enter the email!';
        }
        if (!data.password){
            newErrors.password = 'Please Enter the Password!'
        }
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

            if (!response.ok){
                throw new Error(data.detail || 'Login Failed!');
            }
            
            console.log(data);

            setStatus('success');
            setFormData({
                ...formData,
                password: ''
            });

        } catch (error) {
            console.error(error);
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
            label="Email Address"
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({
                ...formData,
                email: e.target.value,})}
            error={errors.email}
            />
            <br />
            <Input
            id="password"
            label="Password"
            type="password"
            value={formData.password}
            onChange={(e) => setFormData({
                ...formData,
                password: e.target.value,})}
            error={errors.password}
            />
            <br />
            <button 
            id="button"
            disabled={status==='submitting'}>{
            status === 'idle' && 'Submit' 
            || status === 'submitting' && 'Signing in...'
            || status === 'success' && 'Signed in!'}</button>
        </form>
      </div>
    </div>
  );
}