import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAddressService from '../../hooks/useAddressService';
import useCountryService from '../../hooks/useCountryService';
import Cookies from 'js-cookie';
import toast, { Toaster } from 'react-hot-toast';
import { Address } from '../../types/Address';
import { Country } from '../../types/Country';

const AddAddress: React.FC = () => {
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

    const addAddresses = async (address: Address) => {
        if (!isLoggedIn) {
            navigate('/account/signin');
            return;
        }
        const promise = addressService.post(address);
        toast.promise(promise, {
            loading: 'Adding address...',
            success: 'Address added successfully',
            error: 'Error when adding address',
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
        fetchCountries();
    }, []);

    return (
        <div className="m-10">
            <Toaster />
            <h1 className="text-2xl font-bold">Add Address</h1>

            <form onSubmit={(e) => {
                e.preventDefault();
                addAddresses({
                    addressId: 0,
                    firstName: name!,
                    lastName: surname!,
                    addressLine1: addressLine1!,
                    addressLine2: addressLine2,
                    postalCode: postalCode!,
                    telephone: phoneNumber!,
                    countryId: countryId!,
                });
            }}>
                <div className="mt-3 mr-3 p-5 border border-slate-800 bg-slate-900 rounded-lg">
                    <input type="text" placeholder="Name" className="p-2 rounded-lg mt-2 mr-2" onChange={(e) => setName(e.target.value)} />
                    <input type="text" placeholder="Surname" className="p-2 rounded-lg mt-2 mr-2" onChange={(e) => setSurname(e.target.value)} />
                    <textarea placeholder="Address Line 1" className="p-2 rounded-lg mt-2 mr-2" onChange={(e) => setAddressLine1(e.target.value)} />
                    <textarea placeholder="Address Line 2" className="p-2 rounded-lg mt-2 mr-2" onChange={(e) => setAddressLine2(e.target.value)} />
                    <input type="text" placeholder="Postal Code" className="p-2 rounded-lg mt-2 mr-2" onChange={(e) => setPostalCode(e.target.value)} />
                    <input type="text" placeholder="Phone Number" className="p-2 rounded-lg mt-2 mr-2" onChange={(e) => setPhoneNumber(e.target.value)} />
                    <select id="countries" onChange={(e) => setCountryId(parseInt(e.target.value))}
                        className="bg-slate-900 border border-gray-300 text-gray-900 mt-2 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                        <option value="" disabled selected>Select a country</option>
                        {countries?.map((country) => (
                            <option key={country.countryId} value={country.countryId?.toString()}>{country.countryName}</option>
                        ))}
                    </select>
                    <button type="submit" className="bg-blue-500 text-white p-2 rounded-lg mt-2">Add Address</button>
                </div>
            </form>
        </div>
    );
};

export default AddAddress;