import React, { useContext, useState } from 'react'
import { Menu } from 'semantic-ui-react'
import { Link } from 'react-router-dom';

import { AuthContext } from "../context/auth";

function MenuBar() {
    const context = useContext(AuthContext);
    const pathname = window.location.pathname;
    const path = pathname === '/' ? 'home' : pathname.substring(1);

    const [activeItem, setActiveItem] = useState(path);

    function handleItemClick(e, { name }) {
        setActiveItem(name)
    };

    return (
        <div className="menu-bar-container">
            {context.user ? (
                <Menu pointing secondary size='massive' color='teal'>
                    <Menu.Item
                        name={context.user.username}
                        active
                        as={Link}
                        to='/'
                    />
                    <Menu.Menu position='right'>
                        <Menu.Item
                            name='logout'
                            onClick={context.logout}
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
