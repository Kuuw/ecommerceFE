import React from "react";
import { Category } from "../../types/Category";
import { useNavigate } from "react-router-dom";
import Button from "../atoms/Button";
import ButtonStyles from "../../styles/ButtonStyles";

type CategoryTableBodyProps = {
    categories: Category[];
    deleteCategory: (categoryId: number) => void;
};

export const CategoryTableBody: React.FC<CategoryTableBodyProps> = ({ categories, deleteCategory }) => {
    const navigate = useNavigate();
    return (
        <tbody>
            {categories.map((cat) => (
                <tr key={cat.categoryId} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                    <td className="pl-3 py-2 text-center text-black dark:text-white border">{cat.name}</td>
                    <td className="pl-3 py-2 text-center text-black dark:text-white border">{cat.description}</td>
                    <td className="pl-3 py-2 text-center text-black dark:text-white border">
                        <Button onClick={() => navigate(`/admin/category/edit/${cat.categoryId}`)} style={ButtonStyles.BLUE}>
                            Edit
                        </Button>
                    </td>
                    <td className="pl-3 py-2 text-center text-black dark:text-white border">
                        <Button onClick={() => deleteCategory(cat.categoryId ?? 0)} style={ButtonStyles.RED}>
                            Remove
                        </Button>
                    </td>
                </tr>
            ))}
        </tbody>
    );
};

export default CategoryTableBody;