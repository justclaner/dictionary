interface propTypes {
    definition: string,
    wordType: string
    index: number
    subIndex: number
}


function Definition({definition,wordType, index, subIndex} : propTypes) {
    const label : string = `${index+1}${String.fromCharCode(97+subIndex)}. `;
    const type : string = `[${wordType}]`;
    const displayString : string= ` ${definition}`;
return(
    <div className="word-container"><strong>{label}</strong><u>{type}</u>{displayString}</div>
)
}

export default Definition