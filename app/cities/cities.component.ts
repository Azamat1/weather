import { Component } from '@angular/core';
import { CitiesService, City } from '../shared/index';

@Component({
    moduleId: module.id,
    selector: 'cities',
    templateUrl: 'cities.component.html',
    styleUrls: ['cities.component.css']
})

export class CitiesComponent {
    cities: City[];

    constructor(private citiesService: CitiesService){};

    ngOnInit(){
        this.cities = this.citiesService.getCities();
    }

    createCity(name: string) {
        this.citiesService.addCity(name);
    }

    deleteCity(city: City) {
        this.citiesService.deleteCity(city);
    }

    /*getCityWeather(city: City) {
        this.citiesService.
    }*/  
}