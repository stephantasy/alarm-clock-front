import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Alarm } from './alarm';
import { AlarmService } from '../services/alarm.service';
import { MatCheckboxChange, MatRadioChange } from '@angular/material';
import { MessageService } from '../services/message.service';
import { RecurrenceType } from '../shared/recurrenceType';

@Component({
  selector: 'app-alarm-detail',
  templateUrl: './alarm-detail.component.html',
  styleUrls: ['./alarm-detail.component.scss']
})
export class AlarmDetailComponent implements OnInit {

  alarm: Alarm;
  days: string[] = ['Monday', 'Tuesday', 'Wednesday', 'Thuersday', 'Friday', 'Saturday', 'Sunday'];
  daysAreHidden: boolean;

  constructor(
    private route: ActivatedRoute,
    private alarmService: AlarmService,
    private messageService: MessageService,
    private location: Location
  ) { }

  ngOnInit() {
    this.getAlarm();
  }  

  getAlarm() {
    const id = +this.route.snapshot.paramMap.get('id');
    this.alarmService.getAlarm(id).subscribe(alarm => {
      // this.messageService.add("alarm: " + alarm);
      return this.alarm = alarm;
    });
  }

  onRecurrenceChange(obj: MatRadioChange, alarm: Alarm){
    
    if(obj.value === RecurrenceType.Once){
      this.daysAreHidden = true;
    }else{
      this.daysAreHidden = false;
    }
    
    this.messageService.add("0: " + obj.value + " - " + RecurrenceType.Once.toString());
  }
  
  onRecurrenceDays() : void{

  }

  isRecurrenceDayChecked(): string{
    return 'Friday';
  }

  isRecurrenceOnce(obj: MatRadioChange, alarm: Alarm): boolean{
    // this.onRecurrenceChange(obj, alarm);
    return true;//alarm.isRecurrenceOnce();
  }

  onButtonOk(): void {
    //TODO
  }

  onButtonCancel(): void {
    this.location.back();
  }
  

}
