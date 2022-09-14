import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import useGeneratePhotoURL from '../CustomHooks/useGeneratePhotoURL';

const EditCoupon = ({ coupon: prvCoupon, refetch, setEditCoupon, setShowEditToast }) => {
    const { generatePhotoURL } = useGeneratePhotoURL();
    const [coupon, setCoupon] = useState(prvCoupon);
    const { register, handleSubmit, formState: { errors } } = useForm();


    const handleChange = (e) => {
        const { name, value } = e.target;
        const { [name]: property, ...rest } = coupon;
        setCoupon({ [name]: value, ...rest });
    }

    const updateData = (data, id) => {
        fetch(`http://localhost:5000/coupon/${id}`, {
            method: 'put',
            headers: { "content-type": "application/json" },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(data => {
                if (data?.acknowledged) {
                    setEditCoupon('');
                }
                if (data?.modifiedCount) {
                    refetch();
                    setShowEditToast(true);
                }
            })
    }


    const onSubmit = async (data) => {
        if (data?.photoURL?.length) {
            const newPhotoURL = await generatePhotoURL(data?.photoURL[0]);
            const { picture, photoURL, _id, ...rest } = coupon;
            updateData({ picture: newPhotoURL, ...rest }, _id);
        } else {
            const { _id, photoURL, ...rest } = coupon;
            updateData({ ...rest }, _id)
        }
    }

    return (
        <div>
            <input type="checkbox" id="editCoupon" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box relative">
                    <label htmlFor="editCoupon" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                    {/* form */}
                    <form onChange={handleChange} onSubmit={handleSubmit(onSubmit)} className='grid gap-5'>
                        {/* title */}
                        <span className="text-md">Enter Coupon Title:</span>
                        <input {...register("name", { required: true })} value={coupon?.name} className="input input-bordered w-full" />
                        {errors.name &&
                            <label className='label'>
                                <span className="label-text-alt text-red-500">Enter a title!</span>
                            </label>}
                        {/* Description */}
                        <span className="text-md">Enter Coupon Description:</span>
                        <input {...register("about", { required: true })} value={coupon?.about} className="input input-bordered w-full" />
                        {errors.about &&
                            <label className='label'>
                                <span className="label-text-alt text-red-500">Write about the coupon code!</span>
                            </label>}
                        {/* Photo */}
                        <span className="text-md">Photo:</span>
                        <div className="flex">
                            <img src={coupon?.picture} alt="" className='w-10 h-full' />
                            <input type='file' {...register("photoURL")} className="input input-bordered w-full" />
                        </div>
                        {/* Shop URL */}
                        <span className="text-md">Enter Coupon Shop URL:</span>
                        <input {...register("link", { required: true })} value={coupon?.link} className="input input-bordered w-full" />
                        {errors.link &&
                            <label className='label'>
                                <span className="label-text-alt text-red-500">Enter the shop link!</span>
                            </label>}
                        {/* Code */}
                        <span className="text-md">Enter Coupon Code:</span>
                        <input {...register("code", { required: true })} value={coupon?.code} className="input input-bordered w-full" />
                        {errors.code &&
                            <label className='label'>
                                <span className="label-text-alt text-red-500">Enter the discount code!</span>
                            </label>}

                        <button className="btn">Update</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default EditCoupon;