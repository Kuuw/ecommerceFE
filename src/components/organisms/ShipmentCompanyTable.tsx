import React from 'react';
import TableHead from '../molecules/TableHead';
import ShipmentCompanyTableBody from '../molecules/ShipmentCompanyTableBody';
import { ShipmentCompany } from '../../types/ShipmentCompany';

interface ShipmentCompanyTableProps {
    shipmentCompanies: { shipmentCompanies: ShipmentCompany[] } | undefined;
    deleteShipmentCompany: (shipmentCompanyId: number) => void;
}

const ShipmentCompanyTable: React.FC<ShipmentCompanyTableProps> = ({ shipmentCompanies, deleteShipmentCompany }) => {
    return (
        <table className='table-auto w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400'>
            <TableHead columns={["Company Name", "Company Site", "Edit", "Remove"]} />
            <ShipmentCompanyTableBody shipmentCompanies={shipmentCompanies?.shipmentCompanies ?? []} deleteShipmentCompany={deleteShipmentCompany} />
        </table>
    );
};

export default ShipmentCompanyTable;