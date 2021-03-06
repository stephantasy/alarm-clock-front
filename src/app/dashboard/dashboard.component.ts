import { Component, OnInit } from '@angular/core';
import { AlarmService } from '../services/alarm.service';
import { Alarm } from '../models/alarm';
import { MessageService } from '../services/message.service';
import { Observable, interval, Subscription } from 'rxjs';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {


  private updateSubscription: Subscription;
  alarms: Alarm[] = [];
  musicState: boolean;
  lightState: boolean;

  constructor(
    private alarmService: AlarmService,
    private messageService: MessageService
  ) { }

  ngOnInit() {
    this.getAlarms();

    // Refresh data every... (in milliseconds)
    this.updateSubscription = interval(30000).subscribe((val) => {
      this.getAlarms();
    });
  }

  getAlarms() {
    this.alarmService.getAlarms().subscribe(alarms => this.alarms = alarms);
  }


  // Activation/Desactivation of alarm
  onSliderChange(obj: any, alarm: Alarm) {
    alarm.setActivated(obj.checked);

    // Send it to the backend
    this.alarmService.updateAlarm(alarm).subscribe(() => {
      this.messageService.add("Alarm saved")
    });
  }


  isActivated(alarm: Alarm): boolean {
    return alarm.getActivated();
  }


  ngOnDestroy(): void {
    this.updateSubscription.unsubscribe();
  }


}
