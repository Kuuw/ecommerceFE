import React, { useState } from "react";
import useUserService from "../../services/UserService";
import toast from "react-hot-toast";
import { useNavigate } from 'react-router-dom';
import SignUpForm from "../organisms/SignUpForm";

const SignUp: React.FC = () => {
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
            <div className="container mx-auto">
                <div className="-mx-4 flex flex-wrap">
                    <div className="w-full px-4">
                        <div className="relative mx-auto max-w-[525px] overflow-hidden rounded-lg bg-slate-900 px-10 py-16 text-center dark:bg-dark-2 sm:px-12 md:px-[60px]">
                            <SignUpForm
                                firstName={firstName}
                                setFirstName={setFirstName}
                                lastName={lastName}
                                setLastName={setLastName}
                                email={email}
                                setEmail={setEmail}
                                password={password}
                                setPassword={setPassword}
                                onSubmit={registerFunc}
                            />
                            <p className="text-base text-body-color dark:text-dark-6">
                                <span className="pr-0.5">Already a member?</span>
                                <a
                                    href="/account/signin"
                                    className="text-primary hover:underline"
                                >
                                    Sign In
                                </a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default SignUp;