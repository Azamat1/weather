import { Component, Output, EventEmitter } from '@angular/core';
import { City } from '../../shared/city';

@Component({
    moduleId: module.id,
    selector: 'cities-form',
    templateUrl: 'cities-form.component.html',
    styleUrls: ['cities-form.component.css']
})

export class CitiesFormComponent {
    cityName: string ='';
    @Output() onCreateCity = new EventEmitter<string>();
    
    createCity() {
        this.onCreateCity.emit(this.cityName);
    }
}