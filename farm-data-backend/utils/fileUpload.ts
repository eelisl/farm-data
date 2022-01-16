import express, {Request, Response} from 'express';
import bodyParser from 'body-parser';
import csv from 'csv-parser';
import multer from 'multer';
import fs from 'fs';

//setting up some constants for file handling
const upload = multer({dest: '../tmp/csv'});

const readFile = (fileName: string ) => new Promise<any[]>((resolve, reject) => {
  const stream: any = [];
   
  fs.createReadStream(fileName).pipe(csv()) 
    .on('data', (data) => stream.push(data))
    .on('end', () => {
       resolve(stream)
  });
});

export {upload, readFile};