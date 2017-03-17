import { Component, Input, EventEmitter, Output } from '@angular/core';
import { City } from '../../shared/index';

@Component({
    moduleId: module.id,
    selector: 'cities-item',
    templateUrl: 'cities-item.component.html',
    styleUrls: ['cities-item.component.css']
})
export class CitiesItemComponent {
    @Input() city: City;
    @Output() onDelete = new EventEmitter<City>();
    @Output() onClick = new EventEmitter<City>();
    
    delete() {
        this.onDelete.emit(this.city);
    }

    click() {
        this.onClick.emit(this.city);
    }
}