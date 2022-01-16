import express, {Request, Response} from "express";
import * as dataModel from "../models/db"
import { Farmdata, JSONValue } from "../types/farm_data";
import '../utils/dataValidation';
import { upload, readFile } from "../utils/fileUpload";
import { validateData } from "../utils/dataValidation";
import { stringify } from "querystring";

const farmdataRouter = express.Router();

farmdataRouter.get("/", async (req: Request, res: Response) => {

    if(req.query.location){

        if(req.query.nameOnly=="true"){

            dataModel.findOnlyLabels(req.query.location, (err: Error, farmdata: Farmdata) => {
            
                if (err) {
                    console.log(err)
                    return res.status(500).json({"errorMessage": err.message});
                }
    
               res.status(200).json({"data": farmdata});
                
            }); 
    
        }else if(req.query.sensorType != 'all'){
            console.log(req.query.sensorType)
            dataModel.sortbySensor(req.query.sensorType, req.query.location, (err: Error, farmdata: Farmdata) => {
                
                if (err) {
                    console.log(err)
                    return res.status(500).json({"errorMessage": err.message});
                }
    
               res.status(200).json({"data": farmdata});
                
            }); 

        }else{
            dataModel.findbyFarm(req.query.location, (err: Error, farmdata: Farmdata) => {
                
                if (err) {
                    console.log(err)
                    return res.status(500).json({"errorMessage": err.message});
                }
    
               res.status(200).json({"data": farmdata});
                
            }); 

        }

    }else if(req.query.location==='all'){
        dataModel.findAll((err: Error, farmdata: Farmdata) => {
            
            if (err) {
                console.log(err)
                return res.status(500).json({"errorMessage": err.message});
            }

           res.status(200).json({"data": farmdata});
            
        });      
    }
  });

farmdataRouter.post('/', upload.single('file'), async (req: Request, res: Response) => {

    const fileContents = await readFile((req as any).file.path);

    for(let i = 0; i<fileContents.length; i++){

        const newFarmdata: Farmdata = await validateData(fileContents[i])

        dataModel.create(newFarmdata, (err: Error, farmdata: Farmdata) => {

            if (err) {
                console.log(err)
            }
    
        });

    }

    res.status(200).json({"data": 'ok'});

})

farmdataRouter.get("/deleteall", async (req: Request, res: Response) => {
    dataModel.deleteAll( (err: Error, farmdata: Farmdata) => {
      if (err) {
        return res.status(500).json({"errorMessage": err.message});
      }
      res.status(200).json({"data": farmdata});
    });
  });


export {farmdataRouter}