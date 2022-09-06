import "./View.scss";
import MythCardContainer from "../../containers/MythCardContainer/MythCardContainer";
import Button from "../../components/Button/Button";
import { useEffect, useState } from "react";
import myths from "../../data/mockMyth";
import TextInput from "../../components/TextInput/TextInput";

const View = () => {
    const [filteredMyths, setFilteredMyths] = useState([]);

    const getMyths = async(event) => {
        const response = await fetch("http://localhost:8080/myths");
        let mythsToRender = await response.json();

        mythsToRender = handleSearchChange(event, mythsToRender);

        setFilteredMyths(mythsToRender);
    }

    const handleSearchChange = (event, myths) => {
        const newMyths = myths.filter((myth) => {
            switch(event.target.name){
                case "nameSearch":
                    return (myth.englishName.toLowerCase().startsWith(event.target.value.toLowerCase()) 
                            || myth.greekName.toLowerCase().startsWith(event.target.value.toLowerCase()))

                case "domainSearch":
                    let hasDomain = false;
                    for (let i=0; i<myth.majorDomains.length; i++){
                        if (myth.majorDomains[i].toLowerCase().startsWith(event.target.value.toLowerCase())){
                            hasDomain = true;
                        }
                    }
                    return hasDomain;

                case "identifierSearch":
                    let hasIdentifier = false;
                    for (let i=0; i<myth.identifiers.length; i++){
                        if (myth.identifiers[i].toLowerCase().startsWith(event.target.value.toLowerCase())){
                            hasIdentifier = true;
                        }
                    }
                    return hasIdentifier;

                default:
                    return myth.id;
            }
        })
        return newMyths;
    }

    // useEffect(() => {
    //     getMyths();
    // }, [])

    return (
        <div className="view">
            <h1>View</h1>
            <h3>Use this page to find the gods you want to know about.</h3>
            <div className="view__filters">
                <Button className={"view__button"} onClick={getMyths} text={"View All"} />
                <br />
                {/* ALL UPDATE ON CHANGE */}
                {/* searchbar for english name & greek */}
                <label htmlFor="search">Search...</label>
                <div className="view__inputs">
                    <TextInput name="nameSearch" className="view__filters--names" placeholder="By name..." onChange={getMyths} />
                    {/* searchbar for domains */}
                    <TextInput name="domainSearch" className="view__filters--domains" placeholder="By domain..." onChange={getMyths} />
                    {/* searchbar for identifier */}
                    <TextInput name="identifierSearch" className="view__filters--identifier" placeholder="By identifier..." onChange={getMyths} />
                </div>
            </div>
            <MythCardContainer mythsToShow={filteredMyths} />
        </div>

    )
}

export default View;