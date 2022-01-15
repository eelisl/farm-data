import express, {Request, Response} from "express";
import * as dataModel from "../models/db"
import { Farmdata, JSONValue } from "../types/farm_data";
import '../utils/dataValidation';
import { upload, readFile } from "../utils/fileUpload";
import { validateData } from "../utils/dataValidation";

const farmdataRouter = express.Router();

farmdataRouter.get("/", async (req: Request, res: Response) => {
    dataModel.findAll((err: Error, farmdata: Farmdata) => {
      if (err) {
        return res.status(500).json({"errorMessage": err.message});
      }
  
      res.status(200).json({"data": farmdata});
    });
  });

farmdataRouter.post('/', upload.single('file'), async (req: Request, res: Response) => {
    
    const fileContents = await readFile((req as any).file.path);
    
    const insertedFarmData: JSONValue = fileContents;
    
    for(let i = 0; i>insertedFarmData.length; i++){

        const newFarmdata: Farmdata = validateData(insertedFarmData[i])

        dataModel.create(newFarmdata, (err: Error, farmdata: Farmdata) => {

            if (err) {
                return res.status(500).json({"message": err.message});
            }

        });

    }

    res.status(200).json({"status": 'ok'});

})

export {farmdataRouter}