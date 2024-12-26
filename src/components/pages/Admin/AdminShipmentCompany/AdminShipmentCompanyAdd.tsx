import React, { useState } from 'react';
import ShipmentCompanyForm from '../../../organisms/ShipmentCompanyForm';
import { ShipmentCompany } from '../../../../types/ShipmentCompany';
import ShipmentCompanyService from '../../../../services/ShipmentCompanyService';
import { useNavigate } from 'react-router-dom';

const AdminShipmentCompanyAdd: React.FC = () => {
    const [shipmentCompany, setShipmentCompany] = useState<ShipmentCompany>({
        companyName: '',
        companySite: '',
        companyLogoUrl: '',
    });
    const shipmentCompanyService = new ShipmentCompanyService();
    const navigate = useNavigate();

    const handleSubmit = () => {
        shipmentCompanyService.post(shipmentCompany)
            .then(() => {
                setShipmentCompany({
                    companyName: '',
                    companySite: '',
                    companyLogoUrl: '',
                });
                navigate('/admin/shipment-company');
            })
            .catch(error => {
                console.error('Error creating shipment company:', error);
            });
    };

    return (
        <div className="p-5 flex justify-center">
            <ShipmentCompanyForm
                shipmentCompany={shipmentCompany}
                setShipmentCompany={setShipmentCompany}
                onSubmit={handleSubmit}
                formTitle="Add New Shipment Company"
            />
        </div>
    );
};

export default AdminShipmentCompanyAdd;