interface propTypes {
    synonyms: string[],
    wordType: string
}


function Synonym({synonyms, wordType} : propTypes) {
    const type : string = `[${wordType}]`;
    function getSynonyms(synArray: string[]) : string {
        let synList = "";
        for (let i = 0; i < synArray.length; i++) {
            synList += synArray[i] + " ";
        }
        return synList;
    }
    
    const displayString : string= `${type} ${getSynonyms(synonyms)}`;
return(
    <div className="word-container">{displayString}</div>
)
}

export default Synonym