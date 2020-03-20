import { Component } from '@angular/core';
import { MusicService } from './services/music.service';
import { MessageService } from './services/message.service';
import { LightService } from './services/light.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private musicService: MusicService,
    private lightService: LightService,
    private messageService: MessageService
    ) { }
  title = 'Alarm Clock';

  stopMusic(){
    this.musicService.stop().subscribe(() => {
        this.messageService.add("Music Stopped");
      });
  }
  
  stopLight(){
    this.lightService.stop().subscribe(() => {
        this.messageService.add("Ligth Stopped");
      });
  }
}
