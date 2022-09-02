import "./Home.scss";
import {Link} from "react-router-dom";
import { useMediaQuery } from "react-responsive";

const Home = () => {
    const isMobile = useMediaQuery({ query: `(min-width: 1024px` });

    return (
        <div className="home">
            <p>There are far too many people to keep track of in Greek mythology! This site was made
                as a full-stack personal project, for personal reference so I can keep everyone straight.
                Or not straight, given Greek myth.
            </p>

            <p className="home__divider">{`Use the navbar ${isMobile ? "on the left" : "above"} to navigate the site.`}</p>
            
            <Link to="/view" className="home__link">View</Link>
            <p className="home__explanation">Show all characters or search and filter for who you want.</p>
            
            <Link to="/update" className="home__link">Update</Link>
            <p className="home__explanation">Update the database by adding a new entry or editing an existing one</p>
            
            <Link to="/delete" className="home__link">Delete</Link>
            <p className="home__explanation">Something wrong? Delete an entry from the database</p>
        </div>
    )
}

export default Home;