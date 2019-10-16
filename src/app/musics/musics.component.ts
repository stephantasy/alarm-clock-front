import { Component, OnInit } from '@angular/core';
import {coerceNumberProperty} from '@angular/cdk/coercion';

@Component({
  selector: 'app-musics',
  templateUrl: './musics.component.html',
  styleUrls: ['./musics.component.scss']
})
export class MusicsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  // Controls
  volumeValue = 100;
  durationValue = 5;
  loopChecked = true;


}
