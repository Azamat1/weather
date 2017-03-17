import { City } from './index';

let cities: City[] = [
        { name: "Ufa", temperature: 22},
        { name: "Moscow", temperature: 21}
    ];

export class CitiesService {
    

    getCities(): City[] {
        return cities;
    }

    addCity(name: string) {
        console.log('adding city in service');
        cities.push(new City(name));
        console.log('' + cities.length);
    }

    deleteCity(name: string) {
        for (let i = 0; i < cities.length; i++) {
            if (cities[i].name == name){
                cities.splice(i, 1);
            }  
        }
    }
}