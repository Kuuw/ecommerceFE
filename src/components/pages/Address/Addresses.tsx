import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAddressService from '../../../services/AddressService';
import Cookies from 'js-cookie';
import toast, { Toaster } from 'react-hot-toast';
import { Address } from '../../../types/Address';
import ButtonStyles from '../../../styles/ButtonStyles';
import Button from '../../atoms/Button';

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
            <Button onClick={() => navigate('/account/addresses/add')} style={ButtonStyles.BLUE}>Add Address</Button>
            <div className="flex flex-wrap">
                {addresses?.map((address) => (
                    <div key={address.addressId} className="mt-3 mr-3 p-5 border border-slate-800 bg-slate-900 rounded-lg">
                        <p>{address.firstName} {address.lastName}</p>
                        <p><span className='text-blue-300 font-bold'>Adres Satırı 1:</span> {address.addressLine1}</p>
                        <p><span className='text-blue-300 font-bold'>Adres Satırı 2:</span> {address.addressLine2}</p>
                        <p><span className='text-blue-300 font-bold'>Posta Kodu:</span> {address.postalCode}</p>
                        <p><span className='text-blue-300 font-bold'>Telefon:</span> {address.telephone}</p>
                        <div className='mt-2'>
                            <Button onClick={() => navigate(`/account/addresses/edit/${address.addressId}`)} style={ButtonStyles.BLUE} className='mr-2'>Edit</Button>
                            <Button onClick={() => deleteAddress(address.addressId!)} style={ButtonStyles.RED}>Delete</Button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Addresses;