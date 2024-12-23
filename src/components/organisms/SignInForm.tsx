import React, { Dispatch, SetStateAction } from 'react';
import InputBox from '../molecules/InputBox';
import Input from '../atoms/Input';

type SignInFormProps = {
    email: string;
    setEmail: Dispatch<SetStateAction<string>>;
    password: string;
    setPassword: Dispatch<SetStateAction<string>>;
    onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void;
};

const SignInForm: React.FC<SignInFormProps> = ({ email, setEmail, password, setPassword, onSubmit }) => {
    return (
        <form onSubmit={onSubmit}>
            <InputBox
                type="email"
                placeholder="Email"
                name="email"
                onValueChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                value={email}
            />
            <InputBox
                type="password"
                placeholder="Password"
                name="password"
                onValueChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                value={password}
            />
            <div className="mt-10">
                <Input
                    type="submit"
                    value="Sign In"
                    className="w-full cursor-pointer rounded-md border border-primary bg-primary px-5 py-3 text-base font-medium text-white transition hover:bg-opacity-90"
                />
            </div>
        </form>
    );
};

export default SignInForm;