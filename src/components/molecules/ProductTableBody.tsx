import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "../atoms/Button";
import ButtonStyles from "../../styles/ButtonStyles";
import { Product } from "../../types/Product";

type ProductTableBodyProps = {
    products: Product[];
    deleteProduct: (productId: number) => void;
};

export const ProductTableBody: React.FC<ProductTableBodyProps> = ({ products, deleteProduct }) => {
    const navigate = useNavigate();
    return (
        <tbody>
            {products.map((prod) => (
                <tr key={prod.productId} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                    <td className="pl-3 py-2">{prod.name}</td>
                    <td className="pl-3 py-2">{prod.description}</td>
                    <td className="pl-3 py-2">{prod.unitPrice}</td>
                    <td className="pl-3 py-2">
                        <Button onClick={() => navigate(`/admin/product/stock/${prod.productId}`)} style={ButtonStyles.BLUE}>
                            Stock
                        </Button>
                    </td>
                    <td className="pl-3 py-2">
                        <Button onClick={() => navigate(`/admin/product/image/${prod.productId}`)} style={ButtonStyles.BLUE}>
                            Images
                        </Button>
                    </td>
                    <td className="pl-3 py-2">
                        <Button onClick={() => navigate(`/admin/product/edit/${prod.productId}`)} style={ButtonStyles.BLUE}>
                            Edit
                        </Button>
                    </td>
                    <td className="pl-3 py-2">
                        <Button onClick={() => deleteProduct(prod.productId ?? 0)} style={ButtonStyles.RED}>
                            Remove
                        </Button>
                    </td>
                </tr>
            ))}
        </tbody>
    );
};

export default ProductTableBody;