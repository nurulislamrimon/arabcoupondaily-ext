import React from 'react';
import { useForm } from 'react-hook-form';

const Login = () => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const onSubmit = data => console.log(data);
    console.log(watch("example"));

    return (
        <section className='p-10 w-2/4 mx-auto'>
            <h1 className="text-2xl font-bold text-center">Login</h1>
            <form onSubmit={handleSubmit(onsubmit)}>
                {/* include validation with required or other standard HTML validation rules */}
                <input {...register("exampleRequired", { required: true })} />
                {/* errors will return when field validation fails  */}
                {errors.exampleRequired && <span>This field is required</span>}

                <input type="submit" />

            </form>
        </section>
    );
};

export default Login;