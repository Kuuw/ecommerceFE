import React, { useEffect, useState } from 'react';
import ShipmentCompanyService from '../../../../services/ShipmentCompanyService';
import { ShipmentCompany } from '../../../../types/ShipmentCompany';
import ShipmentCompanyTable from '../../../organisms/ShipmentCompanyTable';
import { useNavigate } from 'react-router-dom';
import Button from '../../../atoms/Button';
import ButtonStyles from '../../../../styles/ButtonStyles';

const AdminShipmentCompany: React.FC = () => {
    const [shipmentCompanies, setShipmentCompanies] = useState<ShipmentCompany[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const shipmentCompanyService = new ShipmentCompanyService();
    const navigate = useNavigate();

    useEffect(() => {
        shipmentCompanyService.get().then(response => {
            setShipmentCompanies(response.data);
            setLoading(false);
        }).catch(error => {
            console.error('Error fetching shipment companies:', error);
            setLoading(false);
        });
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    const deleteShipmentCompany = (shipmentCompanyId: number) => {
        shipmentCompanyService.delete(shipmentCompanyId).then(() => {
            setShipmentCompanies(shipmentCompanies.filter(company => company.shipmentCompanyId !== shipmentCompanyId));
        }).catch(error => {
            console.error('Error deleting shipment company:', error);
        });
    };

    return (
        <div className='p-5'>
            <Button onClick={() => navigate('/admin')} className='m-3 h-10' style={ButtonStyles.BLUE}>
                Back to admin menu
            </Button>
            <div className='p-5'>
                <h1 className='font-bold text-lg'>Admin Shipment Companies</h1>
                <Button onClick={() => navigate('/admin/shipment-company/add')} className='m-3 h-10' style={ButtonStyles.GREEN}>
                    Add Shipment Company
                </Button>
                <ShipmentCompanyTable shipmentCompanies={{ shipmentCompanies }} deleteShipmentCompany={deleteShipmentCompany} />
            </div>
        </div>
    );
};

export default AdminShipmentCompany;