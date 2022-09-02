import "./Nav.scss";

import {Link} from "react-router-dom";

const Nav = () => {
    return (
        <div className="navbar">
            <Link to="/home" className="navbar__link">Home</Link>
            <Link to="/view" className="navbar__link">View</Link>
            <Link to="/update" className="navbar__link">Update</Link>
            <Link to="/delete" className="navbar__link">Delete</Link>
        </div>
    )
}

export default Nav;