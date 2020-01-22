import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MusicsComponent } from './musics/musics.component';
import { LightsComponent } from './lights/lights.component';
import { AlarmDetailComponent } from './alarm-detail/alarm-detail.component';
import { MessagesComponent } from './messages/messages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { 
  MatCardModule, MatListModule, 
  MatIconModule, MatSliderModule,
  MatCheckboxModule, MatFormFieldModule,
  MatInputModule, MatButtonModule,
  MatSelectModule, MatGridListModule,
  MatRadioModule
} from '@angular/material';
import { MatSlideToggleModule} from '@angular/material/slide-toggle';
import { FlexLayoutModule } from '@angular/flex-layout';
import {NgxMaterialTimepickerModule} from 'ngx-material-timepicker';

@NgModule({
  declarations: [
    AppComponent,
    AlarmDetailComponent,
    MusicsComponent,
    LightsComponent,
    MessagesComponent,
    DashboardComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatListModule,
    MatIconModule,
    MatSlideToggleModule,
    MatCardModule,
    MatSliderModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatInputModule ,
    MatButtonModule,
    MatSelectModule,
    MatGridListModule,
    MatRadioModule,
    FlexLayoutModule,
    NgxMaterialTimepickerModule.setLocale('fr-FR'),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
