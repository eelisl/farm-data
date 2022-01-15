import { Farmdata, JSONValue } from "../types/farm_data";


export const validateData = (entry: Farmdata) => {
    
    const validatedData = {} as Farmdata; 

    for(const key in entry){

        if(key=='datetime'){

            if(!new Date(entry[key])){

            break;

            }
            
        }
        
        if(key=='sensorType'){

            if(entry[key] == 'pH'){
            
            if(entry['value'] !<= 14 && entry['value'] !>= 0 ){

                break;

            }

            }else if(entry[key] == 'rainFall'){

            if(entry['value'] !<= 500 && entry['value'] !>= 0 ){

                break;

            }
            
            }else if(entry[key] != 'temperature' ){

            if(entry['value'] !<= 100 && entry['value'] !>= -50 ){

                break;

            }

            }else{

                break;

            }

        }

    }

    return validatedData;

}
