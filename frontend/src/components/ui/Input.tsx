export default function Input({ id, name, label, type, value, onChange, error}){
return ( 
    <div>
    <label htmlFor={id}>{label}</label>
    <input
    id={id}
    name={name}
    type={type}
    value={value}
    onChange={onChange}
    />
    {error && <span className="text-xs text-red-500" style={{color: 'red'}}>{error}</span>}
    </div>
)
}