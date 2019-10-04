
enum Type{
    Once,
    EveryDay,
}

export class  Recurrence {
    type: Type;

    // Default
    constructor(){
        this.type = Type.Once;
    }

    getType() {
        return this.type;
    }
    
}