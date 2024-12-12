import React, { useState } from "react";
import useUserService from "../hooks/useUserService";
import Cookies from 'js-cookie';

const Signin: React.FC = () => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const userService = new useUserService();
    const { login } = userService;

    const signin = async (e: React.FormEvent<HTMLFormElement>) => {
        try {
            e.preventDefault();
            const response = await login(email, password);
            if (response) {
                Cookies.set('firstName', JSON.stringify(response.firstName), { expires: Date.now() + 3600000 });
                Cookies.set('lastName', JSON.stringify(response.lastName), { expires: Date.now() + 3600000 });
                Cookies.set('token', response.token, { expires: Date.now() + 3600000 });
            }
        } catch (error) {
            console.error("Unexpected error:", error);
        }
    };

    return (
        <section className="bg-gray-1 py-20 dark:bg-dark lg:py-[120px]">
            <div className="container mx-auto">
                <div className="-mx-4 flex flex-wrap">
                    <div className="w-full px-4">
                        <div className="relative mx-auto max-w-[525px] overflow-hidden rounded-lg bg-white px-10 py-16 text-center dark:bg-dark-2 sm:px-12 md:px-[60px]">
                            <form onSubmit={signin}>
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
                                    <input
                                        type="submit"
                                        value="Sign In"
                                        className="w-full cursor-pointer rounded-md border border-primary bg-primary px-5 py-3 text-base font-medium text-white transition hover:bg-opacity-90"

                                    />
                                </div>
                            </form>
                            <a
                                href="/#"
                                className="mb-2 inline-block text-base text-dark hover:text-primary hover:underline dark:text-white"
                            >
                                Forget Password?
                            </a>
                            <p className="text-base text-body-color dark:text-dark-6">
                                <span className="pr-0.5">Not a member yet?</span>
                                <a
                                    href="/#"
                                    className="text-primary hover:underline"
                                >
                                    Sign Up
                                </a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Signin;

interface InputBoxProps {
    type: string;
    placeholder: string;
    name: string;
    onValueChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    value: string;
}

const InputBox = ({ type, placeholder, name, onValueChange, value }: InputBoxProps) => {
    return (
        <div className="mb-6">
            <input
                type={type}
                placeholder={placeholder}
                name={name}
                className="w-full rounded-md border bg-transparent px-5 py-3 text-base text-body-color outline-none focus:border-primary focus-visible:shadow-none dark:border-dark-3 dark:text-white"
                onChange={onValueChange}
                value={value}
            />
        </div>
    );
};
