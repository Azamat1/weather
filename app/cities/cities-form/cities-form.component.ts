import { Component } from '@angular/core';
import { CitiesService } from '../../shared/index';

@Component({
    moduleId: module.id,
    selector: 'cities-form',
    templateUrl: 'cities-form.component.html',
    styleUrls: ['cities-form.component.css'],
    providers: [CitiesService]
})

export class CitiesFormComponent {
    cityName: string ='';

    constructor(private citiesService: CitiesService){};

    addCity() {
        console.log('adding city'+ this.cityName);
        this.citiesService.addCity(this.cityName);
    }
}