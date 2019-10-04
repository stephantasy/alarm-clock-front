import { Component, OnInit } from '@angular/core';
import { Alarm } from './alarm';
import { ALARMS } from '../mock-alarms';

@Component({
  selector: 'app-alarms',
  templateUrl: './alarms.component.html',
  styleUrls: ['./alarms.component.scss']
})
export class AlarmsComponent implements OnInit {

  alarms = ALARMS;
  selectedAlarm: Alarm;

  constructor() { }

  ngOnInit() {
  }

  onSelect(alarm: Alarm): void {
    this.selectedAlarm = alarm;
  }

}
