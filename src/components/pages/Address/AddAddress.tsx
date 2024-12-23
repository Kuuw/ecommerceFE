import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAddressService from '../../../services/AddressService';
import useCountryService from '../../../services/CountryService';
import Cookies from 'js-cookie';
import toast from 'react-hot-toast';
import { Address } from '../../../types/Address';
import { Country } from '../../../types/Country';
import AddressForm from '../../organisms/AddressForm';

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
            <AddressForm
                formName="Add Address"
                countries={countries || []}
                editAddress={() =>
                    addAddresses({
                        addressId: 0,
                        firstName: name!,
                        lastName: surname!,
                        addressLine1: addressLine1!,
                        addressLine2: addressLine2,
                        postalCode: postalCode!,
                        telephone: phoneNumber!,
                        countryId: countryId!,
                    })
                }
                name={name || ''}
                setName={setName}
                surname={surname || ''}
                setSurname={setSurname}
                addressLine1={addressLine1 || ''}
                setAddressLine1={setAddressLine1}
                addressLine2={addressLine2 || ''}
                setAddressLine2={setAddressLine2}
                postalCode={postalCode || ''}
                setPostalCode={setPostalCode}
                phoneNumber={phoneNumber || ''}
                setPhoneNumber={setPhoneNumber}
                countryId={countryId || 0}
                setCountryId={setCountryId}
            />
        </div>
    );
};

export default AddAddress;