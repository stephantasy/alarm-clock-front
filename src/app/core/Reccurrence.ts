
enum Type{
    Once,
    EveryTime,
}

export class  Recurrence {
    type: Type;
    days: Int8Array;

    // Default
    constructor(){
        this.type = Type.Once;
    }

    getType() {
        return this.type;
    }
    
}