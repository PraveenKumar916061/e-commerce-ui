import SideNavBar from './SideNavBar';
import Header  from './Header';
import HomeContent from '../comps/HomeContent'
import { Outlet } from "react-router-dom";
import '../css-styling/Dashboard.css';

function Dashboard(){
    return(
        <div className="container">
            <div className="sidebar"><SideNavBar/></div>
            <div className="showContent">
                <div className="header"><Header/></div>
                <div className="home-content">
                    {/* <HomeContent/> &nbsp; */}
                    <Outlet />
                </div>
            </div>
        </div>
    )
}

export default Dashboard;