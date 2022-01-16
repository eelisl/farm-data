import React from 'react'

export default function Table(props) {
    
    const DisplayData = props.farmdata.data.map(

        (info)=>{

            return(
                <tr>
                    <td>{info.location}</td>
                    <td>{info.datetime}</td>
                    <td>{info.sensorType}</td>
                    <td>{info.value}</td>
                </tr>
            )
        }

    )

    return(

        <div>{props.emptydata? (

            <h1>There is no data. Input data by clicking the upper left corner</h1>

        ) : (
            
            <table className="">
                <thead>
                    <tr className="text-left">
                        <th>Location</th>
                        <th>Date and time</th>
                        <th>Sensortype</th>
                        <th>Value</th>
                    </tr>
                </thead>
                <tbody>
                
                    {DisplayData}
                    
                </tbody>
            </table>
    
        )}</div>

    )
    
}
