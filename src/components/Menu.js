import { NavLink, useNavigate } from "react-router-dom"
import { auth } from "../db/firebase.config"
import UserContext from "../context/UserContext"
import { useContext } from "react"
import avatar from '../assets/img/avatar.png'



function Menu() {
    const {currentUserEmail, dispatch} = useContext(UserContext)
    const navigate= useNavigate()

    const handleLogOut = ()=>{
        dispatch({type: 'DELETE_CURRENT_USER'})
        auth.signOut()
        navigate('/signIn')
      }

    return (
        <nav className='navigation'>
            <div className="loggedUser centered mg-b-big"> 
            <img src={avatar} alt="" />
                <span>Logged in as:</span>
               <span className="email">{currentUserEmail}</span> 
            </div>
            <div className="navigation__menu">
                <ul className="centered">
                    <li><NavLink className="navigation__menu-item" to='/'> <span>Home</span>  </NavLink></li>
                    <li><NavLink className="navigation__menu-item" to='/surveys'>  <span>Surveys</span>  </NavLink></li>
                    <li><NavLink className="navigation__menu-item" to='/newSurvey'> <span>New Survey</span> </NavLink></li>
                    <li><NavLink className="navigation__menu-item" to='/questions'>Questions</NavLink></li>
                    <li><NavLink className="navigation__menu-item" to='/users'> <span>Users</span> </NavLink></li>
                    <li className="navigation__menu-item mx-auto button" onClick={handleLogOut}>  Log out</li>
                </ul>
                
            </div>
            
        </nav>
    )
}

export default Menu