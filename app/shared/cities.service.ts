import { City } from './index';
import { Observable } from 'rxjs/Observable';
import { Http } from '@angular/http';
import { Injectable } from '@angular/core';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

let cities: City[] = [
        { name: "Ufa", temperature: 22},
        { name: "Moscow", temperature: 21}
    ];

@Injectable()
export class CitiesService {
    constructor(private http: Http){ }

    getCities(): City[] {
        return cities;
    }
     
    addCity(name: string) {
        console.log('adding city in service');
        cities.push(new City(name));
        console.log('' + cities.length);
    }

    deleteCity(city: City) {
        for (let i = 0; i < cities.length; i++) {
            if (cities[i].name == city.name){
                cities.splice(i, 1);
            }  
        }
    }

    getWeather(city: City) {

    }
}