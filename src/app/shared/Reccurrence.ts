import { RecurrenceType } from './recurrenceType';


export class  Recurrence {
    type: RecurrenceType;
    days: Int8Array;

    // Default
    constructor(){
        this.type = RecurrenceType.Once;
    }

    getType() {
        return this.type;
    }
    
}