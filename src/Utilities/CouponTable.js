import React, { useState } from 'react';
import DeleteCoupon from './DeleteCoupon';
import DeleteToast from './DeleteToast';
import EditCoupon from './EditCoupon';
import EditToast from './EditToast';
import SuccessToast from './SuccessToast';

const CouponTable = ({ data, showSuccessToast, setShowSuccessToast, refetch }) => {
    const [showDeleteToast, setShowDeleteToast] = useState(false);
    const [showEditToast, setShowEditToast] = useState(false);
    const [editCoupon, setEditCoupon] = useState(null);
    const [deleteCoupon, setDeleteCoupon] = useState(null);

    return (
        <section>

            <div className="lg:px-20 pt-28 lg:pt-24 h-[100vh] overflow-auto scrollbar-hide">
                <p className="text-lg font-bold py-3 px-3">Offer List</p>
                {showSuccessToast && <SuccessToast setShowSuccessToast={setShowSuccessToast} />}
                <table className="table w-full z-0 overflow-auto">

                    <tbody>
                        {data?.map((coupon) =>
                            <tr key={coupon?._id} className='h-fit'>
                                <td>
                                    <div className="flex items-center gap-5">
                                        <img src={coupon?.picture} alt="" className='w-16 lg:w-20 h-10 object-contain' />
                                        <div>
                                            <h4 className="text-sm lg:text-lg font-bold">{coupon?.name}</h4>
                                            <p title={coupon?.about}>{window?.visualViewport?.width <= 780 ? coupon?.about?.slice(0, 10)?.concat('...') : coupon?.about?.length >= 24 ? coupon?.about?.slice(0, 25)?.concat('...') : coupon?.about}</p>
                                        </div>
                                    </div>
                                </td>
                                <td title={coupon?.link}>{window?.visualViewport?.width <= 780 ? coupon?.link?.slice(0, 10)?.concat('...') : coupon?.link?.length >= 24 ? coupon?.link?.slice(0, 25)?.concat('...') : coupon?.link}</td>
                                <td className='font-bold text-green-500 text-sm lg:text-lg'>{coupon?.code}</td>
                                <td><div className="flex justify-around gap-5">
                                    <label onClick={() => setEditCoupon(coupon)} htmlFor="editCoupon">
                                        <i className="fa-regular fa-pen-to-square cursor-pointer"></i>
                                    </label>
                                    <label onClick={() => setDeleteCoupon(coupon)} htmlFor="deleteCoupon">
                                        <i className="fa-solid fa-trash cursor-pointer"></i>
                                    </label>
                                </div></td>
                            </tr>)}
                    </tbody>
                </table>
            </div>
            {editCoupon && <EditCoupon coupon={editCoupon} refetch={refetch} setEditCoupon={setEditCoupon} setShowEditToast={setShowEditToast} />}
            {deleteCoupon && <DeleteCoupon coupon={deleteCoupon} refetch={refetch} setShowDeleteToast={setShowDeleteToast} showDeleteToast={showDeleteToast} />}
            {showEditToast && <EditToast setShowEditToast={setShowEditToast} />}
            {showDeleteToast && <DeleteToast setShowDeleteToast={setShowDeleteToast} />}
        </section>
    );
};

export default CouponTable;