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
    recurrence: Recurrence;
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
    recurrence: Recurrence;
    music: Music;
    light: Light;
    deleteAfterDone: boolean;
    activated: boolean;

    constructor(contract: AlarmContract){
        this.id = contract.id;
        this.name = contract.name;
        this.description = contract.description;
        this.date = new Date(contract.date);
        this.recurrence = new Recurrence(contract.recurrence);
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
        return RecurrenceType[this.recurrence.getType().toString()] === RecurrenceType.Once;
    }

    // Return if the (number of) day is selected
    isDaySelected(day: number):boolean {
        return this.recurrence.days[day] === 1;
    }

    
    // Set the day as selected
    setDaySelected(day: number) {
        this.recurrence.days[day] = 1;
    }
}