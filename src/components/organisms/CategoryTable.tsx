import React from 'react';
import TableHead from '../molecules/TableHead';
import CategoryTableBody from '../molecules/CategoryTableBody';
import { Category } from '../../types/Category';

interface CategoryTableProps {
    categories: { categories: Category[] } | undefined;
    deleteCategory: (categoryId: number) => void;
}

const CategoryTable: React.FC<CategoryTableProps> = ({ categories, deleteCategory }) => {
    return (
        <table className='table-auto w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400'>
            <TableHead columns={["Name", "Description", "Edit", "Remove"]} />
            <CategoryTableBody categories={categories?.categories ?? []} deleteCategory={deleteCategory} />
        </table>
    );
};

export default CategoryTable;