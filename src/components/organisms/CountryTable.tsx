import React from 'react';
import TableHead from '../molecules/TableHead';
import { Country } from '../../types/Country';
import CountryTableBody from '../molecules/CountryTableBody';

interface CountryTableProps {
    countries: { countries: Country[] } | undefined;
    deleteCountry: (countryId: number) => void;
}

const CountryTable: React.FC<CountryTableProps> = ({ countries, deleteCountry }) => {
    return (
        <table className='table-auto w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400'>
            <TableHead columns={["Name", "Phone Code", "Edit", "Remove"]} />
            <CountryTableBody countries={countries?.countries ?? []} deleteCountry={deleteCountry} />
        </table>
    );
};

export default CountryTable;