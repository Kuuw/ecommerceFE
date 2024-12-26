import React from 'react';

interface SelectProps {
    placeholder?: string;
    options: { value: string | undefined; label: string }[];
    value: string;
    onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
    className?: string;
}

const Select: React.FC<SelectProps> = ({ placeholder, options, value, onChange, className }) => {
    return (
        <select
            value={value}
            onChange={onChange}
            className={`p-2 rounded-lg ${className}`}
        >
            {placeholder && <option value="" disabled>{placeholder}</option>}
            {options.map((option) => (
                <option key={option.value} value={option.value}>
                    {option.label}
                </option>
            ))}
        </select>
    );
};

export default Select;