import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {Ng2Webstorage} from 'ng2-webstorage';

import { AppComponent } from './app.component';
import { CitiesFormComponent,
         CitiesListComponent, 
         CitiesItemComponent,
         CitiesComponent,
         CitiesWeatherComponent} from './cities/index';
import { CitiesService} from './shared/index';

@NgModule({
    imports: [
     BrowserModule,
     FormsModule,
     HttpModule,
     Ng2Webstorage
     ],
    declarations: [
        AppComponent,
        CitiesFormComponent,
        CitiesListComponent,
        CitiesItemComponent,
        CitiesComponent,
        CitiesWeatherComponent
        ],
    bootstrap: [AppComponent],
    providers: [CitiesService]
})
export class AppModule {}
