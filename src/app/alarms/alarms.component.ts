import { Component, OnInit } from '@angular/core';
import { Alarm } from './alarm';

@Component({
  selector: 'app-alarms',
  templateUrl: './alarms.component.html',
  styleUrls: ['./alarms.component.scss']
})
export class AlarmsComponent implements OnInit {

  alarm = new Alarm('Test');

  constructor() { }

  ngOnInit() {
  }

}
