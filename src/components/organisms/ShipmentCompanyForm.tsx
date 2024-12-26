import React from 'react';
import FormField from '../molecules/FormField';
import Button from '../atoms/Button';
import ButtonStyles from '../../styles/ButtonStyles';
import { ShipmentCompany } from '../../types/ShipmentCompany';

interface ShipmentCompanyFormProps {
    shipmentCompany: ShipmentCompany;
    setShipmentCompany: (updatedShipmentCompany: ShipmentCompany) => void;
    onSubmit: () => void;
    formTitle?: string;
}

const ShipmentCompanyForm: React.FC<ShipmentCompanyFormProps> = ({
    shipmentCompany,
    setShipmentCompany,
    onSubmit,
    formTitle = 'Shipment Company Form',
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
                        label="Company Name"
                        type="text"
                        name="companyName"
                        value={shipmentCompany.companyName}
                        onChange={(e) =>
                            setShipmentCompany({ ...shipmentCompany, companyName: e.target.value })
                        }
                    />
                </div>
                <div>
                    <FormField
                        label="Company Site"
                        type="text"
                        name="companySite"
                        value={shipmentCompany.companySite || ''}
                        onChange={(e) =>
                            setShipmentCompany({ ...shipmentCompany, companySite: e.target.value })
                        }
                    />
                </div>
                <div>
                    <FormField
                        label="Company Logo URL"
                        type="text"
                        name="companyLogoUrl"
                        value={shipmentCompany.companyLogoUrl || ''}
                        onChange={(e) =>
                            setShipmentCompany({ ...shipmentCompany, companyLogoUrl: e.target.value })
                        }
                    />
                </div>
                <Button type="submit" style={ButtonStyles.GREEN} className='mt-2'>Save</Button>
            </form>
        </div>
    );
};

export default ShipmentCompanyForm;