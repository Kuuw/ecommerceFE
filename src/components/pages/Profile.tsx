import React, { useState, useEffect } from 'react';
import UserService from '../../services/UserService';
import { UserModel } from '../../types/UserModel';
import FormField from '../molecules/FormField';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { JwtPayloadExtend } from '../../types/JwtPayloadExtend';
import Button from '../atoms/Button';
import ButtonStyles from '../../styles/ButtonStyles';

const Profile: React.FC = () => {
    const [user, setUser] = useState<UserModel>({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
    });
    const [loading, setLoading] = useState<boolean>(true);
    const userService = new UserService();
    const token = Cookies.get('token');
    const navigate = useNavigate();


    if (!token) {
        navigate('/account/signin');
    }
    const userTokenDetail = jwtDecode<JwtPayloadExtend>(token!);
    const isAdmin = userTokenDetail['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'] === 'Admin';

    useEffect(() => {
        userService.get()
            .then(response => {
                setUser(response.data);
                setLoading(false);
            })
            .catch(() => {
                setLoading(false);
            });
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUser(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        userService.put(user)
            .then(() => {
                // Handle success
            })
            .catch(() => {
                // Handle error
            });
    };

    if (loading) return <div>Loading...</div>;

    return (
        <div className='p-5 flex align-middle justify-center mt-5'>
            <div className='flex flex-col align-middle'>
                <h1 className='font-bold text-2xl text-black dark:text-white'>Profile ({isAdmin && "Admin" || "User"})</h1>
                <form onSubmit={handleSubmit} style={{ width: '300px' }}>
                    <FormField
                        label="First Name"
                        type="text"
                        name="firstName"
                        value={user.firstName}
                        onChange={handleChange}
                    />
                    <FormField
                        label="Last Name"
                        type="text"
                        name="lastName"
                        value={user.lastName}
                        onChange={handleChange}
                    />
                    <FormField
                        label="Email"
                        type="email"
                        name="email"
                        value={user.email}
                        onChange={handleChange}
                    />
                    <FormField
                        label="Password"
                        type="password"
                        name="password"
                        value={user.password}
                        onChange={handleChange}
                    />
                    <Button type="submit" style={ButtonStyles.BLUE} className='mt-3'>
                        Save
                    </Button>
                </form>
            </div>
        </div>
    );
};

export default Profile;