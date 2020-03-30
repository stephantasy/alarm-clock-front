import { Time } from '@angular/common';
import { Recurrence } from '../shared/Reccurrence';
import { RecurrenceType } from '../shared/recurrenceType';

declare const alarmContract: AlarmContract;

export interface AlarmContract{
    id: number;
    name: string;
    description: string;
    date: string;
    recurrence: Recurrence;
    musicID: number;
    lightID: number;
    deleteAfterDone: boolean;
    activated: boolean; 
}

export class Alarm{
    id: number;
    name: string;
    description: string;
    date: string;
    recurrence: Recurrence;
    musicID: number;
    lightID: number;
    deleteAfterDone: boolean;
    activated: boolean;

    constructor(contract: AlarmContract){
        this.id = contract.id;
        this.name = contract.name;
        this.description = contract.description;
        this.date = contract.date;// new Date(contract.date);
        this.recurrence = new Recurrence(contract.recurrence);
        this.musicID = contract.musicID;
        this.lightID = contract.lightID;
        this.deleteAfterDone = contract.deleteAfterDone;
        this.activated = contract.activated;
    }


    public setActivated(value:boolean):void{
        this.activated = value;
    }

    public getActivated():boolean{
        return this.activated;
    }

    public getTime():string{
        return new Date(this.date).getHours() + ":" + new Date(this.date).getMinutes();
    }

    public isRecurrenceOnce():boolean{
        // return RecurrenceType[this.recurrence.getType().toString()] == RecurrenceType.Once;
        return this.recurrence.getType() == RecurrenceType.Once;
    }

    // Return if the (number of) day is selected
    isDaySelected(day: number):boolean {
        return this.recurrence.days[day];
    }

    
    // Set the day as selected
    setDaySelected(day: number, state: boolean) {
        this.recurrence.days[day] = state;
    }
}