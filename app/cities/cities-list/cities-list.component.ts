import { Component, Input, Output, EventEmitter } from '@angular/core';
import { City } from '../../shared/index';

@Component({
    moduleId: module.id,
    selector: 'cities-list',
    templateUrl: 'cities-list.component.html',
    styleUrls: ['cities-list.component.css']
})
export class CitiesListComponent {
    @Input() cities: City[] =[];
    @Output() onDelete: EventEmitter<City> = new EventEmitter();
    @Output() onCityClick: EventEmitter<City> = new EventEmitter();

    delete(city: City) {
        this.onDelete.emit(city);
    }

    cityClick(city: City) {
        this.onCityClick.emit(city);
    }
}