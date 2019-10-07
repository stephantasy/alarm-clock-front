import { Injectable } from '@angular/core';
import { ALARMS } from './mock-alarms';
import { Alarm } from './alarms/alarm';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlarmService {

  constructor() { }

  getAlarms(): Observable<Alarm[]>{
    return of(ALARMS);
  }
}
