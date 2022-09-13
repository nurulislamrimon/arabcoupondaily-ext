import React from 'react';

const DeleteCoupon = ({ coupon, refetch, setShowDeleteToast, showDeleteToast }) => {
    const handleDelete = (id) => {
        fetch(`http://localhost:5000/coupon/${id}`, {
            method: 'delete'
        })
            .then(res => res.json())
            .then(data => { if (data?.deletedCount) { setShowDeleteToast(true) } })
        refetch();
    }

    return (
        <div>
            <input type="checkbox" id="deleteCoupon" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box relative">
                    <label htmlFor="deleteCoupon" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                    <h3 className="text-lg font-bold">Are you sure want to delete:</h3>
                    <img src={coupon?.picture} className='h-20 w-20 object-contain mx-auto' alt="" />
                    <div className='text-center'>
                        <p className="text-xl font-bold">{coupon?.name}</p>
                        <p>Code: {coupon?.code}</p>
                        <p>Shop Link: {coupon?.link}</p>
                        <p>{coupon?.about}</p>
                    </div>
                    <div className="mx-auto flex gap-5 mt-5 w-fit">
                        <label htmlFor="deleteCoupon" className="btn">No</label>
                        <label htmlFor="deleteCoupon" onClick={() => handleDelete(coupon?._id)} className='btn btn-warning'>Delete</label></div>
                </div>
            </div>
        </div>
    );
};

export default DeleteCoupon;