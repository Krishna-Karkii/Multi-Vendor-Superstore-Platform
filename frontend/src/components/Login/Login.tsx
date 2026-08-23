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
        if (validation !== null){
            setErrors(validation);
            return;
        }
        setStatus('submitting');
        setErrors({email: '', password: ''});
        setTimeout( () => {setStatus('success');}, 2000);
        setTimeout( () => {setStatus('idle'); setPassword('')}, 4000);
    
    }

  return (
    <div>
      <h1>Login</h1>
      <div>
        <form id='form' onSubmit={handleSubmit}>
            <label>Email: </label>
            <Input
            id="email"
            type="email"
            value={email}
            setValue={setEmail}
            />
            <br />
            <label>Password: </label>
            <Input
            id="password"
            type="password"
            value={password}
            setValue={setPassword}
            />
            <br />
            <button id="button">Submit</button>
        </form>
        {
            status === 'idle' && <p>
                Status: Ready
            </p>
        }
        {
            status === 'success' && <p>
                Status: Signed in!
            </p>
        }
        {
            status === 'submitting' && <p>
                Status: Signing in...
            </p>
        }
        {
            errors.email && <p>
                {errors.email}
            </p>
        }
        {
            errors.password && <p>
                {errors.password}
            </p>
        }
      </div>
    </div>
  );
}