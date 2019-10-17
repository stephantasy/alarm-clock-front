import { Color } from '../shared/Color';

export interface LightContract{
    name: string;
    intensity: number;
    color: Color;
    duration: number;
}

export class Light{
    name: string;
    intensity: number;
    color: Color;
    duration: number;

    constructor(contract: LightContract){
        Object.assign(this, contract);
    }
}