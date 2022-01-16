import { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {

  //states
  const [data, setData] = useState(null);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [message, setMessage] = useState('');

  const handleClick = (indicator) => {

    if(indicator === 'getData'){

      axios.get(`http://localhost:8000/`)
      .then((res) => {
        setData(res.data);
      })

    }else if(indicator === 'deleteAll'){

      axios.get(`http://localhost:8000/deleteall`)
      .then((res) => {
        
        setData(res.data);
      })

    }

  } 


  const handleSubmit = (e) =>{
    e.preventDefault()
    
    const formData = new FormData();
    formData.append("file", uploadedFile);

    if(uploadedFile){

      axios.post(`http://localhost:8000/`, formData)
      .then((res) => {
        if(res.data == 'ok'){
  
          setMessage('Tietojen lähetys onnistui!')
  
        }
      })

    }else{

      setMessage("Can't send a file, if nothing is selected, dummy!")

    }



  }

  return (
    <div className="App">
      <div className="flex h-screen">
        <div className="m-auto text-center">
            <h1 className="font-heading text-5xl mb-20">Farmdata</h1>
            <div>{data? JSON.stringify(data) : ''}</div>
            <form onSubmit={handleSubmit}>
              
              <input 
                type="file" 
                name="file" 
                onChange={(e) => setUploadedFile(e.target.files[0])}
                accept=".csv"/>

              <input type="submit" className="bg-white text-black border border-black px-3 h-12 m-3 font-body text-center text-2xl cursor-pointer focus:px-2 focus:h-11 transition duration-200 hover:bg-black hover:text-white hover:scale-105" value="Insert new data"/>

            </form>
            <button  onClick={()=>handleClick('getData')} className="bg-black text-white px-3 h-12 m-3 font-body text-center text-2xl transition duration-200 hover:bg-white hover:text-black border border-black hover:scale-105">Get farm data
            </button>

            <p>{message}</p>
        </div>
        <button  onClick={()=>handleClick('deleteAll')} className="bg-red-600 text-white px-3 h-12 m-3 font-body text-center text-2xl transition duration-200 hover:scale-110">Delete All Data
        </button>
      </div>
    </div>
  );
}

export default App;
