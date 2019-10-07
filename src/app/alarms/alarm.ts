import { Time } from '@angular/common';
import { Recurrence } from '../core/Reccurrence';
import { Music } from '../musics/music';
import { Light } from '../lights/light';

export class Alarm{
    id: number = Date.now();
    name: string = "no name";
    description: string = "Enter a description";
    date: Date = new Date();
    recurence: Recurrence = new Recurrence();
    music: Music = new Music();
    light: Light = new Light();
    deleteAfterDone: boolean = true;

    constructor(name:string){
        this.name = name;
    }
}