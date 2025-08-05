import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBoxesStacked ,faTag,faClipboardList, faUser } from "@fortawesome/free-solid-svg-icons";
import '../css-styling/SideNavBar.css';
import { useNavigate } from 'react-router-dom';

function SideNavBar(){

    const navigate = useNavigate();
    return(

        <div className="side-nav-bar">
            <div className="side-bar-tags" onClick={()=>navigate('products')}>
                <FontAwesomeIcon className="side-bar-icon" icon={faTag} />
                <h2 className="logos-name">Products</h2>
            </div>
            <div className="side-bar-tags" onClick={()=>navigate('orders')}>
                <FontAwesomeIcon className="side-bar-icon" icon={faClipboardList} />
                <h2 className="logos-name">Orders</h2>
            </div>
            <div className="side-bar-tags" onClick={()=>navigate('inventory')}>
                <FontAwesomeIcon className="side-bar-icon" icon={faBoxesStacked} />
                <h2 className="logos-name">Inventory</h2>
            </div>
            <div className="side-bar-tags" onClick={()=>navigate('users')}>
                <FontAwesomeIcon className="side-bar-icon" icon={faUser} />
                <h2 className="logos-name">Users</h2>
            </div>
        </div>
    )
}

export default SideNavBar;