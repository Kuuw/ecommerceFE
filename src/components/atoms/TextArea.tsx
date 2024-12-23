import React from 'react';
import Label from './Label';

interface TextAreaProps {
    value: string;
    onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
    placeholder?: string;
    rows?: number;
    cols?: number;
    className?: string;
}

const TextArea: React.FC<TextAreaProps> = ({ value, onChange, placeholder, rows = 4, cols = 50, className }) => {
    return (
        <div>
            <Label text={placeholder ?? ""} className='mb-1 mt-2' />
            <textarea
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                rows={rows}
                cols={cols}
                className={`rounded-lg p-2 ${className}`}
            />
        </div>
    );
};

export default TextArea;