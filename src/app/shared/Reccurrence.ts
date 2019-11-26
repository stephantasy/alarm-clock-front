import { RecurrenceType } from './recurrenceType';

// export interface RecurrenceContract{
//     recurrenceType: RecurrenceType;
//     days: Int8Array;
// }

export class Recurrence {
    recurrenceType: RecurrenceType;
    days: boolean[];

    // Default
    constructor(contract: Recurrence){
        this.recurrenceType = contract.recurrenceType;
        this.days = contract.days;
    }

    getType(): RecurrenceType {
        return this.recurrenceType;
    }
    
}