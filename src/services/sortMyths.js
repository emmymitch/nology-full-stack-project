  //Sort function
  const sortMyths = (mythArray, sortTerm) => {
    let sortedMyths = [...mythArray];

    if (sortTerm === "englishName" || sortTerm === "greekName"){
      sortedMyths = sortedMyths.sort((a, b) => {
        const name1 = a[sortTerm].toLowerCase();
        const name2 = b[sortTerm].toLowerCase();
        if (name1 < name2){
          return -1;
        } else if (name1 > name2){
          return 1;
        } else{
          return 0;
        };
      })
      
    } else if (sortTerm === "id"){
      sortedMyths = sortedMyths.sort((a, b) => a - b);
          
    } 
    
    return sortedMyths;
  }
  
export default sortMyths;