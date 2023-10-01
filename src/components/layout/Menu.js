import { NavLink } from "react-router-dom"
import Logo from "./Logo"
import {BsXLg} from 'react-icons/bs'

function Menu() {

    const handleMenu = () => {
        document.getElementById('navigation').classList.remove('open')
    }

    
    return (
        <nav className='navigation' id="navigation">
            <BsXLg onClick={handleMenu}/>
            <div className="loggedUser centered mg-b-big">
                <Logo />
            </div>
            <div className="navigation__menu">
                <ul className="centered">
                    <li><NavLink className="navigation__menu-item" onClick={handleMenu} to='/'> <span>Home</span>  </NavLink></li>
                    <li><NavLink className="navigation__menu-item" onClick={handleMenu} to='/evaluations'>  <span>Evaluations</span>  </NavLink></li>
                    <li><NavLink className="navigation__menu-item" onClick={handleMenu} to='/surveys'>  <span>Surveys</span>  </NavLink></li>
                    <li><NavLink className="navigation__menu-item" onClick={handleMenu} to='/newSurvey'> <span>New Survey</span> </NavLink></li>
                    <li><NavLink className="navigation__menu-item" onClick={handleMenu} to='/questions'><span>Questions</span> </NavLink></li>
                    <li><NavLink className="navigation__menu-item" onClick={handleMenu} to='/users'> <span>Users</span> </NavLink></li>
                    <li><NavLink className="navigation__menu-item" onClick={handleMenu} to='/about'> <span>About</span> </NavLink></li>
                </ul>

            </div>

        </nav>
    )
}

export default Menu