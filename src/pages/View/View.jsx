import "./View.scss";
import MythCardContainer from "../../containers/MythCardContainer/MythCardContainer";
import myths from "../../data/mockMyth";

const View = () => {
    return (
        <div className="view">
            <h1>View</h1>
            <MythCardContainer mythsToShow={myths} />
        </div>

    )
}

export default View;