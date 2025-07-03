import '../css-styling/Header.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import Logout from './Logout';


function Header(){

    return(
        <div className="header-container" style={{position: 'relative'}}>
            <div>
                <h1 className="display-header">
                    Welcome to E-commerce
                    <img src="/shopping-cart.png" alt="Logo" className="logo" />
                </h1>
            </div>
            <div className="logout-container">
                <Logout/>
            </div>
        </div>
    )
}

export default Header;