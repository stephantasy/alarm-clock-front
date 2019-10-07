import { Component, OnInit, Input } from '@angular/core';
import { Alarm } from '../alarms/alarm';

@Component({
  selector: 'app-alarm-detail',
  templateUrl: './alarm-detail.component.html',
  styleUrls: ['./alarm-detail.component.scss']
})
export class AlarmDetailComponent implements OnInit {

  @Input() alarm: Alarm;

  constructor() { }

  ngOnInit() {
  }

}
