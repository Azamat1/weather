import { Component, Input} from '@angular/core';
import { City } from '../../shared/index';

@Component({
    moduleId: module.id,
    selector: 'cities-weather',
    templateUrl: 'cities-weather.component.html',
    styleUrls: ['cities-weather.component.css']
})
export class CitiesWeatherComponent {
    @Input() city: City;
}