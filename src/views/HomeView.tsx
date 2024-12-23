import React from 'react';
import Products from '../components/pages/Products';

const HomeView: React.FC = () => {
    return (
        <div className='bg-slate-950'>
            <div className='m-5'>
                <Products />
            </div>
        </div>
    );
};

export default HomeView;