export default function PasswordInput({ password, setPassword }){
return (
    <input
    id='password'
    type='password'
    value={password}
    onChange={(event) => {setPassword(event.target.value);}}
    />
)
}