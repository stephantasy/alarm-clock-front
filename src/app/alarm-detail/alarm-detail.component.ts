import { Component, OnInit, Input, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Alarm } from './alarm';
import { AlarmService } from '../services/alarm.service';
import { MatCheckboxChange, MatRadioChange } from '@angular/material';
import { MessageService } from '../services/message.service';
import { RecurrenceType } from '../shared/recurrenceType';
import { NgxMaterialTimepickerEventService } from 'ngx-material-timepicker/src/app/material-timepicker/services/ngx-material-timepicker-event.service';
import { NgxMaterialTimepickerComponent } from 'ngx-material-timepicker';


@Component({
  selector: 'app-alarm-detail',
  templateUrl: './alarm-detail.component.html',
  styleUrls: ['./alarm-detail.component.scss']
})
export class AlarmDetailComponent implements OnInit {

  alarm: Alarm;
  days: string[] = ['Monday', 'Tuesday', 'Wednesday', 'Thuersday', 'Friday', 'Saturday', 'Sunday'];
  daysAreHidden: boolean;
  dataAreLoaded: boolean = false;
  savingInProgress: boolean = false;  // Preserve from spaming

  constructor(
    private route: ActivatedRoute,
    private alarmService: AlarmService,
    private messageService: MessageService,
    private location: Location
  ) { }

  
  ngOnInit() {
    this.getAlarm();
    this.savingInProgress = false;
  }  

  // Get the Alarm from DB
  getAlarm() {
    const id = +this.route.snapshot.paramMap.get('id');
    this.alarmService.getAlarm(id).subscribe(alarm => {
      this.alarm = alarm;
      this.dataAreLoaded = true;
      this.daysAreHidden = alarm.isRecurrenceOnce();
    });
  }
  
  getTime(){
    //this.messageService.add("hour = " + this.alarm.date);
    //this.messageService.add("hour = " + new Date(this.alarm.date).getHours() + ":" + new Date(this.alarm.date).getMinutes());
    return this.alarm.getTime();
  }

  setTime(event: EventEmitter<string>){
    
    this.messageService.add("============================================");
    this.messageService.add("ALARM.DATE= " + this.alarm.date);
    this.messageService.add("event = " + event);

    var newDate = new Date(this.alarm.date);
    this.messageService.add("newDate.toString() = " + newDate.toString());
    this.messageService.add("newDate.toISOString() = " + newDate.toISOString());

    
    var pipi = newDate.getFullYear() + "/" + newDate.getMonth() + "/" + newDate.getDate() + " " + event + ":00";
    this.messageService.add("pipi = " + pipi);

    var laDate = new Date(newDate.getFullYear() + "/" + newDate.getMonth()+1  + "/" + newDate.getDate() + " " + event + ":00");
    this.messageService.add("laDate = " + laDate);

    this.messageService.add("laDate.toDateString() = " + laDate.toDateString());
    this.messageService.add("laDate.toTimeString() = " + laDate.toTimeString());


    this.alarm.date = laDate.getFullYear() + "-" + laDate.getMonth()+1  + "-" + laDate.getDate() + " " + laDate.getHours() + ":" + laDate.getMinutes();

    this.messageService.add("ALARM.DATE= " + this.alarm.date);
    this.messageService.add("============================================");
  }

  // Update selected days 
  onRecurrenceDays(obj: MatCheckboxChange, day: string) : void{
    var dayPos = this.days.indexOf(day);
    this.alarm.setDaySelected(dayPos, obj.checked);
  }

  // Return if the day passed in parameter is selected
  isRecurrenceDayChecked(day: string): string{
    var isSelected = this.alarm.isDaySelected(this.days.indexOf(day));
    // this.messageService.add("day: " + day + " - Position: " + this.days.indexOf(day) + " - Selected: " + isSelected);
    return isSelected ? day : ''; // Return the day if selected otherwise nothing
  }

  // Recurrence or not
  isRecurrenceOnce(obj: MatRadioChange): boolean{
    return this.alarm.isRecurrenceOnce();
  }

  // Recurrence Selection Changed
  onRecurrenceChange(obj: MatRadioChange){
    if(obj.value == RecurrenceType.Once){
      this.daysAreHidden = true;
    }else{
      this.daysAreHidden = false;
    }
  }


  onButtonOk(): void {
    
    if(!this.savingInProgress){
      this.savingInProgress = true;
      this.alarmService.updateAlarm(this.alarm).subscribe(() => {
        this.location.back();
      });
    }
  }

  onButtonCancel(): void {
    this.location.back();
  }
  

}
