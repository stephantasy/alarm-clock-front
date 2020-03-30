// import {MatCheckboxChange} from '@angular/material/checkbox/typings';
import { Component, OnInit, Input, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Alarm, AlarmContract } from '../models/alarm';
import { AlarmService } from '../services/alarm.service';
// import { MatCheckboxChange } from '@angular/material/checkbox';
import { MessageService } from '../services/message.service';
import { RecurrenceType, RecurrenceDaysNumber } from '../shared/recurrenceType';
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
        date: this.createTime(new Date()),
        recurrence: new Recurrence(recurrence),
        musicID: 1,
        lightID: 1,
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
    return this.alarm.getTime();
  }

  setTime(event: EventEmitter<string>) {
    // On crée une Date depuis la String
    var alarmDate = new Date(this.alarm.date);
    // On crée une Date avec la précédente date et le résultat de l'Event
    var laDate = new Date(alarmDate.getFullYear() + "-" + (alarmDate.getMonth() + 1) + "-" + alarmDate.getDate() + " " + event + "");
    // On reconstruit la String
    this.alarm.date = this.createTime(laDate);
  }

  private createTime(date: Date): string {
    // On reconstruit la String
    var stringDate = date.getFullYear() + "-" + ('0' + (date.getMonth() + 1)).slice(-2) + "-" + ('0' + date.getDate()).slice(-2) + " " + ('0' + date.getHours()).slice(-2) + ":" + ('0' + date.getMinutes()).slice(-2) + "";
    return stringDate;
  }

  // Update selected days 
  onRecurrenceDays(obj: any, day: string): void {
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
  isRecurrenceOnce(): boolean {
    return this.alarm.isRecurrenceOnce();
  }

  // Recurrence Selection Changed
  onRecurrenceChange(obj: any) {
    // Display
    if (obj.value == RecurrenceType.Once) {
      this.daysAreHidden = true;
    } else {
      this.daysAreHidden = false;
    }

    // Data
    this.alarm.recurrence.recurrenceType = obj.value;
  }

  // Add/Modify the current Music
  onButtonAddMusic(){
    
  }
  isNewMusic(): boolean {
    return this.alarm.musicID != 1;
  }

  // Add/Modify the current Light
  onButtonAddLight(){
    
  }
  isNewLight(): boolean {
    return this.alarm.lightID != 1;
  }

  onButtonOk(): void {
    if (!this.savingInProgress) {
      this.savingInProgress = true;
      // Activate the alarm
      this.alarm.setActivated(true);
      this.alarmService.updateAlarm(this.alarm).subscribe(() => {
        this.location.back();
      });
    }
  }

  onButtonCreate(): void {
    if (!this.savingInProgress) {
      this.savingInProgress = true;
      this.alarmService.addAlarm(this.alarm).subscribe(() => {
        this.location.back();
      });
    }
  }

  onButtonCancel(): void {
    this.location.back();
  }


}
