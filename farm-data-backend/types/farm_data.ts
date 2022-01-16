export interface Farmdata{

    location: string, 
    datetime: Date, 
    sensorType: string, 
    value: number 

}

export interface Locationdata{

    location: string

}

export type JSONValue =
    | Array<Farmdata>
    | Array<Locationdata>