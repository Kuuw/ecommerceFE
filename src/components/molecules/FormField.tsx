import React from 'react';
import Input from '../atoms/Input';
import Label from '../atoms/Label';

interface FormFieldProps {
    label: string;
    type: string;
    name: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    className?: string;
}

const FormField: React.FC<FormFieldProps> = ({ label, type, name, value, onChange, className }) => {
    return (
        <div className={className}>
            <Label htmlFor={name} text={label} className='mb-1 mt-2' />
            <Input
                type={type}
                name={name}
                placeholder={label}
                value={value}
                onChange={onChange}
            />
        </div>
    );
};

export default FormField;