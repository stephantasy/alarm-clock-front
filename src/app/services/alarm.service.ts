import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, tap, retry } from 'rxjs/operators';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { AlarmContract, Alarm } from '../alarm-detail/alarm';

@Injectable({
  providedIn: 'root'
})
export class AlarmService {

  // URLs to web api 
  private alarmsUrl = environment.apiUrl + 'alarms/';        // for Alarms
  private alarmUrl = environment.apiUrl + 'alarms/alarm/';   // for Specified Alarm


  constructor(
    private messageService: MessageService,
    private http: HttpClient
  ) { }

  getAlarms(): Observable<Alarm[]> {
    // TODO: send the message _after_ fetching the alarms
    this.log('AlarmService: fetched alarms');
    return this.http
      .get<AlarmContract[]>(this.alarmsUrl)
      .pipe(
        retry(3), 
        tap(_ => this.log('fetched alarms')),
        catchError(this.handleError<AlarmContract[]>('getAlarms')),
        map(contract =>  { return contract.map((item:AlarmContract) => new Alarm(item))})
      );
  }

  getAlarm(id: number): Observable<Alarm> {
    // TODO: send the message _after_ fetching the alarms
    this.messageService.add(`AlarmService: fetched alarm id=${id}`);
    return this.http
      .get<AlarmContract>(this.alarmUrl + id)
      .pipe(
        retry(3), 
        tap(_ => this.log(`fetched alarm id=${id} (from ${this.alarmsUrl})`)),
        catchError(this.handleError<AlarmContract>(`getAlarm id=${id}`)),
        map(contract => new Alarm(contract))
      );
  }

  
  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`AlarmService: ${message}`);
  }


  /**
 * Handle Http operation that failed.
 * Let the app continue.
 * @param operation - name of the operation that failed
 * @param result - optional value to return as the observable result
 */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

}
