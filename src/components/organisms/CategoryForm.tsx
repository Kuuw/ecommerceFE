import React from 'react';
import { Category } from '../../types/Category';
import FormField from '../molecules/FormField';
import Button from '../atoms/Button';
import ButtonStyles from '../../styles/ButtonStyles';

interface CategoryFormProps {
    category: Category;
    setCategory: (updatedCategory: Category) => void;
    onSubmit: () => void;
    formTitle?: string;
}

const CategoryForm: React.FC<CategoryFormProps> = ({
    category,
    setCategory,
    onSubmit,
    formTitle = 'Category Form',
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
                        label="Name"
                        type="text"
                        name="name"
                        value={category.name}
                        onChange={(e) =>
                            setCategory({ ...category, name: e.target.value })
                        }
                    />
                </div>
                <div>
                    <FormField
                        label="Description"
                        type="text"
                        name="description"
                        value={category.description}
                        onChange={(e) =>
                            setCategory({ ...category, description: e.target.value })
                        }
                    />
                </div>
                <Button type="submit" style={ButtonStyles.GREEN} className='mt-2'>Save</Button>
            </form>
        </div>
    );
};

export default CategoryForm;