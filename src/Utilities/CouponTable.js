import React from 'react';
import useCoupons from '../CustomHooks/useCoupons';

const CouponTable = () => {
    const { data } = useCoupons();

    return (
        <section className='h-[100vh] overflow-hidden'>
            <div className="lg:px-20 py-5 w-full shadow-md fixed z-50 bg-white">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-5">
                        <img src="/favicon.png" alt="" className='w-20 h-full' />
                        <div>
                            <h2 className='text-sm lg:text-xl font-bold uppercase'>Arab coupon daily</h2>
                            <h1 className="text-md lg:text-2xl font-bold uppercase">Extention</h1>
                        </div>
                    </div>
                    <div className="flex items-center gap-5">
                        <button className='btn btn-sm btn-outline lg:mr-10'><i className="fa-solid fa-plus"></i> Add new offer</button>

                        <button><i className="fa-solid fa-arrow-right-from-bracket text-2xl"></i></button>
                    </div>
                </div>
            </div>
            <div className="lg:px-20 pt-28 lg:pt-24 h-[100vh] overflow-auto scrollbar-hide">
                <p className="text-lg font-bold py-3 px-3">Offer List</p>
                <table className="table w-full z-0 overflow-auto">

                    <tbody>
                        {data?.map((coupon) =>
                            <tr key={coupon?._id} className='h-fit'>
                                <td>
                                    <div className="flex items-center gap-5">
                                        <img src={coupon?.picture} alt="" className='w-16 lg:w-20 h-full object-fit' />
                                        <div>
                                            <h4 className="text-sm lg:text-lg font-bold">{coupon?.name}</h4>
                                            <p title={coupon?.about}>{window?.visualViewport?.width <= 780 ? coupon?.about?.slice(0, 10)?.concat('...') : coupon?.about}</p>
                                        </div></div>
                                </td>
                                <td title={coupon?.link}>{window?.visualViewport?.width <= 780 ? coupon?.link?.slice(0, 10)?.concat('...') : coupon?.link}</td>
                                <td className='font-bold text-green-500 text-sm lg:text-lg'>{coupon?.code}</td>
                                <td><div className="flex justify-around gap-5">
                                    <i className="fa-regular fa-pen-to-square"></i>
                                    <i className="fa-solid fa-trash"></i></div></td>
                            </tr>)}
                    </tbody>
                </table>
            </div>
        </section>
    );
};

export default CouponTable;