import React, { useState } from "react";
import useUserService from "../../services/UserService";
import Cookies from 'js-cookie';
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import SignInForm from "../organisms/SignInForm";

const SignIn: React.FC = () => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const userService = new useUserService();
    const { login } = userService;
    const navigate = useNavigate();

    const signin = async (e: React.FormEvent<HTMLFormElement>) => {
        try {
            e.preventDefault();
            const promise = login(email, password);
            toast.promise(promise, {
                loading: 'Logging in...',
                success: 'Login successful',
                error: 'Error when logging in',
            });
            const response = await promise;
            if (response.status === 200) {
                Cookies.set('firstName', JSON.stringify(response.data.firstName), { expires: Date.now() + 3600000 });
                Cookies.set('lastName', JSON.stringify(response.data.lastName), { expires: Date.now() + 3600000 });
                Cookies.set('token', response.data.token, { expires: Date.now() + 3600000 });

                navigate("/");
            }
        } catch (error) {
            console.error("Unexpected error:", error);
        }
    };

    return (
        <section className="bg-slate-950 py-20 dark:bg-dark lg:py-[120px]">

            <div className="container mx-auto">
                <div className="-mx-4 flex flex-wrap">
                    <div className="w-full px-4">
                        <div className="relative mx-auto max-w-[525px] overflow-hidden rounded-lg bg-slate-900 px-10 py-16 text-center dark:bg-dark-2 sm:px-12 md:px-[60px]">
                            <SignInForm
                                email={email}
                                setEmail={setEmail}
                                password={password}
                                setPassword={setPassword}
                                onSubmit={signin}
                            />
                            <a
                                href="/#"
                                className="mb-2 inline-block text-base text-dark hover:text-primary hover:underline dark:text-white"
                            >
                                Forget Password?
                            </a>
                            <p className="text-base text-body-color dark:text-dark-6">
                                <span className="pr-0.5">Not a member yet?</span>
                                <a
                                    href="/account/signup"
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

export default SignIn;