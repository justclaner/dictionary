import {useState, useEffect,useRef} from 'react'
import Definition from './components/Definition.tsx'


export function App() {
  const userInput = useRef<HTMLInputElement>(null);
  const [word, setWord] = useState("");
  const [meaningsList, setMeaningsList] = useState<any[]>([]);
  const [meaningsDisplayList, setMeaningsDisplayList] = useState<any[]>([]);
  useEffect(()=>{
    setMeaningsDisplayList([...meaningsList.map((obj,i)=>
   {return(obj.shortdef.map((def:string,j:number)=><Definition wordType={obj.fl} definition={def} key={i} index={i} subIndex={j}></Definition>))}
    )]);
  },[meaningsList])

  const generateWord = (word: string) : void => {
    fetchApi(word);
  }

  async function fetchApi(word: string): Promise<void> {
    try {
      const response = await fetch(`https://www.dictionaryapi.com/api/v3/references/collegiate/json/${word}?key=b77546c7-26ca-47b0-babf-0ed812f5a88e`);
      console.log(response);
      const data = await response.json();
      if(typeof data[0] == "object") {setMeaningsList(data);} else {return;}
      setWord(word.toLowerCase());
    } catch(error) {console.log(error);}
  }

  return (
    <>
     <h1>Dictionary</h1>
     <div className="search-bar">
     <input type="text" ref={userInput} placeholder='Type in a word' onKeyDown={(e)=>{
      console.log(e.target);
      if(e.key == 'Enter') {if (userInput.current) {fetchApi(userInput.current.value);}}
     }} /> <button onClick={() => {if (userInput.current) {generateWord(userInput.current.value)}}}>Search</button>
     </div>
    <br />
    <div className="definitions-container">
      <h1>{word}</h1>
      {meaningsDisplayList}
    </div>
    </>
  )
}

export default App
