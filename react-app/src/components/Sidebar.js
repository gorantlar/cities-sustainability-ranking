import React, { useState } from 'react';
import { FaBars } from 'react-icons/fa';
import { AiOutlineDoubleRight } from 'react-icons/ai';
import { IconContext } from 'react-icons';
import './Sidebar.css';
import City from './City';
import Details from './Details';
import Chart from './Chart/Chart';
import { useSelector, useDispatch } from 'react-redux';
import { closeSidebar, openSidebar } from '../actions/index';

function Sidebar() {
    let dispatch = useDispatch();
    // const [sidebar, setSidebar] = useState(false);
    const { showSidebar } = useSelector(state => state.cityData);
    const { citySelected } = useSelector(state => state.cityData);

    const sidebarButtonClicked = () => {
        if(showSidebar){
            dispatch(closeSidebar());
        }else{
            dispatch(openSidebar());   
        }
    };

    return (
        <>
            <div className='navbar'>
                <div className='button-bar'>
                    <IconContext.Provider value={{ color: '#fff' }}>
                        <FaBars onClick={sidebarButtonClicked} />
                    </IconContext.Provider>
                </div>
            </div>
            <nav className={showSidebar ? 'nav-menu active' : 'nav-menu'}>
                <ul className='nav-menu-items'>
                    <li className='navbar-toggle'>
                        <div className='menu-bar'>
                            <IconContext.Provider value={{ color: '#fff' }}>
                                <AiOutlineDoubleRight onClick={sidebarButtonClicked} />
                            </IconContext.Provider>
                        </div>
                    </li>
                    <City data={citySelected} />
                    <Details />
                    <div className='chartPanel'>
                        <Chart city={citySelected} />
                    </div>
                </ul>
            </nav>
        </>
    );
}

export default Sidebar;