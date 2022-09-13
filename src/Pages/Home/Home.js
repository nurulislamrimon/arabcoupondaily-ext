import { signOut } from 'firebase/auth';
import React, { useState } from 'react';
import auth from '../../firebase.init';
import CouponTable from '../../Utilities/CouponTable';
import AddNewCouponModal from './AddNewCouponModal';

const Home = () => {
    return (
        <div className='h-[100vh] overflow-hidden'>
            <div className="lg:px-20 py-5 w-full shadow-md fixed z-50 bg-white">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-5">
                        <img src="/favicon.png" alt="" className='w-16 lg:w-20 h-full' />
                        <div>
                            <h2 className='text-sm lg:text-xl font-bold uppercase'>Arab coupon daily</h2>
                            <h1 className="text-md lg:text-2xl font-bold uppercase">Extention</h1>
                        </div>
                    </div>
                    <div className="flex items-center gap-5">
                        <label htmlFor="addNewCoupon" className="btn modal-button btn-sm btn-outline lg:mr-10">
                            <i className="fa-solid fa-plus"></i> Add new offer
                        </label>
                        <AddNewCouponModal />
                        <button onClick={() => signOut(auth)} className='btn btn-ghost'><i className="fa-solid fa-arrow-right-from-bracket text-2xl"></i></button>
                    </div>
                </div>
            </div>
            <CouponTable />
        </div>
    );
};

export default Home;