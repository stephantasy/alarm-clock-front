import { Component, OnInit } from '@angular/core';
import { Alarm } from '../alarm-detail/alarm';
import { AlarmService } from '../services/alarm.service';

@Component({
  selector: 'app-alarms',
  templateUrl: './alarms.component.html',
  styleUrls: ['./alarms.component.scss']
})
export class AlarmsComponent implements OnInit {

  alarms: Alarm[];

  constructor(private alarmService: AlarmService) { }

  ngOnInit() {
    this.getAlarms();
  }

  getAlarms(): void {
    this.alarmService.getAlarms().subscribe(alarms => this.alarms = alarms);
  }

}
