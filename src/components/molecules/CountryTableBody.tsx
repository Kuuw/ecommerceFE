import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "../atoms/Button";
import ButtonStyles from "../../styles/ButtonStyles";
import { Country } from "../../types/Country";

type CountryTableBodyProps = {
    countries: Country[];
    deleteCountry: (categoryId: number) => void;
};

export const CountryTableBody: React.FC<CountryTableBodyProps> = ({ countries, deleteCountry }) => {
    const navigate = useNavigate();
    return (
        <tbody>
            {countries.map((country) => (
                <tr key={country.countryId} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                    <td className="pl-3 py-2">{country.countryName}</td>
                    <td className="pl-3 py-2">{country.countryPhoneCode}</td>
                    <td className="pl-3 py-2">
                        <Button onClick={() => navigate(`/admin/country/edit/${country.countryId}`)} style={ButtonStyles.BLUE}>
                            Edit
                        </Button>
                    </td>
                    <td className="pl-3 py-2">
                        <Button onClick={() => deleteCountry(country.countryId ?? 0)} style={ButtonStyles.RED}>
                            Remove
                        </Button>
                    </td>
                </tr>
            ))}
        </tbody>
    );
};

export default CountryTableBody;