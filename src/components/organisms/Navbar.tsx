import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
import { JwtPayloadExtend } from '../../types/JwtPayloadExtend';

const Navbar: React.FC = () => {
    const navigate = useNavigate();
    const token = Cookies.get('token');
    const isAdmin = token ? jwtDecode<JwtPayloadExtend>(token)['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'] === 'Admin' : false;
    const LogOut = () => {
        Cookies.remove('token');
        Cookies.remove('firstName');
        Cookies.remove('lastName');
        navigate('/account/signin');
    };
    const [theme, setTheme] = React.useState('light');

    useEffect(() => {
        document.documentElement.classList.toggle('dark', theme === 'dark');
    }, [theme]);

    return (
        <nav className="w-full bg-gray-100 border-gray-200 dark:bg-gray-900">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                <Link to="#" className="flex items-center">
                    <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white text-gray-800">Ecommerce</span>
                </Link>
                <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-search">
                    <ul
                        className="flex flex-col p-4 md:p-0 mt-4 font-medium border rounded-lg md:flex-row md:space-x-8 md:mt-0 md:border-0 ">
                        <li>
                            <Link to="/"
                                className="block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500"
                                aria-current="page">Ana Sayfa</Link>
                        </li>
                        {!token && (
                            <li>
                                <Link to="/account/signin" className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">
                                    Giriş Yap
                                </Link>
                            </li>
                        )}
                        {token && (
                            <li>
                                <button onClick={LogOut} className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">
                                    Çıkış Yap
                                </button>
                            </li>
                        )}
                        {token && (
                            <li>
                                <Link to="/cart" className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">
                                    Sepetim
                                </Link>
                            </li>
                        )}
                        {token && (
                            <li>
                                <Link to="/orders" className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">
                                    Siparişlerim
                                </Link>
                            </li>
                        )}
                        {token && (
                            <li>
                                <Link to="/profile" className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">
                                    Profil
                                </Link>
                            </li>
                        )}
                        {token && (
                            <li>
                                <Link to="/account/addresses" className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">
                                    Adreslerim
                                </Link>
                            </li>
                        )}
                        {isAdmin && (
                            <li>
                                <Link to="/admin" className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">
                                    Admin
                                </Link>
                            </li>
                        )}
                    </ul>
                </div>
                <div className="flex items-center justify-between md:order-3">
                    <button onClick={() => { if (theme == "dark") { setTheme('light') } else { setTheme("dark") } }} className="w-6 h-6 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:focus:ring-gray-600">
                        {theme == "dark" ? <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path d="M50 20A40 40 0 1 0 50 70 30 30 0 1 1 50 20z" stroke="black" stroke-width="2" fill="white" transform="scale(0.25) translate(10, 13) rotate(-30)" />
                        </svg> : <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path d="M8 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0zm0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13zm8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5zM3 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 8zm10.657-5.657a.5.5 0 0 1 0 .707l-1.414 1.415a.5.5 0 1 1-.707-.708l1.414-1.414a.5.5 0 0 1 .707 0zm-9.193 9.193a.5.5 0 0 1 0 .707L3.05 13.657a.5.5 0 0 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0zm9.193 2.121a.5.5 0 0 1-.707 0l-1.414-1.414a.5.5 0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707zM4.464 4.465a.5.5 0 0 1-.707 0L2.343 3.05a.5.5 0 1 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .708z" transform="scale(1.3) translate(1, 1)" />
                        </svg>}
                    </button>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;