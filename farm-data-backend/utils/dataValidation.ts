import { Farmdata, JSONValue } from "../types/farm_data";


const validateData = (entry: Farmdata) => {

    let invalid: boolean = false;

    for(const key in entry){

        if(key=='datetime'){

            if((new Date(entry[key])).getTime() !> 0){
                
                invalid = true;
                break;

            }
            
        }
        
        if(key=='sensorType'){

            if(entry['sensorType'] == 'pH'){
            
                if(entry['value'] !<= 14 && entry['value'] !>= 0 ){

                    invalid = true;
                    break;

                }

            }else if(entry['sensorType'] == 'rainFall'){

                if(entry['value'] !<= 500 && entry['value'] !>= 0 ){

                    invalid = true;
                    break;

                }
            
            }else if(entry['sensorType'] == 'temperature' ){

                if(entry['value'] !<= 100 && entry['value'] !>= -50 ){

                    invalid = true;
                    break;

                }

            }else{

                invalid = true;
                break;

            }

        }
        
    }

    return entry

}

export { validateData }