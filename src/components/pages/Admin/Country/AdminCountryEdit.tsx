import React, { useEffect, useState } from 'react';
import CountryForm from '../../../organisms/CountryForm';
import CountryService from '../../../../services/CountryService';
import { useNavigate, useParams } from 'react-router-dom';
import Button from '../../../atoms/Button';
import ButtonStyles from '../../../../styles/ButtonStyles';

const AdminCountryEdit: React.FC = () => {
    const [countryName, setCountryName] = useState<string>('');
    const [countryPhoneCode, setCountryPhoneCode] = useState<number>(0);
    const { countryId } = useParams();
    const navigate = useNavigate();
    const countryService = new CountryService();

    useEffect(() => {
        countryService
            .getById(Number(countryId))
            .then((response) => { setCountryName(response.data.countryName); setCountryPhoneCode(response.data.countryPhoneCode); })
            .catch((error) => console.error('Error fetching country:', error));
    }, [countryId]);

    const handleSubmit = async () => {
        var response = await countryService
            .put(Number(countryId), { countryId: null, countryName, countryPhoneCode });

        if (response.status === 200) {
            setCountryName('');
            setCountryPhoneCode(0);
            navigate('/admin/country');
        } else {
            console.error('Error updating country:', response);
        }
    };

    return (
        <div className="p-5">
            <Button
                onClick={() => navigate('/admin/country')}
                className="m-3 h-10"
                style={ButtonStyles.BLUE}
            >
                Back to Countries
            </Button>
            <div className="p-5 flex justify-center mt-5">
                <CountryForm
                    countryName={countryName}
                    countryPhoneCode={countryPhoneCode}
                    setCountryName={setCountryName}
                    setCountryPhoneCode={setCountryPhoneCode}
                    onSubmit={handleSubmit}
                    formTitle="Edit Country"
                />
            </div>
        </div>
    );
};

export default AdminCountryEdit;