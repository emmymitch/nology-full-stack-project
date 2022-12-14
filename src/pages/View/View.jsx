import "./View.scss";
import MythCardContainer from "../../containers/MythCardContainer/MythCardContainer";
import { useEffect, useState } from "react";
import TextInput from "../../components/TextInput/TextInput";
import sortMyths from "../../services/sortMyths.js";
import searchMyths from "../../services/searchMyths";

const View = () => {
    const [filteredMyths, setFilteredMyths] = useState([]);
    const [searchBy, setSearchBy] = useState({category: "", value: ""})
    const [sort, setSort] = useState({category: "id", direction: "AZ"})

    const getMyths = async() => {
        const response = await fetch("http://localhost:8080/myths");
        return await response.json();
    }

    useEffect(() => {
        let mythsToRender = getMyths();

        mythsToRender = searchMyths(mythsToRender, searchBy);
        mythsToRender = sortMyths(mythsToRender, sort.category);

        if (sort.direction === "ZA"){
            mythsToRender.reverse();
        }

        setFilteredMyths(mythsToRender);

    }, [searchBy, sort.category, sort.direction])

    const handleSearchChange = (event) => {setSearchBy({category: event.target.name, value: event.target.value})}
    const handleSortChange = (event) => {setSort({...sort, category: event.target.value})};
    const handleSortDirectionChange = (event) => {setSort({...sort, direction: event.target.value})};

    return (
        <div className="view">
            <h1>View</h1>
            <h3>Use this page to find the gods you want to know about.</h3>

            <div className="view__filters">
                <div className="view__sort">
                    <label htmlFor="sortMyths">Sort by: </label>
                    <div className="view__sort--inputs">
                        <select className="view__sort--dropdown" name="sortMyths" onChange={handleSortChange} >
                            <option className="view__sort--option" value="id">ID</option>
                            <option className="view__sort--option" value="englishName">English Name</option>
                            <option className="view__sort--option" value="greekName">Greek Name</option>
                        </select>
                        <select className="view__sort--dropdown" name="sortMyths" onChange={handleSortDirectionChange} >
                            <option className="view__sort--option" value="AZ">A-Z</option>
                            <option className="view__sort--option" value="ZA">Z-A</option>
                        </select>
                    </div>
                </div>

                <div className="view__search">
                    <label htmlFor="search">Search...</label>
                    <div className="view__search--inputs">
                        <input type="number" name="idSearch" className="view__search--ids" placeholder="By id..." onChange={handleSearchChange} />
                        <TextInput name="nameSearch" className="view__search--names" placeholder="By name..." onChange={handleSearchChange} />
                        <TextInput name="domainSearch" className="view__search--domains" placeholder="By domain..." onChange={handleSearchChange} />
                        <TextInput name="identifierSearch" className="view__search--identifier" placeholder="By identifier..." onChange={handleSearchChange} />
                    </div>
                </div>
            </div>
            
            <MythCardContainer mythsToShow={filteredMyths} />
        </div>

    )
}

export default View;