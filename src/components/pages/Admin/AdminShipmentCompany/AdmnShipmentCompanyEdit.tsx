import React, { useEffect, useState } from 'react';
import ShipmentCompanyForm from '../../../organisms/ShipmentCompanyForm';
import { ShipmentCompany } from '../../../../types/ShipmentCompany';
import ShipmentCompanyService from '../../../../services/ShipmentCompanyService';
import { useNavigate, useParams } from 'react-router-dom';
import Button from '../../../atoms/Button';
import ButtonStyles from '../../../../styles/ButtonStyles';

const AdminShipmentCompanyEdit: React.FC = () => {
    const [shipmentCompany, setShipmentCompany] = useState<ShipmentCompany>({
        companyName: '',
        companySite: '',
        companyLogoUrl: '',
    });
    const shipmentCompanyService = new ShipmentCompanyService();
    const { shipmentCompanyId } = useParams();
    const navigate = useNavigate();

    const fetchShipmentCompany = () => {
        if (shipmentCompanyId) {
            shipmentCompanyService
                .getById(Number(shipmentCompanyId))
                .then(response => {
                    setShipmentCompany(response.data);
                })
                .catch(error => {
                    console.error('Error fetching shipment company:', error);
                });
        }
    };

    const handleSubmit = () => {
        if (shipmentCompanyId) {
            shipmentCompanyService
                .put(Number(shipmentCompanyId), shipmentCompany)
                .then(() => {
                    setShipmentCompany({
                        companyName: '',
                        companySite: '',
                        companyLogoUrl: '',
                    });
                    navigate('/admin/shipment-company');
                })
                .catch(error => {
                    console.error('Error updating shipment company:', error);
                });
        }
    };

    useEffect(() => {
        fetchShipmentCompany();
    }, [shipmentCompanyId]);

    return (
        <div className='p-5'>
            <Button
                onClick={() => navigate('/admin/shipment-company')}
                className='m-3 h-10'
                style={ButtonStyles.BLUE}
            >
                Back to Shipment Companies
            </Button>
            <div className='p-5 flex justify-center mt-5'>
                <ShipmentCompanyForm
                    shipmentCompany={shipmentCompany}
                    setShipmentCompany={setShipmentCompany}
                    onSubmit={handleSubmit}
                    formTitle="Edit Shipment Company"
                />
            </div>
        </div>
    );
};

export default AdminShipmentCompanyEdit;