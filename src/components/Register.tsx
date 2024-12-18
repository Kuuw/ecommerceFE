import React, { useState } from "react";
import useUserService from "../hooks/useUserService";
import InputBox from "./InputBox";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from 'react-router-dom';

const Register: React.FC = () => {
    const [firstName, setFirstName] = useState<string>("");
    const [lastName, setLastName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const userService = new useUserService();
    const { register } = userService;
    const navigate = useNavigate();

    const registerFunc = async (e: React.FormEvent<HTMLFormElement>) => {
        try {
            e.preventDefault();
            const promise = register(firstName, lastName, email, password);
            toast.promise(promise, {
                loading: 'Registering...',
                success: 'Registration successful',
                error: 'Error when registering',
            });
            const response = await promise;
            if (response.status === 200) {
                navigate("/account/signin");
            }
        } catch (error) {
            console.error("Unexpected error:", error);
        }
    };

    return (
        <section className="bg-gray-1 py-20 dark:bg-dark lg:py-[120px]">
            <Toaster />
            <div className="container mx-auto">
                <div className="-mx-4 flex flex-wrap">
                    <div className="w-full px-4">
                        <div className="relative mx-auto max-w-[525px] overflow-hidden rounded-lg bg-white px-10 py-16 text-center dark:bg-dark-2 sm:px-12 md:px-[60px]">
                            <form onSubmit={registerFunc}>
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
                                    <input
                                        type="submit"
                                        value="Sign Up"
                                        className="w-full cursor-pointer rounded-md border border-primary bg-primary px-5 py-3 text-base font-medium text-white transition hover:bg-opacity-90"

                                    />
                                </div>
                            </form>
                            <p className="text-base text-body-color dark:text-dark-6">
                                <span className="pr-0.5">Already a member?</span>
                                <a
                                    href="/account/signin"
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

export default Register;