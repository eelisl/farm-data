import React from 'react'
import Table from './Table'

export default function DataPanel(props) {
    
    return (
        <div>
            <Table  emptydata={props.emptydata} farmdata={props.farmdata}/>
        </div>
    )
}
