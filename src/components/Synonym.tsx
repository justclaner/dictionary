interface propTypes {
    synonyms: string[],
    wordType: string
}


function Synonym({synonyms, wordType} : propTypes) {
    const type : string = `[${wordType}]`;
    function getSynonyms(synArray: string[]) : string {
        let synList = "";
        for (let i = 0; i < synArray.length; i++) {
            if (i < synArray.length -1) {
            synList += synArray[i] + ", ";
            } else {synList += synArray[i];}
        }
        return synList;
    }
    
    const displayString : string= `${type} ${getSynonyms(synonyms)}`;
return(
    <div className="word-container">{displayString}</div>
)
}

export default Synonym