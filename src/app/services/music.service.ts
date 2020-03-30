import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { retry, tap, catchError, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { MessageService } from './message.service';
import { MusicContract, Music } from '../models/music';

@Injectable({
  providedIn: 'root'
})
export class MusicService {

  // URLs to web api 
  private musicListUrl = environment.apiUrl + 'musics/';        // for Musics
  private musicUrl = environment.apiUrl + 'musics/music/';   // for Specified Music
  private musicStopUrl = environment.apiUrl + 'musics/stop';   // to stop music
  private musicStateUrl = environment.apiUrl + 'musics/state';   // Music State (on/off)


  constructor(
    private messageService: MessageService,
    private http: HttpClient
  ) { }

  // TODO
  public getMusicList(): Observable<string[]> {
    return this.http
      .get<string[]>(this.musicListUrl)
      .pipe(
        tap(_ => this.log('fetched music list')),
        catchError(this.handleError<string[]>('getMusicList'))
      );
  }

  getMusic(id: number): Observable<Music> {
    // TODO: send the message _after_ fetching the musics
    //this.log(`MusicService: fetched music id=${id}`);
    return this.http
      .get<MusicContract>(this.musicUrl + id)
      .pipe(
        tap(_ => this.log(`fetched music id=${id} (from ${this.musicUrl})`)),
        catchError(this.handleError<MusicContract>(`getMusic id=${id}`)),
        map(contract => new Music(contract))
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

  public getMusicState(): Observable<boolean> {
    return this.http
      .get<boolean>(this.musicStateUrl)
      .pipe(
        //tap(_ => this.log('get music state=' + _)),
        catchError(this.handleError<boolean>('getMusicState'))
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
    this.messageService.add(`MusicService: ${message}`);
  }
}

const FAKE_MUSIC_LIST = [
  "Music 1",
  "Music Music Music 2",
  "Music 3",
];