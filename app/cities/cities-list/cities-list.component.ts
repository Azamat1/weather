import { Component } from '@angular/core';
import { CitiesService, City } from '../../shared/index';

@Component({
    moduleId: module.id,
    selector: 'cities-list',
    templateUrl: 'cities-list.component.html',
    styleUrls: ['cities-list.component.css'],
    providers: [CitiesService]
})
export class CitiesListComponent {
    cities: City[] =[];
    constructor(private citiesService: CitiesService){};

   ngOnInit(){
        this.cities = this.citiesService.getCities();
    }

    delete(city: City) {
        this.citiesService.deleteCity(city.name);
    }
}