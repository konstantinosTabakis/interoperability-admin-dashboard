import {  signInWithEmailAndPassword } from 'firebase/auth'
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from '../db/firebase.config';


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

    const handleSubmit = async () => {
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
                console.log('Bad User Credentials')
                alert('NOOO')
          }
    }

    return (
        <div className="card sign-in-form">
            <h2 className="heading-secondary centered mg-b-small">
                Sign In
            </h2>
            <label htmlFor="email">Email</label>
            <input className='w-100 mg-b-small' type="email" id="email" placeholder='Type your email' onChange={onChange} value={email} />
            <label htmlFor="password">Password</label>
            <input className='w-100 mg-b-medium' type="password" id="password" placeholder='Type your password' onChange={onChange} value={password}/>
            <button className='btn btn-primary w-100' onClick={handleSubmit}>Submit</button>
        </div>
    )
}

export default SignIn