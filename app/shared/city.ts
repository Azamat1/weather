export class City {
    lastUpdate: Date;
    temperature: number = null;
    humidity: number = null;
    pressure: number = null;
    visibility: number = null;
    windSpeed: number = null;
    
    constructor(public name: string){};
}