import "./MythCardContainer.scss";
import MythCard from "../../components/MythCard/MythCard";

const MythCardContainer = ({mythsToShow}) => {

    const mythCards = mythsToShow.map((myth) => {
        return <MythCard key={myth.id} myth={myth} />
    })

    return (
        <div className="myth-cards">
            {mythCards}
        </div>

    )
}

export default MythCardContainer;