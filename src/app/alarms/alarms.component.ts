import { Component, OnInit } from '@angular/core';
import { Alarm } from './alarm';
import { AlarmService } from '../alarm.service';

@Component({
  selector: 'app-alarms',
  templateUrl: './alarms.component.html',
  styleUrls: ['./alarms.component.scss']
})
export class AlarmsComponent implements OnInit {

  alarms: Alarm[];
  selectedAlarm: Alarm;

  constructor(private alarmService: AlarmService) { }

  ngOnInit() {
    this.getAlarms();
  }

  onSelect(alarm: Alarm): void {
    this.selectedAlarm = alarm;
  }

  getAlarms(): void {
    this.alarmService.getAlarms().subscribe(alarms => this.alarms = alarms);
  }

}
