import { NavLink } from "react-router-dom"
import Logo from "./Logo"

function Menu() {
    
    return (
        <nav className='navigation'>
            <div className="loggedUser centered mg-b-big">
                <Logo />
            </div>
            <div className="navigation__menu">
                <ul className="centered">
                    <li><NavLink className="navigation__menu-item" to='/'> <span>Home</span>  </NavLink></li>
                    <li><NavLink className="navigation__menu-item" to='/evaluations'>  <span>Evaluations</span>  </NavLink></li>
                    <li><NavLink className="navigation__menu-item" to='/surveys'>  <span>Surveys</span>  </NavLink></li>
                    <li><NavLink className="navigation__menu-item" to='/newSurvey'> <span>New Survey</span> </NavLink></li>
                    <li><NavLink className="navigation__menu-item" to='/questions'>Questions</NavLink></li>
                    <li><NavLink className="navigation__menu-item" to='/users'> <span>Users</span> </NavLink></li>
                    <li><NavLink className="navigation__menu-item" to='/about'> <span>About</span> </NavLink></li>
                </ul>

            </div>

        </nav>
    )
}

export default Menu