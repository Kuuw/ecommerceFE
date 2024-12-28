import React from 'react';
import Button from '../atoms/Button';
import ButtonStyles from '../../styles/ButtonStyles';

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
                className='paging-button mr-2'
                style={ButtonStyles.GRAY}
            >
                Previous
            </Button>
            <span className='text-black dark:text-white'>Page {currentPage} of {totalPages}</span>
            <Button
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
                className='paging-button'
                style={ButtonStyles.GRAY}
            >
                Next
            </Button>
        </div>
    );
};

export default PagingController;