import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { retry, tap, catchError, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class LightService {


  // URLs to web api 
  private lightStopUrl = environment.apiUrl + 'lights/off-all';   // to turn-off light

  constructor(
    private messageService: MessageService,
    private http: HttpClient
  ) { }


  public stop(): Observable<string[]> {
    return this.http
      .put<string[]>(this.lightStopUrl, "")
      .pipe(
        tap(_ => this.log('stop Light')),
        catchError(this.handleError<string[]>('stopLight'))
      );
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


  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`AlarmService: ${message}`);
  }
}
