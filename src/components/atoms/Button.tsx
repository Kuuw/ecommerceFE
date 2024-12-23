import React from 'react';
import 'tailwindcss/tailwind.css';
import ButtonStyles from '../../styles/ButtonStyles';

interface ButtonProps {
    children?: React.ReactNode;
    onClick?: () => void;
    style?: ButtonStyles;
    disabled?: boolean;
    className?: string;
    type?: 'button' | 'submit' | 'reset';
}


const Button: React.FC<ButtonProps> = ({ children, onClick, style, disabled, className, type }) => {
    return (
        <button onClick={onClick} disabled={disabled} type={type}
            className={`px-4 py-2 rounded-lg ${style} ${disabled ? 'cursor-not-allowed' : 'cursor-pointer'} ${className}`}
        >
            {children}
        </button>
    );
};

export default Button;