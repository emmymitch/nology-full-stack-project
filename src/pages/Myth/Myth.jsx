import "./Myth.scss";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const Myth = () => {
    const { mythId } = useParams();
    const [isLoaded, setIsLoaded] = useState(false);
    const [myth, setMyth] = useState({});
    let domains; let identifiers;

    const getMyth = async() => {
        const response = await fetch(`http://localhost:8080/myth/${mythId}`);
        const mythToLoad = await response.json();

        domains = mythToLoad.majorDomains.map((domain, index) => {
            if (index !== mythToLoad.majorDomains.length - 1){
                return ` ${domain} ·`;
            } else {
                return ` ${domain}`;
            }
        })
    
        identifiers = mythToLoad.identifiers.map((identifier, index) => {
            if (index !== mythToLoad.identifiers.length - 1){
                return ` ${identifier} ·`;
            } else {
                return ` ${identifier}`;
            }
        })

        setMyth(mythToLoad);
        setIsLoaded(true);
    }
    
    useEffect(() => {
        getMyth();
    }, []);

    if (!isLoaded){
        return (
            <div className="myth">
                <h3>Loading...</h3>
            </div>
        )
    }

    if (isLoaded){
        return (
            <div className="myth">
                <div className="myth__title">
                    <h1>{myth.englishName}</h1>
                    <h3>GOD OF</h3>
                    <h3>{domains}</h3>
                </div>

                <p>{myth.description}</p>

                <h4>Sacred symbols and common identifiers</h4>
                <p>{identifiers}</p>
            </div>
        )
    }
}

export default Myth;