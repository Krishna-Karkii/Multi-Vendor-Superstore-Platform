import React, { useState } from 'react';
import Input from './Input';

export default function Login({}) {

    const [status, setStatus] = useState('idle');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({email: '', password: ''});

    function validate(email, password) {
        if (email !== '' && password !== ''){
            return {
            email: '',
            password: ''
            };
        }
        else if (email === '' && password === ''){
                return {
                    email: 'Please Enter Email!', 
                    password: 'Please Enter Password!'
                };
            }
        else if (email === ''){
            return {
                email: 'Please Enter Email!', 
                password: ''
            };
        }
        else{
            return {
                email: '', 
                password: 'Please Enter Password!'
            };
        }
        
    }
    
    async function handleSubmit(event) {
        event.preventDefault();
        const validation = validate(email, password);
        if (validation.email !== '' || validation.password !== ''){
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
                        email: email,
                        password: password
                    }
                ),
            });

            const data = await response.json();

            if (!response.ok){
                throw new Error(data.detail || 'Login Failed!');
            }
            
            console.log(data);

            setStatus('success');
            setPassword('');

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
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={errors.email}
            />
            <br />
            <Input
            id="password"
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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