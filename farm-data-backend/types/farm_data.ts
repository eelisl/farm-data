export interface Farmdata{

    location: string, 
    datetime: Date, 
    sensorType: string, 
    value: number 

}


export type JSONValue =
    | Array<Farmdata>