import {useState, useEffect,useRef} from 'react'



export function App() {
  const userInput = useRef<HTMLInputElement>(null);
  const [word, setWord] = useState("");
  const [meaningsList, setMeaningsList] = useState([]);

  useEffect(()=>{
    console.log(meaningsList);
  },[meaningsList])

  useEffect(()=>{
    console.log(word);
  },[word])

  const generateWord = (word: string) : void => {
    fetchApi(word);
  }

  async function fetchApi(word: string): Promise<void> {
    try {
      const response = await fetch(`https://www.dictionaryapi.com/api/v3/references/collegiate/json/${word}?key=b77546c7-26ca-47b0-babf-0ed812f5a88e`);
      const data = await response.json();
      console.log(data);
      setWord(word.toLowerCase());
      let newMeaningsList = data.map((obj: { shortdef: string[]; })=>obj.shortdef[0]);
      setMeaningsList(newMeaningsList);
      //setMeaningsList(data[0].meanings);
    } catch(error) {console.log(error);}
  }

  return (
    <>
     <h1>Dictionary</h1>
     <div className="search-bar">
     <input type="text" ref={userInput} /> <button onClick={() => {if (userInput.current) {generateWord(userInput.current.value)}}}>Search</button>
     </div>
    <br />
    <div className="definitions-container">
      <h2>Definitions</h2>
      <p>{word}</p>
    </div>
    </>
  )
}

export default App
