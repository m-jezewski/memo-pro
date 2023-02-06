import { useFormik } from "formik";



interface RegisterFormProps {

}

export const RegisterForm = ({ }: RegisterFormProps) => {
    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        onSubmit: async values => {
            try {
                await fetch('http://localhost:3000/api/user/create', {
                    method: 'POST',
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(values)
                })
            } catch (error) {
                console.log(error)
            }
        }
    })

    return (
        <form onSubmit={formik.handleSubmit} className='flex flex-col items-center w-full gap-1'>
            <label htmlFor='email' className='w-full'>
                Email:
            </label>
            <input
                name='email'
                className='block rounded-full p-2 pl-3 w-full text-black'
                type='email'
                onChange={formik.handleChange}
                value={formik.values.email}
            />
            <label htmlFor='password' className='w-full mt-4'>
                Password:
            </label>
            <input
                name='password'
                className='block rounded-full p-2 pl-3 w-full text-black'
                type='password'
                onChange={formik.handleChange}
                value={formik.values.password}
            />
            <button className='bg-light_blue_1 font-medium transition p-2 w-full rounded-full mt-6 leading-6 hover:bg-white_1 hover:text-red_1' type='submit'>SUBMIT</button>
        </form>
    );
}