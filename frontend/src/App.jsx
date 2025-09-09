import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios';

function App() {
  const [ sayName, setSayName ] = useState("");
  const [ callName, setCallName ] = useState("");

  const fetch = async (name) => {
    const response = await axios.get(`http://localhost:3000/api/hello?name=${name}`);
    setCallName(response.data);
    console.log("TEST: ", response);
  }

  useEffect(() => {
    fetch(sayName);
  }, [sayName]);

  return (
    <div>
     {callName && (
      <div>{callName}</div>
     )}

     <input type="text" onChange={(e) => setSayName(e.target.value)} name='name' id="name" value={sayName} />
    </div>
  )
}

export default App
