import React, { Dispatch, SetStateAction } from 'react';
import InputBox from '../molecules/InputBox';
import Input from '../atoms/Input';

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
                <Input
                    type="submit"
                    value="Sign Up"
                    className="w-full cursor-pointer rounded-md border border-primary bg-primary px-5 py-3 text-base font-medium text-white transition hover:bg-opacity-90"
                />
            </div>
        </form>
    );
};

export default SignUpForm;