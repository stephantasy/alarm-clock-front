import { Time } from '@angular/common';
import { Recurrence } from '../shared/Reccurrence';
import { Music } from '../musics/music';
import { Light } from '../lights/light';
import { RecurrenceType } from '../shared/recurrenceType';

export interface AlarmContract{
    id: number;
    name: string;
    description: string;
    date: Date;
    recurence: Recurrence;
    music: Music;
    light: Light;
    deleteAfterDone: boolean;
    activated: boolean; 
}

export class Alarm{
    id: number;
    name: string;
    description: string;
    date: Date = new Date();
    recurence: Recurrence;
    music: Music;
    light: Light;
    deleteAfterDone: boolean;
    activated: boolean;

    constructor(contract: AlarmContract){
        this.id = contract.id;
        this.name = contract.name;
        this.description = contract.description;
        this.date = new Date(contract.date);
        this.recurence = contract.recurence;
        this.music = contract.music;
        this.light = contract.light;
        this.deleteAfterDone = contract.deleteAfterDone;
        this.activated = contract.activated;
    }


    public setActivated(value:boolean):void{
        this.activated = value;
    }

    public getActivated():boolean{
        return this.activated;
    }

    public getHour():string{
        return this.date.getTime().toString();
    }

    public isRecurrenceOnce():boolean{
        return this.recurence.getType() === RecurrenceType.Once;
    }
}