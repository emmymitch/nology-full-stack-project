import "./MythCardContainer.scss";
import MythCard from "../../components/MythCard/MythCard";
import myth from "../../data/mockMyth";

const MythCardContainer = ({mythCards = null}) => {
    return (
        <div className="myth-cards">
            <MythCard myth={myth} />
        </div>

    )
}

export default MythCardContainer;