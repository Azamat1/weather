export class City {
    lastUpdate: Date;
    temperature: number;
    humidity: number;
    pressure: number;
    visibility: number;
    windSpeed: number;
    iconLocation: string;
    
    constructor(public name: string){};
}