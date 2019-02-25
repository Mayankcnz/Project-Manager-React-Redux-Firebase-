import React from 'react';
import './Sidebar.css';

const Sidebar = props =>{

    let sideBarClasses = 'side-bar';
    if(props.show){
        sideBarClasses = 'side-bar open';
    }

return (
<nav>
    <ul className={sideBarClasses}>
        <li><a href ="/"> Products</a></li>
        <li><a href ="/"> Users</a></li>
    </ul>
</nav>

);
};
export default Sidebar;