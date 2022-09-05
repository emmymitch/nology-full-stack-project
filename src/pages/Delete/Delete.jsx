import "./Delete.scss";

import MythCard from "../../components/MythCard/MythCard";
import Button from "../../components/Button/Button";
import TextInput from "../../components/TextInput/TextInput";
import { useState } from "react";

const Delete = () => {
    const [chosenMyth, setChosenMyth] = useState([]);
    const [readyToDelete, setReadyToDelete] = useState(false);
    const [deleted, setDeleted] = useState(false);

    const handleDeleteSearch = async(event) => {
        event.preventDefault();
        const searchTerm = event.target[0].value;
        const response = await fetch(`http://localhost:8080/myth?englishName=${searchTerm}`);
        const mythToCheck = await response.json();

        if (mythToCheck){
            setChosenMyth(mythToCheck[0]);
            setReadyToDelete(true);
        }
    }

    const deleteEntry = async() => {
        const response = await fetch(`http://localhost:8080/myth/${chosenMyth.id}`, {
            method: "DELETE"
        });
        setReadyToDelete(false);
        setDeleted(true);
    }

    return (
        <div className="delete">
            <h1>Delete</h1>
            <h3>Has something gone too horribly wrong to fix? Delete it from this page.</h3>

            {!deleted && 
                <form onSubmit={readyToDelete? deleteEntry : handleDeleteSearch}>
                    <div className="delete__check">
                        <label htmlFor="deleteSearch" placeholder="Search by English name...">Delete...</label>
                        <TextInput name={"deleteSearch"} />
                        <Button type={"submit"} text={"Submit"} disabled={readyToDelete} />
                    </div>
                    
                    {readyToDelete && 
                        <>
                            <p className="delete__confirm">Is this who you're trying to delete?</p>
                            <br />
                            <Button onClick={deleteEntry} text={"Yes"} />
                            <Button onClick={() => {setReadyToDelete(false)}} text={"No"} />
                            <br />
                            <p className="delete__confirm">If not, search again</p>
                            <MythCard myth={chosenMyth} />
                        </>
                        }
                </form>
            }

            {deleted && 
                <p className="delete__success-message">Successfully deleted {filteredMyths.englishName}</p>
            }

        </div>

    )
}

export default Delete;