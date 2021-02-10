import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';
import { useHistory } from 'react-router-dom';
import './ProfileButton.css'

const ProfileButton = ({user}) => {
    const dispatch = useDispatch(); 
    const history = useHistory(); 
    const [showMenu, setShowMenu] = useState(false); 

    const openMenu = () => {
        if (showMenu) return; 
        setShowMenu(true); 
    };

    useEffect(() => {
        if (!showMenu) return; 

        const closeMenu = () => {
            setShowMenu(false); 
        };

        document.addEventListener('click', closeMenu); 

        return () => document.removeEventListener("click", closeMenu);
    }, [showMenu]); 

    const logout = (e) => {
        e.preventDefault(); 
        history.push("/"); 
        dispatch(sessionActions.logout()); 
    };

    return (
        <div className={"profilebutton__container"}>
            <button onClick={openMenu} className={"profilebutton__button"}>
                <i className="fas fa-user-circle"/> 
            </button>
            {showMenu && (
                <ul className="profile-dropdown">
                    <li>{user.username}</li>
                    <li>{user.email}</li>
                    <li>
                        <button onClick={logout} className={"profile-dropdown__button"}>Log Out</button>
                    </li>
                </ul>
            )}
        </div>
    );
}

export default ProfileButton; 