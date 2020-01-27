import { RecurrenceType } from './recurrenceType';

export interface RecurrenceContract{
    recurrenceType: RecurrenceType;
    days: boolean[];
}

export class Recurrence {
    recurrenceType: RecurrenceType;
    days: boolean[];

    // Default
    constructor(contract: RecurrenceContract){
        this.recurrenceType = contract.recurrenceType;
        this.days = contract.days;
    }

    getType(): RecurrenceType {
        return this.recurrenceType;
    }
    
}