import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Alarm } from './alarm';
import { AlarmService } from '../services/alarm.service';

@Component({
  selector: 'app-alarm-detail',
  templateUrl: './alarm-detail.component.html',
  styleUrls: ['./alarm-detail.component.scss']
})
export class AlarmDetailComponent implements OnInit {

  alarm: Alarm;

  constructor(
    private route: ActivatedRoute,
    private alarmService: AlarmService,
    private location: Location
  ) { }

  ngOnInit() {
    this.getAlarm();
  }

  getAlarm() {
    const id = +this.route.snapshot.paramMap.get('id');
    this.alarmService.getAlarm(id).subscribe(alarm => this.alarm = alarm);
  }

  goBack(): void {
    this.location.back();
  }

}
