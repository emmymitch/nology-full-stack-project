import "./Home.scss";
import {Link} from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import { useEffect, useState } from "react";

const Home = () => {
    const isMobile = useMediaQuery({ query: `(min-width: 1024px` });
    const [randomMythId, setRandomMythId] = useState("");

    const getRandomMyth = async() => {
        const response = await fetch(`http://localhost:8080/random`);
        const mythToLoad = await response.json();
        setRandomMythId(mythToLoad.id);
    }

    useEffect(() => {
        getRandomMyth();
    }, []);

    return (
        <div className="home">
            <p>There are far too many people to keep track of in Greek mythology! This site was made
                as a full-stack personal project, for personal reference so I can keep everyone straight.
                Or not straight, given Greek myth.
            </p>

            <p className="home__divider">{`Use the navbar ${isMobile ? "on the left" : "above"} to navigate the site.`}</p>
            
            <Link to="/view" className="home__link">View</Link>
            <p className="home__explanation">Show all characters or search and filter for who you want.</p>

            <Link to="/add" className="home__link">Add</Link>
            <p className="home__explanation">Add a new entry to the database.</p>
            
            <Link to="/update" className="home__link">Update</Link>
            <p className="home__explanation">Edit an existing entity.</p>
            
            <Link to="/delete" className="home__link">Delete</Link>
            <p className="home__explanation">Something wrong? Delete an entry from the database.</p>

            <Link to={`/myth/${randomMythId}`} className="home__link">Random</Link>
            <p className="home__explanation">Don't know who you're looking for? Pick someone random!</p>
        </div>
    )
}

export default Home;