import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAddressService from '../../hooks/useAddressService';
import Cookies from 'js-cookie';
import toast, { Toaster } from 'react-hot-toast';
import { Address } from '../../types/Address';

const Addresses: React.FC = () => {
    let navigate = useNavigate();

    const addressService = new useAddressService();

    const isLoggedIn = Cookies.get('token') != null;

    const [addresses, setAddresses] = useState<Address[]>();

    const fetchAddresses = async () => {
        if (!isLoggedIn) {
            navigate('/account/signin');
            return;
        }
        const data = await addressService.get()
        if (data.status !== 200) {
            console.error('Response status:', data.status);
            toast.error('Error when fetching cart items');
            return;
        }
        setAddresses(data.data);
    };

    const deleteAddress = async (addressId: number) => {
        const data = await addressService.delete(addressId);
        if (data.status !== 200) {
            console.error('Response status:', data.status);
            toast.error('Error when deleting address');
            return;
        }
        fetchAddresses();
    };

    useEffect(() => {
        fetchAddresses();
    }, []);

    return (
        <div className="m-10">
            <Toaster />
            <h1 className="text-2xl font-bold">Addresses</h1>
            <button onClick={() => navigate('/account/addresses/add')} className="bg-blue-500 text-white p-2 rounded-lg mt-2">Add Address</button>
            <div className="flex flex-wrap">
                {addresses?.map((address) => (
                    <div key={address.addressId} className="mt-3 mr-3 p-5 border border-slate-800 bg-slate-900 rounded-lg">
                        <p>{address.firstName} {address.lastName}</p>
                        <p><span className='text-blue-300 font-bold'>Adres Satırı 1:</span> {address.addressLine1}</p>
                        <p><span className='text-blue-300 font-bold'>Adres Satırı 2:</span> {address.addressLine2}</p>
                        <p><span className='text-blue-300 font-bold'>Posta Kodu:</span> {address.postalCode}</p>
                        <p><span className='text-blue-300 font-bold'>Telefon:</span> {address.telephone}</p>
                        <button onClick={() => navigate(`/account/addresses/edit/${address.addressId}`)} className="bg-blue-500 text-white p-2 rounded-lg mt-2 mr-2">Edit</button>
                        <button onClick={() => deleteAddress(address.addressId!)} className="bg-red-500 text-white p-2 rounded-lg mt-2">Delete</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Addresses;