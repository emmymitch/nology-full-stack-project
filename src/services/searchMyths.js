//Search function
const searchMyths = (myths, search) => {
    const newMyths = myths.filter((myth) => {
        switch(search.category){
            case "idSearch":
                return (myth.id === Number(search.value));

            case "nameSearch":
                return (myth.englishName.toLowerCase().startsWith(search.value.toLowerCase()) 
                        || myth.greekName.toLowerCase().startsWith(search.value.toLowerCase()))

            case "domainSearch":
                let hasDomain = false;
                for (let i=0; i<myth.majorDomains.length; i++){
                    if (myth.majorDomains[i].toLowerCase().startsWith(search.value.toLowerCase())){
                        hasDomain = true;
                    }
                }
                return hasDomain;

            case "identifierSearch":
                let hasIdentifier = false;
                for (let i=0; i<myth.identifiers.length; i++){
                    if (myth.identifiers[i].toLowerCase().startsWith(search.value.toLowerCase())){
                        hasIdentifier = true;
                    }
                }
                return hasIdentifier;

            default:
                return myth;
        }
    })
    return newMyths;
}

export default searchMyths;