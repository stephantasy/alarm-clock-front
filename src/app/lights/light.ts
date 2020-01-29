import { Color } from '../shared/Color';

export interface LightContract{
    name: string;
    intensity: number;
    color: string;
    duration: number;
}

export class Light{
    name: string;
    intensity: number;
    color: string;
    duration: number;

    constructor(contract: LightContract){
        Object.assign(this, contract);
    }
}