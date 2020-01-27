import { Component, OnInit, Input, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Alarm, AlarmContract } from './alarm';
import { AlarmService } from '../services/alarm.service';
import { MatCheckboxChange, MatRadioChange } from '@angular/material';
import { MessageService } from '../services/message.service';
import { RecurrenceType, RecurrenceDaysNumber } from '../shared/recurrenceType';
import { NgxMaterialTimepickerEventService } from 'ngx-material-timepicker/src/app/material-timepicker/services/ngx-material-timepicker-event.service';
import { NgxMaterialTimepickerComponent } from 'ngx-material-timepicker';
import { Recurrence, RecurrenceContract } from '../shared/Reccurrence';


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
  isNewAlarm: boolean = false;

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

    // Existing Alarm
    if (id >= 0) {
      this.alarmService.getAlarm(id).subscribe(alarm => {
        this.initAlarm(alarm, false);
      });
      this.isNewAlarm = false;
    }

    // New Alarm
    else {
      var recurrence = {
        recurrenceType: RecurrenceType.Once,
        days: new Array(RecurrenceDaysNumber).fill(false)
      } as RecurrenceContract;

      var alarmContract = {
        id: 0,
        name: "NAME",
        description: "",
        date: (new Date()).toISOString(),
        recurrence: new Recurrence(recurrence),
        music: null,
        light: null,
        deleteAfterDone: false,
        activated: true
      } as AlarmContract;

      this.initAlarm(new Alarm(alarmContract), true);
    }
  }

  private initAlarm(alarm: Alarm, isNewAlarm: boolean){
    this.alarm = alarm;
    this.dataAreLoaded = true;
    this.daysAreHidden = alarm.isRecurrenceOnce();
    this.isNewAlarm = isNewAlarm;
  }


  getTime() {
    //this.messageService.add("hour = " + this.alarm.date);
    //this.messageService.add("hour = " + new Date(this.alarm.date).getHours() + ":" + new Date(this.alarm.date).getMinutes());
    return this.alarm.getTime();
  }

  setTime(event: EventEmitter<string>) {
    // On crée une Date depuis la String
    var alarmDate = new Date(this.alarm.date);
    // On crée une Date avec la précédente date et le résultat de l'Event
    var laDate = new Date(alarmDate.getFullYear() + "/" + alarmDate.getMonth() + 1 + "/" + alarmDate.getDate() + " " + event + ":00");
    // On reconstruit la String
    this.alarm.date = laDate.getFullYear() + "-" + laDate.getMonth() + 1 + "-" + laDate.getDate() + " " + laDate.getHours() + ":" + laDate.getMinutes();
  }

  // Update selected days 
  onRecurrenceDays(obj: MatCheckboxChange, day: string): void {
    var dayPos = this.days.indexOf(day);
    this.alarm.setDaySelected(dayPos, obj.checked);
  }

  // Return if the day passed in parameter is selected
  isRecurrenceDayChecked(day: string): string {
    var isSelected = this.alarm.isDaySelected(this.days.indexOf(day));
    // this.messageService.add("day: " + day + " - Position: " + this.days.indexOf(day) + " - Selected: " + isSelected);
    return isSelected ? day : ''; // Return the day if selected otherwise nothing
  }

  // Recurrence or not
  isRecurrenceOnce(obj: MatRadioChange): boolean {
    return this.alarm.isRecurrenceOnce();
  }

  // Recurrence Selection Changed
  onRecurrenceChange(obj: MatRadioChange) {
    // Display
    if (obj.value == RecurrenceType.Once) {
      this.daysAreHidden = true;
    } else {
      this.daysAreHidden = false;
    }

    // Data
    this.alarm.recurrence.recurrenceType = obj.value;

  }


  onButtonOk(): void {

    if (!this.savingInProgress) {
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
