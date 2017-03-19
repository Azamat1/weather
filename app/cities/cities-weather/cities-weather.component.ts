import { Component, Input, OnInit} from '@angular/core';
import { City } from '../../shared/index';

@Component({
    moduleId: module.id,
    selector: 'cities-weather',
    templateUrl: 'cities-weather.component.html',
    styleUrls: ['cities-weather.component.css']
})
export class CitiesWeatherComponent {
    @Input() city: City;

    getLocalizeDate(): string {
        let localizedDate: string =  this.city.lastUpdate.toLocaleString('ru', {
                weekday: "short",
                year: "numeric",
                month: "short",
                day: "numeric",
                hour: 'numeric',
                minute: 'numeric'
            }) ;
        return localizedDate;
    } 
}