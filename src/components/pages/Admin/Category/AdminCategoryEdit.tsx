import React, { useEffect, useState } from 'react';
import CategoryForm from '../../../organisms/CategoryForm';
import { Category } from '../../../../types/Category';
import CategoryService from '../../../../services/CategoryService';
import { useNavigate, useParams } from 'react-router-dom';
import Button from '../../../atoms/Button';
import ButtonStyles from '../../../../styles/ButtonStyles';

const AdminCategoryEdit: React.FC = () => {
    const [category, setCategory] = useState<Category>({ name: '', description: '' });
    const categoryService = new CategoryService();
    const { categoryId } = useParams();

    const navigate = useNavigate();

    const fetchCategory = () => {
        categoryService.getById(Number(categoryId)).then(response => {
            setCategory(response.data);
        }).catch(error => {
            console.error('Error fetching category:', error);
        });
    };

    const handleSubmit = () => {
        categoryService.put(Number(categoryId), category).then(response => {
            setCategory({ name: '', description: '' });
            navigate('/admin/category');
        }).catch(error => {
            console.error('Error creating category:', error);
        });
    };

    useEffect(() => {
        fetchCategory();
    }, []);

    return (

        <div className='p-5'>
            <Button onClick={() => navigate('/admin/category')} className='m-3 h-10' style={ButtonStyles.BLUE}>Back to Categories</Button>
            <div className='p-5 flex justify-center mt-5'>
                <CategoryForm
                    category={category}
                    setCategory={setCategory}
                    onSubmit={handleSubmit}
                    formTitle="Edit Category"
                />
            </div>
        </div>
    );
};

export default AdminCategoryEdit;