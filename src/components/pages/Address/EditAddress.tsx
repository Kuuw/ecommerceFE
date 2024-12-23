import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import useAddressService from '../../../services/AddressService';
import useCountryService from '../../../services/CountryService';
import Cookies from 'js-cookie';
import toast from 'react-hot-toast';
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

    const { addressId } = useParams();

    const getAddress = async () => {
        if (!isLoggedIn) {
            navigate('/account/signin');
            return;
        }
        const data = await addressService.getById(Number(addressId));
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
            Number(addressId),
            {
                addressId: Number(addressId),
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
            <AddressForm
                formName="Edit Address"
                countries={countries || []}
                editAddress={editAddress}
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
        </div >
    );
};

export default AddAddress;