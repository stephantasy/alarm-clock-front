import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

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
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
