import React, { Dispatch, SetStateAction } from 'react';
import InputBox from '../molecules/InputBox';
import Button from '../atoms/Button';
import ButtonStyles from '../../styles/ButtonStyles';

type SignUpFormProps = {
    firstName: string;
    setFirstName: Dispatch<SetStateAction<string>>;
    lastName: string;
    setLastName: Dispatch<SetStateAction<string>>;
    email: string;
    setEmail: Dispatch<SetStateAction<string>>;
    password: string;
    setPassword: Dispatch<SetStateAction<string>>;
    onSubmit?: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
};

const SignUpForm: React.FC<SignUpFormProps> = ({ firstName, setFirstName, lastName, setLastName, email, setEmail, password, setPassword, onSubmit }) => {
    return (
        <form onSubmit={onSubmit}>
            <InputBox
                type="string"
                name="firstName"
                placeholder="Name"
                onValueChange={(e) => setFirstName(e.target.value)}
                value={firstName}
            />
            <InputBox
                type="string"
                name="lastName"
                placeholder="Surname"
                onValueChange={(e) => setLastName(e.target.value)}
                value={lastName}
            />
            <InputBox
                type="email"
                name="email"
                placeholder="Email"
                onValueChange={(e) => setEmail(e.target.value)}
                value={email}
            />
            <InputBox
                type="password"
                name="password"
                placeholder="Password"
                onValueChange={(e) => setPassword(e.target.value)}
                value={password}
            />
            <div className="mb-10">
                <Button
                    type="submit"
                    className="w-full cursor-pointer"
                    style={ButtonStyles.BLUE}
                >Sign Up</Button>
            </div>
        </form>
    );
};

export default SignUpForm;