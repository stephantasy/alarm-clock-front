import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Alarm } from './alarm';
import { AlarmService } from '../services/alarm.service';
import { MatCheckboxChange, MatRadioChange } from '@angular/material';
import { MessageService } from '../services/message.service';
import { RecurrenceType } from '../shared/recurrenceType';
import { timeInterval } from 'rxjs/operators';


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
