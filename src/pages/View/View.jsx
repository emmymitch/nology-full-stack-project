import "./View.scss";
import MythCardContainer from "../../containers/MythCardContainer/MythCardContainer";
import Button from "../../components/Button/Button";
import { useEffect, useState } from "react";
import TextInput from "../../components/TextInput/TextInput";
import sortMyths from "../../services/sortMyths.js";

const View = () => {
    const [filteredMyths, setFilteredMyths] = useState([]);
    const [searchBy, setSearchBy] = useState({})
    const [sort, setSort] = useState({category: "id", direction: "AZ"})

    const getMyths = async() => {
        const response = await fetch("http://localhost:8080/myths");
        let mythsToRender = await response.json();

        console.log(searchBy);
        mythsToRender = searchMyths(mythsToRender, searchBy);
        mythsToRender = sortMyths(mythsToRender, sort.category);

        if (sort.direction === "ZA"){
            mythsToRender.reverse();
        }

        setFilteredMyths(mythsToRender);
    }

    const searchMyths = (myths, search) => {
        const newMyths = myths.filter((myth) => {
            switch(search.category){
                case "idSearch":
                    return (myth.id === Number(search.value));

                case "nameSearch":
                    return (myth.englishName.toLowerCase().startsWith(search.value.toLowerCase()) 
                            || myth.greekName.toLowerCase().startsWith(search.value.toLowerCase()))

                case "domainSearch":
                    let hasDomain = false;
                    for (let i=0; i<myth.majorDomains.length; i++){
                        if (myth.majorDomains[i].toLowerCase().startsWith(search.value.toLowerCase())){
                            hasDomain = true;
                        }
                    }
                    return hasDomain;

                case "identifierSearch":
                    let hasIdentifier = false;
                    for (let i=0; i<myth.identifiers.length; i++){
                        if (myth.identifiers[i].toLowerCase().startsWith(search.value.toLowerCase())){
                            hasIdentifier = true;
                        }
                    }
                    return hasIdentifier;

                default:
                    return myth;
            }
        })
        return newMyths;
    }

    // const sortMyths = (event) => {
    //     switch (event.target.value) {
    //         case "id":
    //             setFilteredMyths([...filteredMyths.sort((a, b) => a - b)]);
    //             break;
    //         case "englishName": 
    //             setFilteredMyths([...filteredMyths.sort((a, b) => a.englishName - b.englishName)]); 
    //             break;
    //         case "greekName": 
    //             setFilteredMyths([...filteredMyths.sort((a, b) => a.greekName - b.greekName)]); 
    //             break;
    //         case "majorDomains": 
    //             setFilteredMyths([...filteredMyths.sort((a, b) => a.majorDomains[0] - b.majorDomains[0])]); 
    //             break;
    //         case "identifiers": 
    //             setFilteredMyths([...filteredMyths.sort((a, b) => a.identifiers[0] - b.identifiers[0])]); 
    //             break;
    //         case "description": 
    //             setFilteredMyths([...filteredMyths.sort((a, b) => a.description.charAt(0) - b.description.charAt(0))]); 
    //             break;
    //         default: break;
    //     }
    // }

    const handleSearchChange = (event) => {setSearchBy({category: event.target.name, value: event.target.value})}
    const handleSortChange = (event) => {setSort({...sort, category: event.target.value})};
    const handleSortDirectionChange = (event) => {setSort({...sort, direction: event.target.value})};

    useEffect(() => {
        getMyths();
    // eslint-disable-next-line
    }, [searchBy, sort.category, sort.direction])

    return (
        <div className="view">
            <h1>View</h1>
            <h3>Use this page to find the gods you want to know about.</h3>
            <div className="view__filters">
                <Button className={"view__button"} onClick={getMyths} text={"View All"} />
                <label htmlFor="sortMyths">Sort by: </label>
                <select className="view__sort--category" name="sortMyths" onChange={handleSortChange} >
                    <option value="id">ID</option>
                    <option value="englishName">English Name</option>
                    <option value="greekName">Greek Name</option>
                </select>
                <select className="view__sort--az" name="sortMyths" onChange={handleSortDirectionChange} >
                    <option value="AZ">A-Z</option>
                    <option value="ZA">Z-A</option>
                </select>
                <br />

                <label htmlFor="search">Search...</label>
                <div className="view__inputs">
                    <input type="number" name="idSearch" className="view__filters--ids" placeholder="By id..." onChange={handleSearchChange} />
                    <TextInput name="nameSearch" className="view__filters--names" placeholder="By name..." onChange={handleSearchChange} />
                    <TextInput name="domainSearch" className="view__filters--domains" placeholder="By domain..." onChange={handleSearchChange} />
                    <TextInput name="identifierSearch" className="view__filters--identifier" placeholder="By identifier..." onChange={handleSearchChange} />
                </div>
            </div>
            <MythCardContainer mythsToShow={filteredMyths} />
        </div>

    )
}

export default View;