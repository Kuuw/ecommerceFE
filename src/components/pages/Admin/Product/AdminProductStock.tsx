import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ProductService from '../../../../services/ProductService';
import Button from '../../../atoms/Button';
import ButtonStyles from '../../../../styles/ButtonStyles';
import toast from 'react-hot-toast';
import Input from '../../../atoms/Input';

const AdminProductStock: React.FC = () => {
    const { productId } = useParams<{ productId: string }>();
    const [stock, setStock] = useState<number>(0);
    const [customAmount, setCustomAmount] = useState<number>(0);
    const productService = new ProductService();

    useEffect(() => {
        fetchStock();
    }, [productId]);

    const fetchStock = () => {
        if (productId) {
            productService.getById(Number(productId))
                .then(response => {
                    setStock(response.data.productStock?.stock || 0);
                })
                .catch(error => {
                    console.error(error);
                });
        }
    };

    const updateStock = (amount: number) => {
        if (productId) {
            const newStock = stock + amount;
            productService.updateStock(Number(productId), newStock)
                .then(() => {
                    setStock(newStock);
                })
                .catch(error => {
                    console.error(error);
                    toast.error('Error updating stock');
                });
        }
    };

    const handleCustomUpdate = () => {
        if (productId) {
            const newStock = customAmount;
            productService.updateStock(Number(productId), newStock)
                .then(() => {
                    setStock(newStock);
                })
                .catch(error => {
                    console.error(error);
                    toast.error('Error updating stock');
                });
        }
    };

    return (
        <div className="p-5 flex flex-col items-center">
            <Button onClick={() => window.history.back()} className="m-3 h-10" style={ButtonStyles.BLUE}>Back to Product</Button>
            <h2 className='text-black dark:text-white'>Manage Product Stock</h2>
            <p className="mt-2 text-black dark:text-white">Current Stock: {stock}</p>
            <div className="mt-4 flex gap-2">
                <Button onClick={() => updateStock(10)} style={ButtonStyles.BLUE}>+10</Button>
                <Button onClick={() => updateStock(25)} style={ButtonStyles.BLUE}>+25</Button>
                <Button onClick={() => updateStock(100)} style={ButtonStyles.BLUE}>+100</Button>
                <Button onClick={() => updateStock(-10)} style={ButtonStyles.RED}>-10</Button>
                <Button onClick={() => updateStock(-25)} style={ButtonStyles.RED}>-25</Button>
                <Button onClick={() => updateStock(-100)} style={ButtonStyles.RED}>-100</Button>
            </div>
            <div className="mt-4 flex items-center gap-2">
                <Input
                    type="number"
                    value={customAmount.toString()}
                    onChange={(e) => setCustomAmount(Number(e.target.value))}
                    className="px-2 py-1 border rounded"
                    placeholder="Custom Amount"
                />
                <Button onClick={handleCustomUpdate} style={ButtonStyles.GREEN}>Update Stock</Button>
            </div>
        </div>
    );
};

export default AdminProductStock;