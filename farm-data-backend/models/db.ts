import mysql from 'mysql2';
import * as dotenv from 'dotenv';
import { OkPacket, RowDataPacket } from "mysql2";
import {JSONValue, Farmdata, Locationdata } from '../types/farm_data';


//db connection

dotenv.config();

export const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PWD,
  database: process.env.DB_NAME
});

export const create = (dataInsert: Farmdata, callback: Function) => {
    const queryString = "INSERT INTO farmdata (location, datetime, sensorType, value) VALUES (?, ?, ?, ?)"

    db.query(
      queryString,
      [dataInsert.location, dataInsert.datetime, dataInsert.sensorType, dataInsert.value],
      (err, result) => {
        if (err) {callback(err)};
        const insertId = (<OkPacket> result);
        callback(null, insertId);
      }
    );
};

export const findAll = (callback: Function) => {
  const queryString = `
    SELECT 
      *
    FROM farmdata`

  db.query(queryString, (err, result) => {
    if (err) {callback(err)}

    const rows = <RowDataPacket[]> result;
    const resultData: JSONValue = [];

    console.log(result)

    rows.forEach(row => {
      const data: Farmdata =  {

          location: row.location,
          datetime: row.datetime,
          sensorType: row.sensorType,
          value: row.value

      }
      resultData.push(data);
    });
    callback(null, resultData);
  });
}


export const sortbySensor = (sensorType: any, location: any, callback: Function) => {

  let queryString ='';

  if(location==='all'){
    
    queryString = `
    SELECT 
      *
    FROM farmdata
    WHERE sensorType = ?`

    db.query(queryString, [sensorType], (err, result) => {
      if (err) {callback(err)}
  
      const rows = <RowDataPacket[]> result;
      const resultData: JSONValue = [];
  
      rows.forEach(row => {
        const data: Farmdata =  {
  
            location: row.location,
            datetime: row.datetime,
            sensorType: row.sensorType,
            value: row.value
  
        }
        resultData.push(data);
      });
      callback(null, resultData);
    });

  }else{

    queryString = `
    SELECT 
      *
    FROM farmdata
    WHERE location = ? AND sensorType = ?`

    db.query(queryString, [location, sensorType], (err, result) => {
      if (err) {callback(err)}
  
      const rows = <RowDataPacket[]> result;
      const resultData: JSONValue = [];
  
      rows.forEach(row => {
        const data: Farmdata =  {
  
            location: row.location,
            datetime: row.datetime,
            sensorType: row.sensorType,
            value: row.value
  
        }
        resultData.push(data);
      });
      callback(null, resultData);
    });

  } 

}

export const findbyFarm = (location: any, callback: Function) => {

  let queryString ='';
  console.log(location)

  if(location==='all'){

    queryString = `
    SELECT 
      *
    FROM farmdata`

  }else{

    queryString = `
    SELECT 
      *
    FROM farmdata
    WHERE location = ?`

  } 

  db.query(queryString, [location], (err, result) => {
    if (err) {callback(err)}

    const rows = <RowDataPacket[]> result;
    const resultData: JSONValue = [];

    rows.forEach(row => {
      const data: Farmdata =  {

          location: row.location,
          datetime: row.datetime,
          sensorType: row.sensorType,
          value: row.value

      }
      resultData.push(data);
    });
    callback(null, resultData);
  });
}
export const findOnlyLabels = (location: any, callback: Function) => {

  const queryString = 
  `SELECT DISTINCT
      location
    FROM farmdata`

   

  db.query(queryString, (err, result) => {
    if (err) {callback(err)}

    const rows = <RowDataPacket[]> result;
    const resultData: Array<Locationdata> = [];

    console.log(result)

    rows.forEach(row => {
      const data: Locationdata =  {

          location: row.location,

      }
      resultData.push(data);
    });
    callback(null, resultData);
  });
}

export const findbyDate = (startdate: any, enddate: any, callback: Function) => {
  const queryString = `
    SELECT 
      *
    FROM farmdata
    WHERE datetime <= ? OR datetime >= ?`

  db.query(queryString, [startdate, enddate], (err, result) => {
    if (err) {callback(err)}

    const rows = <RowDataPacket[]> result;
    const resultData: JSONValue = [];

    console.log(result)

    rows.forEach(row => {
      const data: Farmdata =  {

          location: row.location,
          datetime: row.datetime,
          sensorType: row.sensorType,
          value: row.value

      }
      resultData.push(data);
    });
    callback(null, resultData);
  });
}

export const deleteAll = (callback: Function) => {
  const queryString = "DELETE FROM farmdata"

  db.query(
    queryString,
    (err, result) => {
      if (err) {callback(err)};
      const insertId = (<OkPacket> result);
      callback(null, insertId);
    }
  );
};