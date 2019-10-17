export interface MusicContract{
    name: string;
    file: string;
    volume: number;
    duration: number;
    loop: boolean;
}

export class Music{
    name: string;
    file: string;
    volume: number;
    duration: number;
    loop: boolean;

    constructor(contract: MusicContract){
        Object.assign(this, contract);
    }
}