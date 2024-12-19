import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAddressService from '../../hooks/useAddressService';
import useCountryService from '../../hooks/useCountryService';
import Cookies from 'js-cookie';
import toast, { Toaster } from 'react-hot-toast';
import { Country } from '../../types/Country';

type AddAddressProps = {
    addressId: number;
};

const AddAddress: React.FC<AddAddressProps> = ({ addressId }) => {
    let navigate = useNavigate();

    const addressService = new useAddressService();
    const countryService = new useCountryService();

    const isLoggedIn = Cookies.get('token') != null;

    const [name, setName] = useState<string>();
    const [surname, setSurname] = useState<string>();
    const [addressLine1, setAddressLine1] = useState<string>();
    const [addressLine2, setAddressLine2] = useState<string | null>();
    const [phoneNumber, setPhoneNumber] = useState<string>();
    const [postalCode, setPostalCode] = useState<string>();
    const [countryId, setCountryId] = useState<number>();

    const [countries, setCountries] = useState<Country[]>();

    const getAddress = async () => {
        if (!isLoggedIn) {
            navigate('/account/signin');
            return;
        }
        const data = await addressService.getById(addressId);
        if (data.status !== 200) {
            console.error('Response status:', data.status);
            toast.error('Error when fetching address');
            return;
        }

        setName(data.data.firstName);
        setSurname(data.data.lastName);
        setAddressLine1(data.data.addressLine1);
        setAddressLine2(data.data.addressLine2);
        setPhoneNumber(data.data.telephone);
        setPostalCode(data.data.postalCode);
        setCountryId(data.data.countryId);
    }


    const editAddress = async () => {
        if (!isLoggedIn) {
            navigate('/account/signin');
            return;
        }
        const promise = addressService.put(
            addressId,
            {
                addressId: addressId,
                firstName: name!,
                lastName: surname!,
                addressLine1: addressLine1!,
                addressLine2: addressLine2,
                postalCode: postalCode!,
                telephone: phoneNumber!,
                countryId: countryId!,
            });
        toast.promise(promise, {
            loading: 'Editing address...',
            success: 'Address edited successfully',
            error: 'Error when editing address',
        });
        const data = await promise;
        if (data.status !== 200) {
            console.error('Response status:', data.status);
            return;
        }
        navigate('/account/addresses');
    };

    useEffect(() => {
        const fetchCountries = async () => {
            const data = await countryService.get();
            if (data.status !== 200) {
                console.error('Response status:', data.status);
                toast.error('Error when fetching countries');
                return;
            }
            setCountries(data.data);
        };
        getAddress();
        fetchCountries();
    }, []);

    return (
        <div className="m-10">
            <Toaster />
            <h1 className="text-2xl font-bold">Add Address</h1>

            <form onSubmit={(e) => {
                e.preventDefault();
                editAddress();
            }}>
                <div className="mt-3 mr-3 p-5 border border-slate-800 bg-slate-900 rounded-lg flex flex-col">
                    <div className='flex-row'>
                        <input type="text" placeholder="Name" className="p-2 rounded-lg mt-2 mr-2" onChange={(e) => setName(e.target.value)} value={name} />
                        <input type="text" placeholder="Surname" className="p-2 rounded-lg mt-2 mr-2" onChange={(e) => setSurname(e.target.value)} value={surname} />
                    </div>
                    <div className='flex-row'>
                        <textarea placeholder="Address Line 1" className="p-2 rounded-lg mt-2 mr-2 min-w-full min-h-10 max-h-24" onChange={(e) => setAddressLine1(e.target.value)} value={addressLine1} />
                    </div>
                    <div className='flex-row'>
                        <textarea placeholder="Address Line 2" className="p-2 rounded-lg mt-2 mr-2 min-w-full min-h-10 max-h-24" onChange={(e) => setAddressLine2(e.target.value)} value={addressLine2 ?? ''} />
                    </div>
                    <div className='flex-row'>
                        <input type="text" placeholder="Postal Code" className="p-2 rounded-lg mt-2 mr-2" onChange={(e) => setPostalCode(e.target.value)} value={postalCode} />
                        <input type="text" placeholder="Phone Number" className="p-2 rounded-lg mt-2 mr-2" onChange={(e) => setPhoneNumber(e.target.value)} value={phoneNumber} />
                    </div>
                    <div className='flex-row'>
                        <select id="countries" onChange={(e) => setCountryId(parseInt(e.target.value))}
                            className="bg-slate-900 border border-gray-300 text-gray-900 mt-2 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                            <option value="" disabled>Select a country</option>
                            {countries?.map((country) => (
                                <option key={country.countryId} value={country.countryId?.toString()} selected={country.countryId === countryId}>{country.countryName}</option>
                            ))}
                        </select>
                    </div>
                    <button type="submit" className="bg-blue-500 text-white p-2 rounded-lg mt-2">Edit Address</button>
                </div>
            </form >
        </div >
    );
};

export default AddAddress;