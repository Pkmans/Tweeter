import React, { useContext, useState } from 'react'
import { Menu } from 'semantic-ui-react'
import { Link, useNavigate } from 'react-router-dom';

import { AuthContext } from "../context/auth";
import jwtDecode from 'jwt-decode';


function MenuBar() {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const pathname = window.location.pathname;
    const path = pathname === '/' ? 'home' : pathname.substring(1);

    const [activeItem, setActiveItem] = useState(path);


    function handleItemClick(e, { name }) {
        setActiveItem(name)
    };

    function handleItemClickLoggedIn(e) {
        setActiveItem('home')
    }

    function logoutHandler() {
        logout();
        navigate('/');
        setActiveItem('home');
    }

    // Decode token for profile navigation
    const token = localStorage.getItem('jwtToken');
    let decodedToken = null;
    if (token) {
        decodedToken = jwtDecode(token);
    }

    return (
        <div className="menu-bar-container">
            {user && token ? (
                <Menu pointing secondary size='massive' color='teal'>
                    <Menu.Item
                        name={user.username}
                        active={activeItem === `home`}
                        onClick={handleItemClickLoggedIn}
                        as={Link}
                        to='/'
                    />

                    <Menu.Menu position='right'>
                        <Menu.Item
                            name='profile'
                            active={activeItem === 'profile'}
                            onClick={handleItemClick}
                            as={Link}
                            to={`/profiles/${decodedToken.profile}`} /* TODO */
                        />
                        <Menu.Item
                            name='logout'
                            onClick={logoutHandler}
                        />
                    </Menu.Menu>
                </Menu>
            ) : (
                <Menu pointing secondary size='massive' color='teal'>
                    <Menu.Item
                        name='home'
                        active={activeItem === 'home'}
                        onClick={handleItemClick}
                        as={Link}
                        to='/'
                    />

                    <Menu.Menu position='right'>
                        <Menu.Item
                            name='login'
                            active={activeItem === 'login'}
                            onClick={handleItemClick}
                            as={Link}
                            to='/login'
                        />
                        <Menu.Item
                            name='register'
                            active={activeItem === 'register'}
                            onClick={handleItemClick}
                            as={Link}
                            to='/register'
                        />
                    </Menu.Menu>

                </Menu>
            )
            }
        </div >
    )
}

export default MenuBar;
