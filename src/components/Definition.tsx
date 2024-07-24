interface propTypes {
    definition: string,
    wordType: string
}


function Definition({definition,wordType} : propTypes) {
    const displayString = `[${wordType}] ${definition}`;
return(
    <div className="word-container">{displayString}</div>
)
}

export default Definition