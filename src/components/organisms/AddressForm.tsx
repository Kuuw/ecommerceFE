import React from 'react';
import TextArea from '../atoms/TextArea';
import FormField from '../molecules/FormField';
import Select from '../atoms/Select';
import ButtonStyles from '../../styles/ButtonStyles';
import Button from '../atoms/Button';
import { Country } from '../../types/Country';
import Label from '../atoms/Label';

interface AddressFormProps {
    formName: string;
    countries: Country[];
    editAddress: () => void;
    name: string;
    setName: (name: string) => void;
    surname: string;
    setSurname: (surname: string) => void;
    addressLine1: string;
    setAddressLine1: (addressLine1: string) => void;
    addressLine2?: string;
    setAddressLine2: (addressLine2: string) => void;
    postalCode: string;
    setPostalCode: (postalCode: string) => void;
    phoneNumber: string;
    setPhoneNumber: (phoneNumber: string) => void;
    countryId: number;
    setCountryId: (countryId: number) => void;
}

const AddressForm: React.FC<AddressFormProps> = ({
    formName,
    countries,
    editAddress,
    name,
    setName,
    surname,
    setSurname,
    addressLine1,
    setAddressLine1,
    addressLine2,
    setAddressLine2,
    postalCode,
    setPostalCode,
    phoneNumber,
    setPhoneNumber,
    countryId,
    setCountryId,
}) => {
    return (
        <div>
            <h1 className="text-2xl font-bold">{formName}</h1>
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    editAddress();
                }}
            >
                <div className="mt-3 mr-3 p-5 border dark:border-slate-800 dark:bg-slate-900 border-gray-300 rounded-lg flex flex-col overflow-hidden">
                    <div className="flex-row">
                        <FormField
                            type="text"
                            label='Name'
                            name="name"
                            onChange={(e) => setName(e.target.value)}
                            value={name}
                        />
                        <FormField
                            type="text"
                            label='Surname'
                            name="surname"
                            onChange={(e) => setSurname(e.target.value)}
                            value={surname}
                        />
                    </div>
                    <div className="flex-row">
                        <TextArea
                            placeholder="Address Line 1"
                            className="min-w-full min-h-10 max-h-24"
                            onChange={(e) => setAddressLine1(e.target.value)}
                            value={addressLine1}
                        />
                    </div>
                    <div className="flex-row">
                        <TextArea
                            placeholder="Address Line 2"
                            className="min-w-full min-h-10 max-h-24"
                            onChange={(e) => setAddressLine2(e.target.value)}
                            value={addressLine2 ?? ''}
                        />
                    </div>
                    <div className="flex-row">
                        <FormField
                            type="text"
                            label='Postal Code'
                            name="postalCode"
                            onChange={(e) => setPostalCode(e.target.value)}
                            value={postalCode}
                        />
                        <FormField
                            type="text"
                            label='Phone Number'
                            name="phoneNumber"
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            value={phoneNumber}
                        />
                    </div>
                    <div className="flex-row mb-3">
                        <Label text="Country" className='mt-2 mb-1' />
                        <Select
                            onChange={(e) => setCountryId(parseInt(e.target.value))}
                            placeholder='Select a country'
                            value={countryId.toString()}
                            options={countries.map((country) => ({
                                value: country.countryId?.toString()!,
                                label: country.countryName,
                            }))}
                        />
                    </div>
                    <Button type="submit" style={ButtonStyles.BLUE}>
                        Edit Address
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default AddressForm;