import React from 'react';
import Select from '../atoms/Select';
import Label from '../atoms/Label';

interface SelectFieldProps {
    value: string;
    label: string;
    options: { value: string | undefined; label: string }[];
    onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

const SelectField = ({ value, label, options, onChange }: SelectFieldProps) => {
    return (
        <div className="flex justify-center mt-4">
            <Label className="mr-2 font-medium text-lg justify-center mt-1" text={label} />
            <Select className="form-select block" onChange={onChange} value={value}
                options={options} />
        </div>
    );
};

export default SelectField;