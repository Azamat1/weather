import { Component } from '@angular/core';
import { CitiesService, City, Message } from '../shared/index';

@Component({
    moduleId: module.id,
    selector: 'cities',
    templateUrl: 'cities.component.html',
    styleUrls: ['cities.component.css']
})

export class CitiesComponent {
    cities: City[];
    currentCity: City = new City("Город не выбран");
    message: Message;

    constructor(private citiesService: CitiesService){};

    ngOnInit(){
        this.cities = this.citiesService.getCities();
        this.message = this.citiesService.infoMessage;
    }

    clearMessage() {
        this.message.text ='';
    }

    createCity(name: string) {
        this.citiesService.addCity(name);
    }

    deleteCity(city: City) {
        this.citiesService.deleteCity(city);
    }

    showCityWeather(city: City) {
        this.currentCity = city;
    }  
}