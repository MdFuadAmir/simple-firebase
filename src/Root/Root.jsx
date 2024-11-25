import React from 'react';
import { Outlet } from 'react-router-dom';
import Navber from '../Navber/Navber';

const Root = () => {
    return (
        <div className='max-w-7xl'>
            <Navber/>
            <Outlet/>
        </div>
    );
};

export default Root;