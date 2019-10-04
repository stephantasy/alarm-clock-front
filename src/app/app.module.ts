import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from "@angular/forms"; 
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AlarmsComponent } from './alarms/alarms.component';
import { MusicsComponent } from './musics/musics.component';
import { LightsComponent } from './lights/lights.component';

@NgModule({
  declarations: [
    AppComponent,
    AlarmsComponent,
    MusicsComponent,
    LightsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
