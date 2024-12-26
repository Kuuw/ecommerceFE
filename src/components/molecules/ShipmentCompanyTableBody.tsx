import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "../atoms/Button";
import ButtonStyles from "../../styles/ButtonStyles";
import { ShipmentCompany } from "../../types/ShipmentCompany";

type ShipmentCompanyTableBodyProps = {
    shipmentCompanies: ShipmentCompany[];
    deleteShipmentCompany: (shipmentCompanyId: number) => void;
};

export const ShipmentCompanyTableBody: React.FC<ShipmentCompanyTableBodyProps> = ({
    shipmentCompanies,
    deleteShipmentCompany,
}) => {
    const navigate = useNavigate();

    return (
        <tbody>
            {shipmentCompanies.map((company) => (
                <tr key={company.shipmentCompanyId} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                    <td className="pl-3 py-2">{company.companyName}</td>
                    <td className="pl-3 py-2">{company.companySite}</td>
                    <td className="pl-3 py-2">
                        <Button
                            onClick={() => navigate(`/admin/shipment-company/edit/${company.shipmentCompanyId}`)}
                            style={ButtonStyles.BLUE}
                        >
                            Edit
                        </Button>
                    </td>
                    <td className="pl-3 py-2">
                        <Button
                            onClick={() => deleteShipmentCompany(company.shipmentCompanyId ?? 0)}
                            style={ButtonStyles.RED}
                        >
                            Remove
                        </Button>
                    </td>
                </tr>
            ))}
        </tbody>
    );
};

export default ShipmentCompanyTableBody;