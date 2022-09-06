import "./MythCard.scss";

const MythCard = ({myth}) => {

    const splitGreek = myth.greekName.split("");
    const splitGreekCode = splitGreek.map((letter) => {
        return <h2 className="myth-card__side--greek-char">{letter.toUpperCase()}</h2>
    })

    const domainList = myth.majorDomains.map((domain, index) => {
        if (index !== myth.majorDomains.length - 1){
            return `${domain}, `;
        } else {
            return `and ${domain}.`;
        }
    })

    const identifierList = myth.identifiers.map((identifier) => {
        return <li key={identifier}>{identifier}</li>;
    })


    return (
        <div className="myth-card">
            <div className="myth-card__side">
                {splitGreekCode}
            </div>

            <div className="myth-card__main">
                <h2 className="myth-card__main--english">{myth.englishName}</h2>
                <h4 className="myth-card__main--domains">God of {domainList}</h4>
                <br />
                <p className="myth-card__main--description">{myth.description}</p>
                <br />
                <div className="myth-card__main--identifiers">
                    <p>Identify by:</p>
                    <ul>
                        {identifierList}
                    </ul>
                </div>
                <br />
                <p>Unique ID: {myth.id}</p>
            
            </div>
        </div>
    )
}

export default MythCard;