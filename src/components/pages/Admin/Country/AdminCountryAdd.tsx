import React, { useState } from 'react';
import CountryForm from '../../../organisms/CountryForm';
import { Country } from '../../../../types/Country';
import CountryService from '../../../../services/CountryService';
import { useNavigate } from 'react-router-dom';

const AdminCountryAdd: React.FC = () => {
    const [countryName, setCountryName] = useState<string>('');
    const [countryPhoneCode, setCountryPhoneCode] = useState<number>(0);
    const countryService = new CountryService();
    const navigate = useNavigate();

    const handleSubmit = async () => {
        await countryService
            .post({ countryName, countryPhoneCode } as Country)
            .then(() => {
                setCountryName('');
                setCountryPhoneCode(0);
                navigate('/admin/country');
            })
            .catch((error) => console.error('Error updating country:', error));
    };

    return (
        <div className="p-5 flex justify-center">
            <CountryForm
                countryName={countryName}
                countryPhoneCode={countryPhoneCode}
                setCountryName={setCountryName}
                setCountryPhoneCode={setCountryPhoneCode}
                onSubmit={handleSubmit}
                formTitle="Add New Country"
            />
        </div>
    );
};

export default AdminCountryAdd;