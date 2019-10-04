import { Time } from '@angular/common';
import { Recurrence } from '../core/Reccurrence';
import { Music } from '../musics/music';
import { Light } from '../lights/light';

export class Alarm{
    id: number;
    name: string;
    description: string;
    date: Date;
    recurence: Recurrence;
    music: Music;
    light: Light;
    deleteAfterDone: boolean;

    constructor(name:string){
        this.id = 0;
        this.name = name;
        this.description = "Enter a description";
        this.date = new Date();
        this.recurence = new Recurrence();
        this.music = new Music();
        this.light = new Light();
        this.deleteAfterDone = true;
    }
}