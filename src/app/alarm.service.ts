import { Injectable } from '@angular/core';
import { ALARMS } from './mock-alarms';
import { Alarm } from './alarms/alarm';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class AlarmService {

  constructor(private messageService: MessageService) { }

  getAlarms(): Observable<Alarm[]> {
    // TODO: send the message _after_ fetching the alarms
    this.messageService.add('AlarmService: fetched alarms');
    return of(ALARMS);
  }
  
  getAlarm(id: number): Observable<Alarm> {
    // TODO: send the message _after_ fetching the alarms
    this.messageService.add(`AlarmService: fetched alarm id=${id}`);
    return of(ALARMS.find(alarm => alarm.id === id));
  }

}
