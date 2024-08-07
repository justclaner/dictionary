import {useState, useEffect,useRef} from 'react'
import Definition from './components/Definition.tsx'
import Synonym from './components/Synonym.tsx'

export function App() {
  const userInput = useRef<HTMLInputElement>(null);
  const [word, setWord] = useState("");
  const [meaningsList, setMeaningsList] = useState<any[]>([]);
  const [meaningsDisplayList, setMeaningsDisplayList] = useState<any[]>([]);
  const [synonymsList, setSynonymsList] = useState<any[]>([]);
  const [synonymsDisplayList, setSynonymsDisplayList] = useState<any[]>([]);
  useEffect(()=>{
    setMeaningsDisplayList([...meaningsList.map((obj,i)=>
   {return(obj.shortdef.map((def:string,j:number)=><Definition wordType={obj.fl} definition={def} key={i+"0"+j} index={i} subIndex={j}></Definition>))}
    )]);
  },[meaningsList])

  useEffect(()=>{
    setSynonymsDisplayList([...synonymsList.map((list,i)=>
      {return(list.meta.syns.map((synonyms:string[],j:number) => <Synonym wordType={list.fl} synonyms={synonyms} key={i+"-"+j}/>))}
    )])
  },[synonymsList])

  async function fetchDef(word: string): Promise<void> {
    try {
      const response = await fetch(`https://www.dictionaryapi.com/api/v3/references/collegiate/json/${word}?key=b77546c7-26ca-47b0-babf-0ed812f5a88e`);
      const data = await response.json();
      //check if valid word
      if(typeof data[0] == "object") {setMeaningsList(data);} else {setMeaningsList([])}
      setWord(word.toLowerCase());
    } catch(error) {console.log(error);}
  }
  
  async function fetchSyn(word: string): Promise<void> {
    try {
      const response = await fetch(`https://www.dictionaryapi.com/api/v3/references/thesaurus/json/${word}?key=65a19eff-62b8-47db-b6eb-fb644ca75733`)
      const data = await response.json();
      if(typeof data[0] == "object") {setSynonymsList(data);} else {setSynonymsList([]);}
    } catch(error) {console.log(error);}
  }

  return (
    <>
     <h1>Dictionary</h1>
     <div className="search-bar">
     <input type="text" ref={userInput} 
     placeholder='Type in a word' 
     onChange={(e)=>{
      fetchDef(e.target.value);
      fetchSyn(e.target.value);
    }}
     /> <button onClick={() => {if (userInput.current) {
      fetchDef(userInput.current.value);
      fetchSyn(userInput.current.value);
      }}}>Search</button>
     </div>
    <br />
    <h1>{word}</h1>
    <div className="data">
    <div className="data-container">
      <h3>Definitions</h3>
      {meaningsDisplayList}
    </div>
    <div className="data-container">
      <h3>Synonyms</h3>
      {synonymsDisplayList}
    </div>
    </div>
   
    </>
  )
}

export default App
