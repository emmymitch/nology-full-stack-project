import "./Update.scss";
import TextInput from "../../components/TextInput/TextInput";
import Button from "../../components/Button/Button";
import { useState } from "react";


const Update = () => {
    const [formSubmitted, setFormSubmitted] = useState(false);

    const submitEntry = async(event) => {
        try {
            event.preventDefault();

            //Prevent empty elements in array
            const domains = [];
            const identifiers = [];

            for (let i=3; i<8; i++){
                if (event.target[i].value !== ""){ domains.push(event.target[i].value) }
            }

            for (let i=8; i<13; i++){
                if (event.target[i].value !== ""){ identifiers.push(event.target[i].value) }
            }

            //Post data to backend
            await fetch(`http://localhost:8080/myth`, {
                method: "POST",
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                },
                body: JSON.stringify({
                    createdBy: `${event.target[0].value}`,
                    englishName: `${event.target[1].value}`,
                    greekName: `${event.target[2].value}`,
                    majorDomains: domains,
                    identifiers: identifiers,
                    description: `${event.target[13].value}`
                })
            })

            setFormSubmitted(true)

        } catch (error) {
            console.log(error)
        }
    }

    const handleReset = () => {
        setFormSubmitted(false);
    }

    const submitMessage = <h4 className="update__subheading">Entry updated!</h4>
    const pageJSX = 
        <div className="update__form--style-div" >
            <label className="update__form--label" htmlFor="createdBy">Author:</label>
            <TextInput name={"createdBy"} placeholder={"Who's authoring this entry?"} />
            <br></br>

            <label className="update__form--label" htmlFor="englishName">English Name:</label>
            <TextInput name={"englishName"} />
            <br></br>

            <label className="update__form--label" htmlFor="greekName">Greek Name:</label>
            <TextInput name={"greekName"} placeholder={"Use Greek characters only"} />
            <br></br>

            <label className="update__form--label" htmlFor="majorDomains">Major Domains:</label>
            <div className="update__form--domain-list">
                <TextInput name={"majorDomains"} />
                <TextInput name={"majorDomains"} />
                <TextInput name={"majorDomains"} />
                <TextInput name={"majorDomains"} />
                {/* Remember to change the sneaky 'check form status' function!! */}
                <TextInput name={"majorDomains"} />
            </div>
            <br></br>

            <label className="update__form--label" htmlFor="identifiers">Identifiers:</label>
            <div className="update__form--identifier-list">
                <TextInput name={"identifiers"} placeholder={"e.g. lightning bolts and eagles for Zeus"} />
                <TextInput name={"identifiers"} placeholder={"e.g. owls, olives, Aegis for Athena"} />
                <TextInput name={"identifiers"} placeholder={"e.g. lyre, bow, laurel for Apollo"} />
                <TextInput name={"identifiers"} placeholder={"e.g. a caduceus and winged sandals for Hermes"} />
                <TextInput name={"identifiers"} placeholder={"e.g. doves and roses for Aphrodite"} />
            </div>
            <br></br>

            <label className="update__form--label" htmlFor="description">Description:</label>
            <textarea 
                className="update__form--description" 
                name="description" 
                placeholder="A short description of the god. Exclude personal opinions."
            />
            <br></br>

            <Button type={"submit"} text={"Submit"} />
        </div>
    ;


    return (
        <div className="update">
            <h1 className="update__title">Add/Update a God</h1>
            <h3 className="update__subheading">Is some information wrong, or do you want to add a new entry? Use this form to do so!</h3>

            
            
            <form className="update__form" onSubmit={submitEntry} >
                <Button className={"button--reset"} type={"reset"} onClick={handleReset} text={"Reset"} />
                <br></br>
                {formSubmitted ? submitMessage : pageJSX}
            </form>
        </div>
    )
}

export default Update;