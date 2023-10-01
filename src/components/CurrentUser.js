import { useContext, useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom"
import { auth } from "../db/firebase.config"
import UserContext from "../context/UserContext";
import avatar from "../assets/img/avatar2.png";
import {BsList} from 'react-icons/bs'

function CurrentUser() {
    const { currentUserEmail, dispatch } = useContext(UserContext);
    const [isMenuOpen, setMenuOpen] = useState(false);
    const menuRef = useRef(null);

    const navigate = useNavigate()

    const handleLogOut = () => {
        dispatch({ type: 'DELETE_CURRENT_USER' })
        auth.signOut()
        navigate('/signIn')
    };

    const handleMenu = () =>{
        document.getElementById('navigation').classList.add('open')
    }

    const handleImageFocus = () => {
        setMenuOpen(true);
    };

    const handleImageBlur = () => {
        setTimeout(() => {
            setMenuOpen(false);
        }, 200);
    };

    useEffect(() => {
        const handleOutsideClick = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setMenuOpen(false);
            }
        };

        document.addEventListener("mousedown", handleOutsideClick);
        return () => {
            document.removeEventListener("mousedown", handleOutsideClick);
        };
    }, []);

    return (
        <div className="current-user">
            <BsList onClick={handleMenu}/>
            <img
                src={avatar}
                alt="avatar image"
                onFocus={handleImageFocus}
                onBlur={handleImageBlur}
                tabIndex={0}
            />
            {isMenuOpen && (
                <div className="card  drop-down-menu" ref={menuRef}>
                    <h3>Logged as:</h3>
                    <div className="mg-b-small">{currentUserEmail}</div>
                    <button className="btn btn-primary w-100" onClick={handleLogOut}>
                        Log Out
                    </button>
                </div>
            )}
        </div>
    );
}

export default CurrentUser;