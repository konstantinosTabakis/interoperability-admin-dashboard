import { NavLink, useNavigate } from "react-router-dom"
import { auth } from "../db/firebase.config"
import UserContext from "../context/UserContext"
import { useContext } from "react"



function Menu() {
    const {dispatch} = useContext(UserContext)
    const navigate= useNavigate()

    const handleLogOut = ()=>{
        dispatch({type: 'DELETE_CURRENT_USER'})
        auth.signOut()
        navigate('/signIn')
      }

    return (
        <nav className='navigation'>
            <div className="logo centered mg-b-big"> 
                LOGO
            </div>
            <div className="navigation__menu">
                <ul className="centered">
                    <li><NavLink className="navigation__menu-item" to='/'>Home</NavLink></li>
                    <li><NavLink className="navigation__menu-item" to='/surveys'>Surveys</NavLink></li>
                    <li><NavLink className="navigation__menu-item" to='/newSurvey'>New Survey</NavLink></li>
                    {/* <li><NavLink className="navigation__menu-item" to='/questions'>Questions</NavLink></li> */}
                    <li><NavLink className="navigation__menu-item" to='/users'>Users</NavLink></li>
                    <li className="navigation__menu-item mx-auto button" onClick={handleLogOut}>  Log out</li>
                </ul>
                
            </div>
            
        </nav>
    )
}

export default Menu