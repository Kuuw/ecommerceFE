import React from 'react';

interface TableHeadProps {
    columns: string[];
}

const TableHead: React.FC<TableHeadProps> = ({ columns }) => {
    return (
        <thead>
            <tr>
                {columns.map((column, index) => (
                    <th scope='col' className='border border-gray-300 px-4 py-2 text-center dark:text-white text-black' key={index}>{column}</th>
                ))}
            </tr>
        </thead>
    );
};

export default TableHead;