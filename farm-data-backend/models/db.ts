import mysql from 'mysql2';
import * as dotenv from 'dotenv';
import { OkPacket, RowDataPacket } from "mysql2";
import {JSONValue, Farmdata } from '../types/farm_data';


//db connection

dotenv.config();

export const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PWD,
  database: process.env.DB_NAME
});

export const create = (dataInsert: Farmdata, callback: Function) => {
    const queryString = "INSERT INTO farmdata (location, date_time, sensortype, sensor_value) VALUES (?, ?, ?, ?)"
  
    db.query(
      queryString,
      [dataInsert.location, dataInsert.datetime, dataInsert.sensorType, dataInsert.value],
      (err, result) => {
        if (err) {callback(err)};
  
        const insertId = (<OkPacket> result).insertId;
        callback(null, insertId);
      }
    );
};

export const findAll = (callback: Function) => {
  const queryString = `
    SELECT 
      location,
      date_time,
      sensortype,
      sensor_value
    FROM farmdata`

  db.query(queryString, (err, result) => {
    if (err) {callback(err)}

    const rows = <RowDataPacket[]> result;
    const resultData: JSONValue = [];

    rows.forEach(row => {
      const data: Farmdata =  {

          location: row.location,
          datetime: row.date_time,
          sensorType: row.sensor_type,
          value: row.sensor_value

      }
      resultData.push(data);
    });
    callback(null, resultData);
  });
}