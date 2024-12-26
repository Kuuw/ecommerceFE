import React from 'react';
import FormField from '../molecules/FormField';
import Button from '../atoms/Button';
import ButtonStyles from '../../styles/ButtonStyles';

interface CountryFormProps {
    countryName: string;
    setCountryName: (updatedCountryName: string) => void;
    countryPhoneCode: number;
    setCountryPhoneCode: (updatedCountryPhoneCode: number) => void;
    onSubmit: () => void;
    formTitle?: string;
}

const CountryForm: React.FC<CountryFormProps> = ({
    countryName,
    setCountryName,
    countryPhoneCode,
    setCountryPhoneCode,
    onSubmit,
    formTitle = 'Country Form',
}) => {
    return (
        <div>
            <text className='font-bold text-xl'>{formTitle}</text>
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    onSubmit();
                }}
            >
                <div>
                    <FormField
                        label="Name"
                        type="text"
                        name="name"
                        value={countryName}
                        onChange={(e) =>
                            setCountryName(e.target.value)
                        }
                    />
                </div>
                <div>
                    <FormField
                        label="Phone Code"
                        type="text"
                        name="phoneCode"
                        value={countryPhoneCode.toString()}
                        onChange={(e) =>
                            setCountryPhoneCode(Number(e.target.value))
                        }
                    />
                </div>
                <Button type="submit" style={ButtonStyles.GREEN} className='mt-2'>Save</Button>
            </form>
        </div>
    );
};

export default CountryForm;