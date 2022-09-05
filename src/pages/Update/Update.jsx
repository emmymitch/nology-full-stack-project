import "./Update.scss";
import TextInput from "../../components/TextInput/TextInput";
import Button from "../../components/Button/Button";
import { useState } from "react";


const Update = () => {
    const initialData = {
        createdBy: "",
        englishName: "",
        greekName: "",
        majorDomains: [],
        identifiers: [],
        description: ""
    }

    const [formSubmitted, setFormSubmitted] = useState(false);
    const [formData, setFormData] = useState(initialData);

    const handleChange = (event) => {
        switch(event.target.name){
            case "createdBy":
                setFormData({...formData, createdBy: event.target.value});
                break;
            case "englishName": 
                setFormData({...formData, englishName: event.target.value});
                break;
            case "greekName": 
                setFormData({...formData, greekName: event.target.value});
                break;
            case "description": 
                setFormData({...formData, description: event.target.value});
                break;
            case "majorDomains":
                setFormData({...formData, majorDomains: [...formData.majorDomains, event.target.value]});
                break;
            case "identifiers":
                setFormData({...formData, identifiers: [...formData.identifiers, event.target.value]});
                break;
            default:
                break;
        }
    }

    const handleMultiInputChange = (event) => {
        console.log(formData);
    }

    //what the fuck does submitting a form do??? where does the data go??????????
    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(event.target[0])
        setFormSubmitted(true);
        setFormData({...initialData});
    }

    const handleReset = () => {
        setFormData({...initialData});
        setFormSubmitted(false);
    }

    const submitMessage = <h4 className="update__subheading">Entry updated!</h4>
    const pageJSX = 
        <form className="update__form" onSubmit={handleSubmit} >
            <label className="update__form--label" htmlFor="createdBy">Author:</label>
            <TextInput name={"createdBy"} onBlur={handleChange} placeholder={"Who's authoring this entry?"} />
            <br></br>

            <label className="update__form--label" htmlFor="englishName">English Name:</label>
            <TextInput name={"englishName"} onBlur={handleChange} />
            <br></br>

            <label className="update__form--label" htmlFor="greekName">Greek Name:</label>
            <TextInput name={"greekName"} placeholder={"Use Greek characters only"} onBlur={handleChange} />
            <br></br>

            <label className="update__form--label" htmlFor="majorDomains">Major Domains:</label>
            <div className="update__form--domain-list">
                <TextInput name={"majorDomains"} onBlur={handleChange} />
                <TextInput name={"majorDomains"} onBlur={handleChange} />
                <TextInput name={"majorDomains"} onBlur={handleChange} />
                <TextInput name={"majorDomains"} onBlur={handleChange} />
                {/* Remember to change the sneaky 'check form status' function!! */}
                <TextInput name={"majorDomains"} onBlur={handleMultiInputChange} />
            </div>
            <br></br>

            <label className="update__form--label" htmlFor="identifiers">Identifiers:</label>
            <div className="update__form--identifier-list">
                <TextInput name={"identifiers"} placeholder={"e.g. lightning bolts and eagles for Zeus"} onBlur={handleChange} />
                <TextInput name={"identifiers"} placeholder={"e.g. owls, olives, Aegis for Athena"} onBlur={handleChange} />
                <TextInput name={"identifiers"} placeholder={"e.g. lyre, bow, laurel for Apollo"} onBlur={handleChange} />
                <TextInput name={"identifiers"} placeholder={"e.g. a caduceus and winged sandals for Hermes"} onBlur={handleChange} />
                <TextInput name={"identifiers"} placeholder={"e.g. doves and roses for Aphrodite"} onBlur={handleMultiInputChange} />
            </div>
            <br></br>

            <label className="update__form--label" htmlFor="description">Description:</label>
            <textarea 
                className="update__form--description" 
                name="description" 
                placeholder="A short description of the god. Exclude personal opinions."
                onBlur={handleChange}
            />
            <br></br>

            <Button type={"submit"} text={"Submit"} />
        </form>
    ;


    return (
        <div className="update">
            <h1 className="update__title">Add/Update a God</h1>
            <h3 className="update__subheading">Is some information wrong, or do you want to add a new entry? Use this form to do so!</h3>
            <Button className={"button--reset"} type={"reset"} onClick={handleReset} text={"Reset"} />
            <br></br>
            {formSubmitted ? submitMessage : pageJSX}
        </div>
    )
}

export default Update;