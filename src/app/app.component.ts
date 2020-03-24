import { Component } from '@angular/core';
import { MusicService } from './services/music.service';
import { MessageService } from './services/message.service';
import { LightService } from './services/light.service';
import { Observable, interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  title = 'Alarm Clock';
  musicState: boolean;
  lightState: boolean;
  private updateSubscription: Subscription;

  constructor(private musicService: MusicService,
    private lightService: LightService,
    private messageService: MessageService
  ) { }


  ngOnInit() {
    this.getMusicStatus();
    this.getLightStatus();

    // Refresh data every... (in milliseconds)
    this.updateSubscription = interval(20000).subscribe((val) => {
      this.getMusicStatus();
      this.getLightStatus();
    });
  }

  stopMusic() {
    this.musicService.stop().subscribe(() => {
      this.getMusicStatus();
      this.messageService.add("Music Stopped");
    });
  }

  stopLight() {
    this.lightService.stop().subscribe(() => {
      this.getLightStatus();
      this.messageService.add("Ligth Stopped");
    });
  }

  getMusicStatus() {
    this.musicService.getMusicState().subscribe(state => {
      this.musicState = state;
    });
  }

  getLightStatus() {
    this.lightService.getLightState().subscribe(state => this.lightState = state);
  }
}
