import { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCog, faTimesCircle } from '@fortawesome/free-solid-svg-icons'
import Table from './Table';
import DataPanel from './DataPanel';

function App() {

  //states
  const [data, setData] = useState(null);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [farmLocation, setFarmLocation] = useState('all');
  const [sensorType, setSensorType] = useState('all');
  const [message, setMessage] = useState(false);
  const [fileSent, setFileSent] = useState(false);
  const [statusMessage, setStatusMessage] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);
  const [isEmptyData, setEmptyData] = useState(false);
  const [farmNames, setFarmNames] = useState(null);
  const [isLoading, setLoading] = useState(true)
  const [dataUpdated, setdataUpdated] = useState(0)

  //fetch all the location names in the database on page load

  useEffect(() => {
    
    axios.get(`http://localhost:8000/?` + new URLSearchParams({location: 'all', nameOnly: true}))
    
      .then((res) => {
        console.log(res)
        if(res.data){

          setFarmNames(res.data);
          setLoading(false);
  
        }else{

          setFarmNames([]);
          setLoading(false);

        }
      })
      .catch((error) => {
        console.log('error: ' + error);
        setLoading(false)
        setFarmNames([]);
        alert(`${error}. Make sure the backend is up. If persistent, contact developer.`)
      });

  }, [dataUpdated]);

  //init select options from database


    const selectOptions = farmNames? farmNames.data.map(

      (info)=>{
  
          return(
  
            <option value={info.location}>{info.location}</option>
  
          )
      }
  
  ) : '';
      

  //Handle click
  const handleClick = (indicator, e=null) => {

    if(e){
      e.preventDefault();
       
    }

    setLoading(true); 
    //Fetch by indicator
    if(indicator === 'getData'){
      console.log(sensorType)
      axios.get(`http://localhost:8000/?`+ new URLSearchParams({location: farmLocation, sensorType: sensorType, nameOnly: false}))
      .then((res) => {

        if(res.data){
          setData(res.data);
          setLoading(false);
          setEmptyData(false);
  
        }else{

          setData(res.data);
          setLoading(false);
          setEmptyData(true);
          

        }
      })
      .catch((error) => {
        console.log('error: ' + error);
        setLoading(false)
        alert(`${error}. Make sure the backend is up. If persistent, contact developer.`)
      });

    }else if(indicator === 'deleteAll'){

      axios.get(`http://localhost:8000/deleteall`)
      .then((res) => {
        
        setdataUpdated(dataUpdated+1)
        setData('')
        setStatusMessage(true);
        setLoading(false);
      })
      .catch((error) => {
        console.log('error: ' + error);
        setLoading(false)
        alert(`${error}. Make sure the backend is up. If persistent, contact developer.`)
      });

    }else if(indicator === 'resetData'){

      setData('')
      setLoading(false);
    }else{

      setLoading(false);
      alert('There was an error. Contact developer.')

    }

  } 

  //handle submit
  const handleSubmit = (e) =>{
    e.preventDefault()

    const formData = new FormData();
    formData.append("file", uploadedFile);

    if(uploadedFile){
      setLoading(true);
      axios.post(`http://localhost:8000/`, formData)
      .then((res) => {
        if(res.data){
          
          setdataUpdated(dataUpdated+1)
          setData(null);
          setMessage(false)
          setFileSent(true);
          setLoading(false);
        }
      })
      .catch((error) => {
        console.log('error: ' + error);
        setLoading(false)
        alert(`${error}. Make sure the backend is up. If persistent, contact developer.`)
      });

    }else{

      setMessage(true)

    }

  }

  // Open modal

  const openModal = (content) => {

    if(content === 'settings'){

      if(!isModalOpen){
        setModalOpen(true)
      }else{
        setModalOpen(false)
      }

    }

  }

  //Render
  return (
    <div className="App">
      {/*If is loading */}
      {isLoading? (

        <div className="absolute h-screen w-screen bg-white flex z-50">
          <div className="m-auto text-center flex flex-wrap justify-center">
            <h1 className="font-body text-5xl">Loading...</h1>
          </div>
        </div>

      ): (
        ''
      )}
      {/*If modal is open */}
      {isModalOpen? (

      <div className="absolute h-screen w-screen bg-white flex">

        <div className="m-auto text-center flex flex-wrap justify-center">
          <form className="flex flex-col content-center items-center w-96 py-36 px-10 border-2 border-black rounded-2xl m-5"onSubmit={handleSubmit}>
              <h1 className="font-heading text-2xl">Insert new data</h1>
              <div className="flex m-auto pt-10">
                <input 
                  
                  className="ml-9 font-body text-center"
                  type="file" 
                  name="file" 
                  onChange={(e) => setUploadedFile(e.target.files[0])}
                  accept=".csv"/>
              </div>
              <input 
  
              type="submit" 
              className="bg-white text-black border border-black px-3 my-16 h-12 font-body text-center text-2xl transition duration-200 hover:bg-black hover:text-white border border-black hover:scale-105" 
              value="Insert new data"/>

              {/*If you try to send an empty file, there is a message*/}
              {message? (

                <p className="font-body text-red-600 text-2xl">Can't send an empty file, dummy. Choose a csv-file to send.</p>

              ) : (

                <p className="font-body text-2xl">Choose a csv-file to send.</p>

              )}

              {/*Checks if file is sent */}
              {fileSent? (

              <p className="font-body text-green-600 text-2xl">File sent successfully!</p>

              ) : (

              ''

              )}

            </form>
            <div className="flex m-auto flex-col align-middle w-96 py-36 px-10 border-2 border-black rounded-2xl">
              <h1 className="font-heading text-2xl">Delete all data</h1>
              <button  onClick={()=>handleClick('deleteAll')} className="bg-red-600 text-white px-3 my-16 h-12 font-body text-center text-2xl transition duration-200 hover:bg-white hover:text-black border border-black hover:scale-105">Delete all data
              </button>

              {/*Checks if deletion is succesful*/}
              {statusMessage? (

                <p className="font-body text-2xl text-green-600">Deletion successful. Good luck.</p>

              ) : (

                <h2 className="font-body text-xl">Warning! This action deletes all data from database and is permanent.</h2>

              )}
            </div>

        </div>

      </div>

      ) : (

      ''

      )}
      {/*Main screen*/}
      <div className="flex h-screen">
        
        <FontAwesomeIcon className="text-5xl m-3 absolute" onClick={() => openModal('settings')} icon={isModalOpen? faTimesCircle : faCog}/>
        <div className="m-auto text-center flex flex-col items-center">
            <h1 className="font-heading text-5xl m-20">Farmdata</h1>
            <div className="flex text-center items-center mb-20">
              {/*If there is no data, the sorting buttons are not shown*/}
              {!data || isEmptyData? (

                <form onSubmit={(e)=>handleClick('getData', e)}>
                  <select onChange={(e) => setFarmLocation(e.target.value)} name="farm" id="farm">

                    {selectOptions}
                    <option value="all" selected>All</option>
                  </select>
                  <input type="submit" className="bg-black text-white px-3 h-12 my-3 mr-3 font-body text-center text-2xl transition duration-200 hover:bg-white hover:text-black border border-black hover:scale-105" value="Get data"/>
                </form>

              ) : (
                <form onSubmit={(e)=>handleClick('getData', e)}>
                  <select onChange={(e) => setSensorType(e.target.value)} name="sensortype" id="sensortype">
                    <option value="all" selected>All</option>
                    <option value="pH">pH</option>
                    <option value="rainFall">Rainfall</option>
                    <option value="temperature">Temperature</option>
                  </select>
                  <input type="submit" className="bg-black text-white px-3 h-12 my-3 mr-3 font-body text-center text-2xl transition duration-200 hover:bg-white hover:text-black border border-black hover:scale-105" value="Sort by sensor type"/>
                </form>


              )}

              <button  onClick={()=>handleClick('resetData')} className="bg-white text-black px-3 h-12 my-3 font-body text-center text-2xl transition duration-200 hover:bg-white hover:text-black border border-black hover:scale-105">Reset data
              </button>

            </div>
            {/*If there is data, datapanel is shown*/}
            {data ? <DataPanel emptydata={isEmptyData} farmdata={data}/> : ''}

        </div>
      </div>
    </div>
  );
}

export default App;
