import React from 'react';

interface TableHeadProps {
    columns: string[];
}

const TableHead: React.FC<TableHeadProps> = ({ columns }) => {
    return (
        <thead>
            <tr>
                {columns.map((column, index) => (
                    <th scope='col' className='px-6 py-3' key={index}>{column}</th>
                ))}
            </tr>
        </thead>
    );
};

export default TableHead;