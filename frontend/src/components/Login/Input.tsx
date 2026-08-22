export default function Input({ id, type, value, setValue }){
return (
    <input
    id={id}
    type={type}
    value={value}
    onChange={(event) => {setValue(event.target.value);}}
    />
)
}