import React from 'react';
import Button from '../atoms/Button';

interface PagingControllerProps {
    currentPage: number;
    totalPages: number;
    handlePreviousPage: () => void;
    handleNextPage: () => void;
}

const PagingController: React.FC<PagingControllerProps> = ({ currentPage, totalPages, handlePreviousPage, handleNextPage }) => {
    return (
        <div className='paging-container'>
            <Button
                onClick={handlePreviousPage}
                disabled={currentPage === 1}
                className='paging-button text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-3 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700'
            >
                Previous
            </Button>
            <span>Page {currentPage} of {totalPages}</span>
            <Button
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
                className='paging-button text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-3 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700'
            >
                Next
            </Button>
        </div>
    );
};

export default PagingController;