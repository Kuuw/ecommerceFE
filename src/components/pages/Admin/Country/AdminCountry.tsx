import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../atoms/Button';
import ButtonStyles from '../../../../styles/ButtonStyles';
import { Country } from '../../../../types/Country';
import CountryService from '../../../../services/CountryService';
import CountryTable from '../../../organisms/CountryTable';

const AdminCountry: React.FC = () => {
    const [countries, setCountries] = useState<Country[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const countryService = new CountryService();
    const navigate = useNavigate();

    useEffect(() => {
        countryService.get().then(response => {
            setCountries(response.data);
            setLoading(false);
        }).catch(error => {
            console.error('Error fetching categories:', error);
            setLoading(false);
        });
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    const deleteCountry = (countryId: number) => {
        countryService.delete(countryId).then(response => {
            setCountries(countries.filter(country => country.countryId !== countryId));
        }).catch(error => {
            console.error('Error deleting country:', error);
        });
    };

    return (
        <div className='p-5'>
            <Button onClick={() => navigate('/admin')} className='m-3 h-10' style={ButtonStyles.BLUE}>
                Back to admin menu
            </Button>
            <div className='p-5'>
                <h1 className='font-bold text-lg'>Admin Countries</h1>
                <Button onClick={() => navigate('/admin/country/add')} className='m-3 h-10' style={ButtonStyles.GREEN}>Add Country</Button>
                <CountryTable countries={{ countries }} deleteCountry={deleteCountry} />
            </div>
        </div>
    );
};

export default AdminCountry;