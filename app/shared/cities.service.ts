import { City, Message } from './index';
import { TransliterationService } from './transliteration.service';
import { Observable } from 'rxjs/Observable';
import { Http } from '@angular/http';
import { Injectable, OnInit, OnDestroy } from '@angular/core';
import { LocalStorageService } from 'ng2-webstorage';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class CitiesService {
    constructor(private translit: TransliterationService, private http: Http, private storage:LocalStorageService){ }

    private cities: City[] = [];

    private apiUrl: string = 'http://api.openweathermap.org/data/2.5/weather?';
    private apiKey: string = '&units=metric&APPID=042ec5253c5c9129b2813c2080b50f31';
    private iconUrl: string = 'http://www.openweathermap.org/img/w/';

    infoMessage: Message = new Message('Nothing');

    getCities(): City[] {
        this.retreiveCities();
        return this.cities;
    }

    getWeatherByLocation(latitude: string, longitude: string) {
        console.log('by loc')
        this.http.get(this.apiUrl + 'lat=' + latitude + '&lon=' + longitude + this.apiKey)
                        .subscribe( res => {
                            let data = res.json();
                            let city = new City(data.name);
                            this.extractWeatherData(city, data);
                        }, this.handleError);   
    }

    getWeatherByCity(city: City, isNewCity: boolean) {
        if (isNewCity && this.translit.isCyrillic(city.name))
            city.name = this.translit.transliterate(city.name);
        return this.http.get(this.apiUrl + 'q=' + city.name + this.apiKey)
                        .subscribe( res => {
                            let data = res.json();
                            if( data.name === city.name) {
                                if(this.findCityInList(city) && isNewCity)
                                    this.infoMessage.text = 'Такой город уже есть в списке!';
                                this.extractWeatherData(city, data);
                            } else {
                                this.infoMessage.text = 'Город с таким именем не найден!';
                            }
                        }, this.handleError);
                           
    }

    deleteCity(city: City) {
        for (let i = 0; i < this.cities.length; i++) {
            if (this.cities[i].name == city.name){
                this.cities.splice(i, 1);
            }  
        }
        this.saveCities();
    }

    private extractWeatherData(city: City, data: any) {
        let dataDate = new Date(data.dt * 1000);
        if (city.lastUpdate === dataDate)
            return;

        city.temperature = data.main.temp;
        city.humidity = data.main.humidity;
        city.pressure = data.main.pressure;
        city.visibility = data.visibility;
        city.windSpeed = data.wind.speed;
        city.iconLocation = this.iconUrl + data.weather[0].icon + '.png';
        city.lastUpdate = dataDate;
        this.saveCityInStorage(city);
    }

    private saveCityInStorage(city: City) {
        if(!this.findCityInList(city))
            this.cities.push(city);

        this.saveCities();
    }

    private findCityInList(city: City): boolean {
        for (let i = 0; i < this.cities.length; i++) {
            if (this.cities[i].name == city.name) {
                return true;
            }
        }
        return false;
    }

    private saveCities() {
        this.storage.store('cities', this.cities);
        console.log('saveCities' + this.cities.length);
    }

    private retreiveCities() {
      let cities: any = this.storage.retrieve('cities');
      if (cities == null)
        return;
      this.cities = cities;
      console.log('retreiveCities' + this.cities.length);
    }

    private handleError(error: any)  {
        this.infoMessage.text = error.mesage || error;
        console.error('Произошла ошибка', error.mesage || error);
    }
}