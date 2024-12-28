import React, { useEffect, useState } from 'react';
import CategoryService from '../../../../services/CategoryService';
import { Category } from '../../../../types/Category';
import CategoryTable from '../../../organisms/CategoryTable';
import { useNavigate } from 'react-router-dom';
import Button from '../../../atoms/Button';
import ButtonStyles from '../../../../styles/ButtonStyles';

const AdminCategory: React.FC = () => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const categoryService = new CategoryService();
    const navigate = useNavigate();

    useEffect(() => {
        categoryService.get().then(response => {
            setCategories(response.data);
            setLoading(false);
        }).catch(error => {
            console.error('Error fetching categories:', error);
            setLoading(false);
        });
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    const deleteCategory = (categoryId: number) => {
        categoryService.delete(categoryId).then(response => {
            setCategories(categories.filter(category => category.categoryId !== categoryId));
        }).catch(error => {
            console.error('Error deleting category:', error);
        });
    };

    return (
        <div className='p-5'>
            <Button onClick={() => navigate('/admin')} className='m-3 h-10' style={ButtonStyles.BLUE}>
                Back to admin menu
            </Button>
            <div className='p-5'>
                <h1 className='font-bold text-lg text-black dark:text-white'>Admin Categories</h1>
                <Button onClick={() => navigate('/admin/category/add')} className='m-3 h-10' style={ButtonStyles.GREEN}>Add Category</Button>
                <CategoryTable categories={{ categories }} deleteCategory={deleteCategory} />
            </div>
        </div>
    );
};

export default AdminCategory;