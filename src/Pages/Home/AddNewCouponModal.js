import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import useGeneratePhotoURL from '../../CustomHooks/useGeneratePhotoURL';
import LoadingSpinner from '../../Utilities/LoadingSpinner';

const AddNewCouponModal = ({ setOpenModal, refetch, setShowSuccessToast }) => {
    const { generatePhotoURL } = useGeneratePhotoURL();
    const [isLoading, setIsLoading] = useState(false);

    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = async data => {
        setIsLoading(true);
        const newPhotoURL = await generatePhotoURL(data?.photoURL[0]);
        const { photoURL, ...rest } = data;
        fetch('https://arabcoupondaily-ext.herokuapp.com/coupon', {
            method: 'post',
            headers: { "content-type": "application/json" },
            body: JSON.stringify({ picture: newPhotoURL, ...rest })
        })
            .then(res => res.json())
            .then(data => { if (data?.acknowledged) { setShowSuccessToast(true) } });
        setOpenModal(false);
        refetch();
        setIsLoading(false);
    };

    isLoading && <LoadingSpinner />

    return (
        <div>
            <input type="checkbox" id="addNewCoupon" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box relative">
                    <label htmlFor="addNewCoupon" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                    {/* form */}
                    <form onSubmit={handleSubmit(onSubmit)} className='grid gap-5'>
                        {/* title */}
                        <span className="text-md">Enter Coupon Title:</span>
                        <input {...register("name", { required: true })} className="input input-bordered w-full" />
                        {errors.name &&
                            <label className='label'>
                                <span className="label-text-alt text-red-500">Enter a title!</span>
                            </label>}
                        {/* Description */}
                        <span className="text-md">Enter Coupon Description:</span>
                        <input {...register("about", { required: true })} className="input input-bordered w-full" />
                        {errors.about &&
                            <label className='label'>
                                <span className="label-text-alt text-red-500">Write about the coupon code!</span>
                            </label>}
                        {/* Photo */}
                        <span className="text-md">Photo:</span>
                        <input type='file' {...register("photoURL", { required: true })} className="input input-bordered w-full" />
                        {errors.photoURL &&
                            <label className='label'>
                                <span className="label-text-alt text-red-500">Upload a photo!</span>
                            </label>}
                        {/* Shop URL */}
                        <span className="text-md">Enter Coupon Shop URL:</span>
                        <input {...register("link", { required: true })} className="input input-bordered w-full" />
                        {errors.link &&
                            <label className='label'>
                                <span className="label-text-alt text-red-500">Enter the shop link!</span>
                            </label>}
                        {/* Code */}
                        <span className="text-md">Enter Coupon Code:</span>
                        <input {...register("code", { required: true })} className="input input-bordered w-full" />
                        {errors.code &&
                            <label className='label'>
                                <span className="label-text-alt text-red-500">Enter the discount code!</span>
                            </label>}

                        <button className="btn">Add New Coupon</button>
                    </form>

                </div>
            </div>
        </div>
    );
};

export default AddNewCouponModal;