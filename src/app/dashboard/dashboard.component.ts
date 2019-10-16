import { Component, OnInit } from '@angular/core';
import { AlarmService } from '../alarm.service';
import { Alarm } from '../alarm-detail/alarm';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  alarms: Alarm[] = [];

  constructor(private alarmService:AlarmService) { }

  ngOnInit() {
    this.getAlarms();
  }

  getAlarms() {
    this.alarmService.getAlarms().subscribe(alarms => this.alarms = alarms);
  }

  onSliderChange(obj: MatSlideToggleChange, alarm: Alarm){
    alarm.setActivated(obj.checked);
  }

  isActivated(alarm: Alarm): boolean{
    return alarm.getActivated();
  }
}
