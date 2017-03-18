import { City, Message } from './index';
import { Observable } from 'rxjs/Observable';
import { Http } from '@angular/http';
import { Injectable } from '@angular/core';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

let cities: City[] = [];

@Injectable()
export class CitiesService {
    constructor(private http: Http){ }

    apiUrl: string = 'http://api.openweathermap.org/data/2.5/weather?q=';
    apiKey: string = '&units=metric&APPID=042ec5253c5c9129b2813c2080b50f31';

    infoMessage: Message = new Message('');

    getCities(): City[] {
        return cities;
    }
     
    addCity(name: string) {
        console.log('adding city in service');

        if(this.checkCityForExistence(name)) {
            this.infoMessage.text = 'Такой город уже есть в списке!';
            return;
        }
        //если города нет в списке, пытаемся найти с таким именем в сервисе погоды
        this.http.get(this.apiUrl + name + this.apiKey)
                        .subscribe( 
                            res => {
                            let data = res.json();
                            //сервис может вернуть город с похожим, но другим именем
                            if( data.name === name ) {
                                let city = new City(name);
                                city.temperature = data.main.temp;
                                city.humidity = data.main.humidity;
                                city.pressure = data.main.pressure;
                                city.visibility = data.visibility;
                                city.windSpeed = data.wind.speed;
                                cities.push(city);
                            } else {
                                this.infoMessage.text = 'Город с таким именем не найден!';
                            }
                        });
    }

    deleteCity(city: City) {
        for (let i = 0; i < cities.length; i++) {
            if (cities[i].name == city.name){
                cities.splice(i, 1);
            }  
        }
    }

    getWeather(city: City): Observable<City> {
        return this.http.get(this.apiUrl)
                        .map( res => {
                            let data = res.json();
                            if( data.name === city.name) {
                                city.temperature = data.main.temp;
                                city.humidity = data.main.humidity;
                                city.pressure = data.main.pressure;
                                city.visibility = data.visibility;
                                city.windSpeed = data.wind.speed;
                            } else {
                                
                            }
                            return city;
                        });   
    }

    private checkCityForExistence(cityName: string): boolean {
        let currentCities: City[] = this.getCities();
        for (let i = 0; i < currentCities.length; i++) {
            if (currentCities[i].name == cityName)
                return true;
        }
        return false;
    }

    private handleError(error: any): any  {
        console.error('Произошла ошибка', error);
        return Observable.throw(error.message || error);
    }
}