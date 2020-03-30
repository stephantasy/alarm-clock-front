import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Music, MusicContract } from '../models/music';
import { MusicService } from '../services/music.service';
import { MessageService } from '../services/message.service';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements MatInputModule {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-music-detail',
  templateUrl: './music-detail.component.html',
  styleUrls: ['./music-detail.component.scss']
})
export class MusicDetailComponent implements OnInit {

  music: Music;             // Music Object
  musics: string[] = [];    // List of music names
  dataAreLoaded: boolean = false;
  savingInProgress: boolean = false;  // Preserve from spaming
  isNewMusic: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private musicService: MusicService,
    private messageService: MessageService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.getMusic();
    this.getMusicList();
    this.savingInProgress = false;
  }

  // Get the Music from DB
  getMusic() {
    const id = +this.route.snapshot.paramMap.get('id');

    // Existing Music
    if (id >= 0) {
      this.musicService.getMusic(id).subscribe(music => {
        this.initMusic(music, false);
      });
      this.isNewMusic = false;
    }

    // New Music
    else {
      var musicContract = {
        id: 0,
        name: "NAME",
        file: "random",
        volume: 100,
        duration: 900,
        loop: true,
      } as MusicContract;

      this.initMusic(new Music(musicContract), true);
    }
  }

  private initMusic(music: Music, isNewMusic: boolean) {
    this.music = music;
    this.dataAreLoaded = true;
    this.isNewMusic = isNewMusic;
  }

  getMusicList() {
    // TODO
    // this.musicService.getMusicList().subscribe(musics => this.musics = musics);
    this.musics = ["Random"];
  }

  onButtonOk(): void {
    if (!this.savingInProgress) {
      this.savingInProgress = true;
      // Activate the music
      //this.music.setActivated(true);
      // this.musicService.updateMusic(this.music).subscribe(() => {
         this.location.back();
      // });
    }
  }

  onButtonCreate(): void {
    if (!this.savingInProgress) {
      this.savingInProgress = true;
      //this.musicService.addMusic(this.music).subscribe(() => {
      this.location.back();
      //});
    }
  }

  onButtonCancel(): void {
    this.location.back();
  }

  //*************************************************
  // Controls: VOLUME & DURATION
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
  //*************************************************
}
