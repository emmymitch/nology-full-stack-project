import "./Delete.scss";

import MythCard from "../../components/MythCard/MythCard";
import Button from "../../components/Button/Button";
import TextInput from "../../components/TextInput/TextInput";
import { useState } from "react";

const Delete = () => {
    const [chosenMyth, setChosenMyth] = useState([]);
    const [notFound, setNotFound] = useState(false);
    const [readyToDelete, setReadyToDelete] = useState(false);
    const [deleted, setDeleted] = useState(false);

    const handleDeleteSearch = async(event) => {
        setNotFound(false)
        event.preventDefault();
        console.log(event.target[0].value)
        const response = await fetch(`http://localhost:8080/myth/${event.target[0].value}`);

        if (response.ok){
            const mythToCheck = await response.json();
            setChosenMyth(mythToCheck);
            setReadyToDelete(true);
            
        } else {
            setNotFound(true);
        }
    }

    const deleteEntry = async() => {
        await fetch(`http://localhost:8080/myth/${chosenMyth.id}`, {
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
                        <label htmlFor="deleteSearch">Delete...</label>
                        <TextInput name={"deleteSearch"} placeholder={"ID..."} />
                        <Button type={"submit"} text={"Submit"} disabled={readyToDelete} />
                    </div>

                    {notFound && 
                        <p className="delete__not-found">No matching entry!</p>
                    }

                    {readyToDelete && 
                        <div className="delete__changeable">
                            <div className="delete__changeable--text">
                                <p className="delete__confirm">Is this who you're trying to delete?</p>
                                <br />
                                <p className="delete__confirm">If not, click No and search again</p>
                                <Button onClick={deleteEntry} text={"Yes"} />
                                <Button onClick={() => {setReadyToDelete(false)}} text={"No"} />
                                <br />
                            </div>

                            <div className="delete__changeable--myth-card">
                               <MythCard myth={chosenMyth} /> 
                            </div>
                            
                        </div>
                        }
                </form>
            }

            {deleted && 
                <p className="delete__success-message">Successfully deleted {chosenMyth.englishName}.</p>
            }

        </div>

    )
}

export default Delete;