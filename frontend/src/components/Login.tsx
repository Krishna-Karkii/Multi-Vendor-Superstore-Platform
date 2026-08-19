import React, { useState } from 'react';

export default async function Login({}) {

    const [status, setStatus] = useState('idle');
    const [email, setEmail] = useState('');
    
    async function handleSubmit(event) {
        event.preventDefault();
        setStatus('submitting');
        setTimeout( () => {setStatus('success');}, 2000);
        setTimeout( () => {setStatus('idle');}, 4000);
    }
  return (
    <div>
      <h1>Login</h1>
      <div>
        <form id='form' onSubmit={handleSubmit}>
            <label id="name">Name: </label>
            <input type="text" id='Name'/>
            <br />
            <label id="email">Email: </label>
            <input 
            type='email'
            value={email}
            onChange={(event) => {
                setEmail(event.target.value);
            }}/>
            <br />
            <button id="button">Click me</button>
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