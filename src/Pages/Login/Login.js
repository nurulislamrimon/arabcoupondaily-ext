import React, { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSendPasswordResetEmail, useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import auth from '../../firebase.init';
import { useNavigate } from 'react-router-dom';
import LoadingSpinner from '../../Utilities/LoadingSpinner';


const Login = () => {
    const [resetMsg, setResetMsg] = useState('');
    const [gotoReset, setGotoReset] = useState(false);
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [signInWithEmailAndPassword, user, loading, error] = useSignInWithEmailAndPassword(auth);
    const [sendPasswordResetEmail, sending, resetError] = useSendPasswordResetEmail(auth);
    const resetEmail = useRef('');

    const onSubmit = data => signInWithEmailAndPassword(data?.email, data?.password);
    loading && <LoadingSpinner />
    user?.user?.uid && navigate('/home');

    return (
        <section className='p-10 lg:w-2/4 mx-auto'>
            {!gotoReset ? <div>
                <img src="/favicon.png" alt="" className='w-20 mx-auto' />
                <h1 className="text-2xl font-bold text-center">Login</h1>
                <form onSubmit={handleSubmit(onSubmit)} className='mt-5 grid gap-3'>
                    {/* user email */}
                    <span className="text-md">Your email:</span>
                    <input {...register("email", { required: true })} className="input input-bordered w-full" />
                    {errors.email &&
                        <label className='label'>
                            <span className="label-text-alt text-red-500">Enter an mail address!</span>
                        </label>}
                    {/* user password */}
                    <span className="text-md">Your password:</span>
                    <input {...register("password", { required: true })} className="input input-bordered w-full" />
                    {errors.password &&
                        <label className='label'>
                            <span className="label-text-alt text-red-500">Enter a password!</span>
                        </label>}

                    {(!resetError && resetMsg) && <p className='text-center text-success'>{resetMsg}</p>}
                    {(error || resetError) && <p className='text-red-500'>{error?.message || resetError?.message}</p>}
                    <input type="submit" className='btn' />
                </form>
                <p className='text-center mt-5'>Forgot password? <button onClick={() => setGotoReset(true)} className='text-secondary hover:underline'>Go to reset option</button></p>
            </div>
                :
                <div className='grid gap-5'>
                    <img src="/favicon.png" alt="" className='w-20 mx-auto' />
                    <h1 className="text-2xl font-bold text-center">Reset Password</h1>
                    <label>Enter email address you want to reset:</label>
                    <input ref={resetEmail} className="input input-bordered w-full" />
                    <button onClick={async () => {
                        await sendPasswordResetEmail(resetEmail?.current?.value)
                        setResetMsg(`Reset message sended to ${resetEmail?.current?.value}`)
                        setGotoReset(false)
                    }} className='btn'>Send Reset Mail</button>
                    <p className='text-center mt-5'>Remembered? <button onClick={() => setGotoReset(false)} className='text-secondary hover:underline'>Go back to Login</button></p>
                </div>}
        </section>
    );
};

export default Login;