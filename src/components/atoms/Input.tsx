import React from 'react';

interface InputProps {
    type: string;
    placeholder?: string;
    value: string;
    name?: string;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    className?: string;
}

const Input: React.FC<InputProps> = ({ type, placeholder, name, value, onChange, className }) => {
    return (
        <input
            type={type}
            placeholder={placeholder}
            value={value}
            name={name}
            onChange={onChange}
            className={`p-2 rounded-lg bg-gray-200 text-black dark:bg-slate-800 dark:text-white ${className}`}
        />
    );
};

export default Input;