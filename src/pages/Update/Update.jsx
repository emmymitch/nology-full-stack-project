import "./Update.scss";
import Button from "../../components/Button/Button";
import TextInput from "../../components/TextInput/TextInput";
import MythCard from "../../components/MythCard/MythCard";
import { useState } from "react";


const Update = () => {
    const [chosenMyth, setChosenMyth] = useState([]);
    const [dataToChange, setDataToChange] = useState({});
    const [notFound, setNotFound] = useState(false);
    const [readyToUpdate, setReadyToUpdate] = useState(false);
    const [updated, setUpdated] = useState(false);

    const handleUpdateSearch = async(event) => {
        setNotFound(false)
        event.preventDefault();
        const response = await fetch(`http://localhost:8080/myth/${event.target[0].value}`);

        if (response.ok){
            const mythToCheck = await response.json();
            setChosenMyth(mythToCheck);
            getNewData(mythToCheck, event.target[1].value, event.target[2].value);
            setReadyToUpdate(true);
            
        } else {
            setNotFound(true);
        }
    }

    const getNewData = (oldMyth, categoryToChange, newValue) => {
        const newData = {...oldMyth};

        switch (categoryToChange) {
            case "englishName": newData.englishName = newValue; break;
            case "greekName": newData.greekName = newValue; break;
            case "majorDomains": newData.majorDomains = newValue.split(","); break;
            case "identifiers": newData.identifiers = newValue.split(","); break;
            case "description": newData.description = newValue; break;
            default: break;
        };

        setDataToChange(newData);
    }

    const updateEntry = async(categoryToChange, newValue) => {
        const newData = {id: chosenMyth.id};
        switch (categoryToChange) {
            case "englishName": newData.englishName = newValue; break;
            case "greekName": newData.greekName = newValue; break;
            case "majorDomains": newData.majorDomains = newValue.split(","); break;
            case "identifiers": newData.identifiers = newValue.split(","); break;
            case "description": newData.description = newValue; break;
            default: break;
        }
        
        await fetch(`http://localhost:8080/myth/update`, {
            method: "POST",
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            },
            body: JSON.stringify({newData})
        });

        setReadyToUpdate(false);
        setUpdated(true);
    }

    return(
        <div className="update">
            <h1>Update</h1>
            <h3 className="update__subtitle">Seen something wrong? Correct it here!</h3>

            <br />
            <form className="update__form" onSubmit={readyToUpdate? updateEntry : handleUpdateSearch}>
                <div className="update__form--style-div">
                    <div className="update__form--input-div">
                        <label className="update__form--label" htmlFor="entry-id">Card ID:</label>
                        <TextInput name="entry-id" placeholder="Find the unique ID at the bottom of each card" />
                    </div>
                    <br />

                    <div className="update__form--input-div">
                        <label className="update__form--label" htmlFor="entry-categories">Category to change:</label>
                        <select className="update__form--dropdown" name="entry-categories">
                            <option value="englishName">English Name</option>
                            <option value="greekName">Greek Name</option>
                            <option value="majorDomains">Major Domains</option>
                            <option value="identifiers">Identifiers</option>
                            <option value="description">Description</option>
                        </select>
                    </div>

                    <div className="update__form--input-div">
                        <label className="update__form--label" htmlFor="entry-change">New data:</label>
                        <TextInput name="entry-change" />
                    </div>
                </div>
                <br />

                <p className="update__form--request">If changing domains or identifiers, please input as domain1,domain2,domain3</p>
                <Button type="submit" text="Submit" disabled={readyToUpdate} />

                {notFound && 
                    <p className="delete__not-found">No matching entry!</p>
                }

                {readyToUpdate && 
                    <div className="update__changeable">
                        <div className="update__changeable--text">
                            <p className="update__confirm">Is this what you're trying to change?</p>
                            <br />
                            <p className="update__confirm">If not, click No and search again</p>
                            <Button onClick={updateEntry} text={"Yes"} />
                            <Button onClick={() => {setReadyToUpdate(false)}} text={"No"} />
                            <br />
                        </div>

                        <div className="update__check">
                            <div className="update__check--desktop">
                                <MythCard myth={chosenMyth} />
                                <h1 className="update__check--arrow">--&gt;</h1> 
                            </div>
                            <MythCard myth={dataToChange} />
                        </div>
                        
                    </div>
                }
            </form>

        </div>
    )
}

export default Update;