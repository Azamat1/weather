import { Component } from '@angular/core';
import { CitiesService, City, Message} from '../shared/index';

@Component({
    moduleId: module.id,
    selector: 'cities',
    templateUrl: 'cities.component.html',
    styleUrls: ['cities.component.css']
})

export class CitiesComponent {
    cities: City[];
    currentCity: City;
    private message: Message;

    constructor(private citiesService: CitiesService){};

    ngOnInit(){
        this.cities = this.citiesService.getCities();
        this.message = this.citiesService.infoMessage;
        this.getCityByLocation();
    }

    location: any = {};

    private setPosition(position: any){
      this.location = position.coords;
       this.citiesService.getWeatherByLocation(this.location.latitude, this.location.longitude);
    }
    
    getCityByLocation() {
        if(!navigator.geolocation)
            return;
        navigator.geolocation.getCurrentPosition(this.setPosition.bind(this));
   }

    clearMessage() {
        this.message.text ='Nothing';
    }

    createCity(name: string) {
        this.citiesService.getWeatherByCity(new City(name), true);
    }

    deleteCity(city: City) {
        this.citiesService.deleteCity(city);
    }

    showCityWeather(city: City) {
        this.citiesService.getWeatherByCity(city, false);
        this.currentCity = city;
    }  
}