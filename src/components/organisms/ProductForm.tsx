import React, { useEffect, useState } from 'react';
import { Product } from '../../types/Product';
import FormField from '../molecules/FormField';
import Button from '../atoms/Button';
import ButtonStyles from '../../styles/ButtonStyles';
import CategoryService from '../../services/CategoryService';
import { Category } from '../../types/Category';
import Select from '../atoms/Select';
import { Label } from 'flowbite-react';

interface ProductFormProps {
    product: Product;
    setProduct: (updatedProduct: Product) => void;
    onSubmit: () => void;
    formTitle?: string;
}

const ProductForm: React.FC<ProductFormProps> = ({
    product,
    setProduct,
    onSubmit,
    formTitle = 'Product Form',
}) => {
    const [categories, setCategories] = useState<Category[]>([]);

    const fetchCategories = async () => {
        const categoryService = new CategoryService();
        const response = await categoryService.get();
        setCategories(response.data);
    }

    useEffect(() => {
        fetchCategories();
    }, []);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!product.name) {
            alert('Name is required');
            return;
        }
        if (!product.description) {
            alert('Description is required');
            return;
        }
        if (!product.categoryId) {
            alert('Category is required');
            return;
        }
        if (!product.unitPrice) {
            alert('Unit Price is required');
            return;
        }
        console.log('Submitting product:', product);
        onSubmit();
    };

    return (
        <div>
            <text className='font-bold text-xl'>{formTitle}</text>
            <form onSubmit={handleSubmit}>
                <div>
                    <FormField
                        label="Name"
                        type="text"
                        name="name"
                        value={product.name}
                        onChange={(e) =>
                            setProduct({ ...product, name: e.target.value })
                        }
                    />
                </div>
                <div>
                    <FormField
                        label="Description"
                        type="text"
                        name="description"
                        value={product.description || ''}
                        onChange={(e) =>
                            setProduct({ ...product, description: e.target.value })
                        }
                    />
                </div>
                <div className='mt-2'>
                    <Label>Category</Label>
                    <Select
                        placeholder='Select a category'
                        value={product.categoryId.toString()}
                        onChange={(e) =>
                            setProduct({ ...product, categoryId: Number(e.target.value) })
                        }
                        options={categories.map(category => ({
                            value: category.categoryId?.toString() ?? '',
                            label: category.name
                        }))}
                        className='mt-1 w-full'
                    />
                </div>
                <div>
                    <FormField
                        label="Unit Price"
                        type="number"
                        name="unitPrice"
                        value={product.unitPrice.toString()}
                        onChange={(e) =>
                            setProduct({ ...product, unitPrice: Number(e.target.value) })
                        }
                    />
                </div>
                <Button type="submit" style={ButtonStyles.GREEN} className='mt-2'>Save</Button>
            </form>
        </div>
    );
};

export default ProductForm;