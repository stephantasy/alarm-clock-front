import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material';
import { Music } from './music';
import { MusicService } from '../services/music.service';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-musics',
  templateUrl: './musics.component.html',
  styleUrls: ['./musics.component.scss']
})
export class MusicsComponent implements OnInit {

  musics: string[] = [];

  constructor(private musicService: MusicService) { }

  ngOnInit() {
    this.getMusicList();
  }

  getMusicList() {
    // TODO
    // this.musicService.getMusicList().subscribe(musics => this.musics = musics);
    this.musics = FAKE_MUSIC_LIST;
  }

  // Controls
  volumeValue = 100;
  durationValue = 5;
  loopChecked = true;

  // Music File Choose Controller
  selected = new FormControl('valid', [
    Validators.required,
    Validators.pattern('valid'),
  ]);
  selectFormControl = new FormControl('valid', [
    Validators.required,
    Validators.pattern('valid'),
  ]);
  nativeSelectFormControl = new FormControl('valid', [
    Validators.required,
    Validators.pattern('valid'),
  ]);
  matcher = new MyErrorStateMatcher();



}

const FAKE_MUSIC_LIST = [
  "Music 1",
  "Music Music Music 2",
  "Music 3",
];
