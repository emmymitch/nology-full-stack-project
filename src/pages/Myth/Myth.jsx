import "./Myth.scss";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const Myth = () => {
    const { mythId } = useParams();
    const [isLoaded, setIsLoaded] = useState(false);
    const [myth, setMyth] = useState({});
    const [arrStrings, setArrStrings] = useState({});

    const getMyth = async(mythId) => {
        const response = await fetch(`http://localhost:8080/myth/${mythId}`);
        const mythToLoad = await response.json();

        const domains = mythToLoad.majorDomains.map((domain, index) => {
            if (mythToLoad.majorDomains.length === 1){
                return `${domain}`;
            } else if (index !== mythToLoad.majorDomains.length - 1){
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
        getMyth(mythId);
    }, [mythId]);

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
                <div className="myth__heading">
                    <h1 className="myth__heading--name">{myth.englishName}</h1>
                    <h1>{myth.greekName}</h1>
                    <h2 className="myth__heading--godof">GOD OF</h2>
                    <h2>{arrStrings.domains}</h2>
                </div>

                <div className="myth__description">
                    <p>{myth.description}</p>
                </div>

                <div className="myth__identifiers">
                    <h3 className="myth__title">Sacred symbols and common identifiers</h3>
                    <p>{arrStrings.identifiers}</p>
                </div>
            </div>
        )
    }
}

export default Myth;