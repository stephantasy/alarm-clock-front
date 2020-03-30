export interface MusicContract{
    id: number;
    name: string;
    file: string;
    volume: number;
    duration: number;
    loop: boolean;
}

export class Music{
    id: number;
    name: string;
    file: string;
    volume: number;
    duration: number;
    loop: boolean;

    constructor(contract: MusicContract){
        Object.assign(this, contract);
    }
}