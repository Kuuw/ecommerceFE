import React from 'react';
import EditAddress from '../../components/Address/EditAddress';
import { useParams } from 'react-router-dom';

const EditAddressView: React.FC = () => {
    const { addressId } = useParams();

    return (
        <div>
            <EditAddress addressId={Number(addressId)} />
        </div>
    );
};

export default EditAddressView;