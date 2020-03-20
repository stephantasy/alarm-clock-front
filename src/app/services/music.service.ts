import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { retry, tap, catchError, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class MusicService {

  // URLs to web api 
  private musicListUrl = environment.apiUrl + 'musics/';        // for Alarms
  private musicUrl = environment.apiUrl + 'music/';   // for Specified Alarm
  private musicStopUrl = environment.apiUrl + 'musics/stop';   // to stop music

  constructor(
    private messageService: MessageService,
    private http: HttpClient
  ) { }

  // TODO
  public getMusicList(): Observable<string[]> {
    return this.http
      .get<string[]>(this.musicListUrl)
      .pipe(
        retry(3),
        tap(_ => this.log('fetched music list')),
        catchError(this.handleError<string[]>('getMusicList'))
      );
  }

  public stop(): Observable<string[]> {
    return this.http
      .put<string[]>(this.musicStopUrl, "")
      .pipe(
        tap(_ => this.log('stop music')),
        catchError(this.handleError<string[]>('stopMusic'))
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

const FAKE_MUSIC_LIST = [
  "Music 1",
  "Music Music Music 2",
  "Music 3",
];