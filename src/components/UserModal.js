import { useContext, useState } from 'react'
import exitIcon from '../assets/img/exit.png'
import { addUser } from '../db/db-services'
import UserContext from '../context/UserContext'
import { auth } from '../db/firebase.config'
import { useNavigate } from 'react-router-dom'


function UserModal({ handleCreate }) {
    const {dispatch} = useContext(UserContext)

    const [formData, setFormData] = useState({
        email: '',
        name: '',
        password: '',
        confirmPassword: '',
        role: 'admin'
    })
    const { email, name, password, confirmPassword, role } = formData

    const navigate= useNavigate()

    const closeModal = () => {
        handleCreate();
      };

    const handleChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.id]: e.target.value,
        }))
    }

    const handleSubmit = async (e) =>{
        e.preventDefault()
        if(email =='' || name== ''|| password== '' || confirmPassword == ''){
            alert('Please fill out all fields')
        }else if(password != confirmPassword){
            alert('Confirm Password')
        }else{
            const data= await addUser(formData)
            console.log(data);
            dispatch({ type: 'ADD_USER', user: data })
            dispatch({type: 'DELETE_CURRENT_USER'})
            auth.signOut()
            navigate('/signIn')
        }
    }

    return (
        <div className="card modal">
            <div className="btn-area">
                <button>
                    <img src={exitIcon} onClick={closeModal} alt="exit icon" />
                </button>
            </div>
            <h2 className="heading-secondary centered mg-b-small"> New User</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="email" className="mg-b-tiny">Email</label>
                <input type="text" id="email" className="input-basic w-100 mg-b-small" value={email} onChange={handleChange} />
                <label htmlFor="name" className="mg-b-tiny">Name</label>
                <input type="text" id="name" className="input-basic w-100 mg-b-small" value={name} onChange={handleChange} />
                <label htmlFor="password" className="mg-b-tiny">Password</label>
                <input type="password" id="password" className="input-basic w-100 mg-b-small" value={password} onChange={handleChange} />
                <label htmlFor="confirmPassword" className="mg-b-tiny">Confirm Password </label>
                <input type="password" id="confirmPassword" className="input-basic w-100 mg-b-small" value={confirmPassword} onChange={handleChange} />
                <label htmlFor="role" className="mg-b-tiny"> Role </label>
                <select id='role' className="input-basic mg-b-medium" onChange={handleChange}>
                    <option value="admin">Admin</option>
                    <option value="viewer">Viewer</option>
                </select>
                <button type="submit" className="btn btn-primary w-100">Submit</button>
            </form>
        </div>
    )
}

export default UserModal