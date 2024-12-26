import { useNavigate } from 'react-router-dom';
import Button from '../../atoms/Button';
import React from 'react';
import ButtonStyles from '../../../styles/ButtonStyles';

const AdminMenu: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className='flex flex-col items-center justify-center p-5'>
            <h1 className='text-2xl font-bold'>Admin Menu</h1>
            <div className='flex flex-col items-center justify-center mt-5'>
                <Button onClick={() => navigate("/admin/category")} className='m-3' style={ButtonStyles.BLUE}>Manage Categories</Button>
                <Button onClick={() => navigate("/admin/product")} className='m-3' style={ButtonStyles.BLUE}>Manage Products</Button>
                <Button onClick={() => navigate("/admin/shipment-company")} className='m-3' style={ButtonStyles.BLUE}>Manage Shipment Companies</Button>
                <Button onClick={() => navigate("/admin/country")} className='m-3' style={ButtonStyles.BLUE}>Manage Countries</Button>
            </div>
        </div>
    );
};

export default AdminMenu;