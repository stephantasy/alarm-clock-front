import { Component, OnInit } from '@angular/core';
import { COLORS } from '../shared/colorList';
import { MatSelectChange } from '@angular/material';

@Component({
  selector: 'app-lights',
  templateUrl: './lights.component.html',
  styleUrls: ['./lights.component.scss']
})
export class LightsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  // Colors
  colors = COLORS;

  // Controls
  intensityValue = 100;
  colorValue:string = this.colors[0].code;
  durationValue = 15;


}
