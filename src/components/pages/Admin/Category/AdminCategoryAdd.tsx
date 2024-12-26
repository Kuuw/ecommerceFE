import React, { useState } from 'react';
import CategoryForm from '../../../organisms/CategoryForm';
import { Category } from '../../../../types/Category';
import CategoryService from '../../../../services/CategoryService';
import { useNavigate } from 'react-router-dom';

const AdminCategoryAdd: React.FC = () => {
    const [category, setCategory] = useState<Category>({ name: '', description: '' });
    const categoryService = new CategoryService();
    const navigate = useNavigate();

    const handleSubmit = () => {
        categoryService.post(category).then(response => {
            setCategory({ name: '', description: '' });
            navigate('/admin/category');
        }).catch(error => {
            console.error('Error creating category:', error);
        });
    };

    return (
        <div className='p-5 flex justify-center'>
            <CategoryForm
                category={category}
                setCategory={setCategory}
                onSubmit={handleSubmit}
                formTitle="Add New Category"
            />
        </div>
    );
};

export default AdminCategoryAdd;