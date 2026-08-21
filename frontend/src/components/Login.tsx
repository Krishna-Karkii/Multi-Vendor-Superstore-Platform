import React, { useState } from 'react';

export default function Login({}) {

    const [status, setStatus] = useState('idle');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    
    async function handleSubmit(event) {
        event.preventDefault();
        if (email === ''){
            setError('email');
        }
        else if (password === ''){
            setError('password');
        }
        else {
            setStatus('submitting');
            setError('');
            setTimeout( () => {setStatus('success');}, 2000);
            setTimeout( () => {setStatus('idle'); setPassword('')}, 4000);
        }
    }

  return (
    <div>
      <h1>Login</h1>
      <div>
        <form id='form' onSubmit={handleSubmit}>
            <label id="email">Email: </label>
            <input 
            type='email'
            value={email}
            onChange={(event) => {
                setEmail(event.target.value);
            }}/>
            <br />
            <label id="name">Password: </label>
            <input 
            type='password'
            value={password}
            onChange={(event) => {
                setPassword(event.target.value);
                }}/>
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
            error === 'email'  && <p>
                Error: Please enter email
            </p>
        }
        {
            error === 'password' && <p>
                Error : Please Enter Password
            </p>
        }
      </div>
    </div>
  );
}

// export function Login({}) {

//     const [status, setStatus] = useState('idle');
//     const [email, setEmail] = useState('');
    
//     async function handleSubmit(event) {
//         event.preventDefault();
//         setStatus('submitting');
//         setTimeout( () => {setStatus('success');}, 2000);
//         setTimeout( () => {setStatus('idle');}, 4000);
//     }
//   return (
//     <div>
//       <h1>Login</h1>
//       <div>
//         <form id='form' onSubmit={handleSubmit}>
//             <label id="name">Name: </label>
//             <input type="text" id='Name'/>
//             <br />
//             <label id="email">Email: </label>
//             <input 
//             type='email'
//             value={email}
//             onChange={(event) => {
//                 setEmail(event.target.value);
//             }}/>
//             <br />
//             <button id="button">Click me</button>
//         </form>
//         {
//             status === 'idle' && <p>
//                 Status: Ready
//             </p>
//         }
//         {
//             status === 'success' && <p>
//                 Status: Signed in!
//             </p>
//         }
//         {
//             status === 'submitting' && <p>
//                 Status: Signing in...
//             </p>
//         }
//       </div>
//     </div>
//   );
// }