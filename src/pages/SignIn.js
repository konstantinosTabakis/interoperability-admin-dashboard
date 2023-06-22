import { signInWithEmailAndPassword } from 'firebase/auth'
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from '../db/firebase.config';
import { toast } from 'react-toastify'

function SignIn() {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    })
    const { email, password } = formData
    const navigate = useNavigate()

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.id]: e.target.value,
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {

            const userCredential = await signInWithEmailAndPassword(
                auth,
                email,
                password
            )

            if (userCredential.user) {
                navigate('/')
            }
        } catch (error) {
            toast.error('Wrong credentials', {
                position: toast.POSITION.TOP_CENTER
            })
        }
    }

    return (
        <div className="card sign-in-form modal">
            <form onSubmit={handleSubmit}>
                <h2 className="heading-secondary centered mg-b-small">
                    Sign In
                </h2>
                <label htmlFor="email">Email</label>
                <input className='w-100 mg-b-small' type="email" id="email" placeholder='Type your email' onChange={onChange} value={email} />
                <label htmlFor="password">Password</label>
                <input className='w-100 mg-b-medium' type="password" id="password" placeholder='Type your password' onChange={onChange} value={password} />
                <button type='submit' className='btn btn-primary w-100'  >Submit</button>
            </form>
        </div>
    )
}

export default SignIn