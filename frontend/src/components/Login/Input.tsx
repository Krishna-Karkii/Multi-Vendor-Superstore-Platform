export default function Input({ id, label, type, value, onChange, error}){
return (
    <div>
    <label htmlFor={id}>{label}</label>
    <input
    id={id}
    type={type}
    value={value}
    onChange={onChange}
    />
    {error && <span className="text-xs text-red-500" style={{color: 'red'}}>{error}</span>}
    </div>
)
}