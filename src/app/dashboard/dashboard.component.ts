import { Component, OnInit } from '@angular/core';
import { AlarmService } from '../alarm.service';
import { Alarm } from '../alarms/alarm';

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
    this.alarmService.getAlarms().subscribe(alarms => this.alarms = alarms.slice(0, 4));
  }

}
