import "./Myth.scss";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const Myth = () => {
    const { mythId } = useParams();
    const [isLoaded, setIsLoaded] = useState(false);
    const [myth, setMyth] = useState({});
    const [arrStrings, setArrStrings] = useState({});

    const getMyth = async() => {
        const response = await fetch(`http://localhost:8080/myth/${mythId}`);
        const mythToLoad = await response.json();

        const domains = mythToLoad.majorDomains.map((domain, index) => {
            if (index !== mythToLoad.majorDomains.length - 1){
                return ` ${domain} ·`;
            } else {
                return ` ${domain}`;
            }
        })

        const identifiers = mythToLoad.identifiers.map((identifier, index) => {
            if (index !== mythToLoad.identifiers.length - 1){
                return ` ${identifier} ·`;
            } else {
                return ` ${identifier}`;
            }
        })

        setMyth(mythToLoad);
        setArrStrings({domains: domains, identifiers: identifiers});
        setIsLoaded(true);
    }
    
    useEffect(() => {
        getMyth();
    // eslint-disable-next-line
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
                    <h2>GOD OF</h2>
                    <h2>{arrStrings.domains}</h2>
                </div>

                <p>{myth.description}</p>

                <h4>Sacred symbols and common identifiers</h4>
                <p>{arrStrings.identifiers}</p>
            </div>
        )
    }
}

export default Myth;