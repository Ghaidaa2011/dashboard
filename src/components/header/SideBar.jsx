import  {NavLink} from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers, faUserPlus,faPlus } from '@fortawesome/free-solid-svg-icons';
import { faProductHunt } from '@fortawesome/free-brands-svg-icons';

export default function SideBar () {
    return (
        <div className="side-bar"> 
            <NavLink to="/dashboard/users" className="item-link">
            <FontAwesomeIcon icon={faUsers} style={{color:"#1E3050", marginRight:"10px"}}/>users
            </NavLink>
            <NavLink to="/dashboard/user/create" className="item-link">
            <FontAwesomeIcon icon={faUserPlus} style={{color:"#1E3050", marginRight:"10px"}}/>new user
            </NavLink>
            <NavLink to="/dashboard/products" className="item-link">
            <FontAwesomeIcon icon={faProductHunt} style={{color:"#1E3050", marginRight:"10px"}}/>products
            </NavLink>
            <NavLink to="/dashboard/products/create" className="item-link">
            <FontAwesomeIcon icon={faPlus} style={{color:"#1E3050", marginRight:"10px"}}/>new product
            </NavLink>
        </div>
    );
}
