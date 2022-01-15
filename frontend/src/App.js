import { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {

  //states
  const [data, setData] = useState(null);

  const handleClick = () => {

      console.log('hello!')
      axios.get(`http://localhost:8000/`)
      .then((res) => {
        setData(res.data);
      })


  } 

  return (
    <div className="App">
      <div className="flex h-screen">
        <div className="m-auto text-center">
            <h1 className="font-heading text-5xl mb-20">Farmdata</h1>
            <div className=''>{data}</div>
            <button  onClick={()=>handleClick()} className="bg-black text-white px-3 h-12 m-3 font-body text-center text-2xl">Get farm data
            </button>
        </div>
      </div>
    </div>
  );
}

export default App;
