import "./View.scss";
import MythCardContainer from "../../containers/MythCardContainer/MythCardContainer";
import Button from "../../components/Button/Button";
import { useState } from "react";
import myths from "../../data/mockMyth";

const View = () => {
    const [filteredMyths, setFilteredMyths] = useState([]);

    const getMyths = async() => {
        const response = await fetch("http://localhost:8080/myths");
        let mythsToRender = await response.json();

        setFilteredMyths(mythsToRender);
    }

    return (
        <div className="view">
            <h1>View</h1>
            <h3>Use this page to find the gods you want to know about.</h3>
            <div className="view__filters">
                <Button className={"view__button"} onClick={getMyths} text={"View All"} />
            </div>
            <MythCardContainer mythsToShow={filteredMyths} />
        </div>

    )
}

export default View;