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
        // this.description = "Enter a description";
        // this.date = new Date();
        // this.recurence = new Recurrence();
        // this.music = new Music();
        // this.light = new Light();
        // this.deleteAfterDone = true;
    }
    // constructor(
    //     public id = Date.now(),
    //     public name:string = "name",
    //     public description = "Enter a description",
    //     public date = new Date(),
    //     public recurence = new Recurrence(),
    //     public music = new Music(),
    //     public light = new Light(),
    //     public deleteAfterDone = true
    // ){}
    // constructor(obj: Partial<Alarm> = {}){
    //     Object.assign(this, obj);
    // }
}