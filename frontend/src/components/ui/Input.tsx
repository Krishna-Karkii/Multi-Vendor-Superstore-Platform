import React from "react";


interface InputProps {
    id: string;
    name: string;
    label: string;
    type: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    error?: string;
}


export default function Input({ id, name, label, type, value, onChange, error}: InputProps){
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
    {error && <span className="text-xs text-red-500">{error}</span>}
    </div>
)
}