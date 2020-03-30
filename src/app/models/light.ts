import { Color } from '../shared/Color';

export interface LightContract{
    id: number;
    name: string;
    intensity: number;
    color: string;
    duration: number;
}

export class Light{
    id: number;
    name: string;
    intensity: number;
    color: string;
    duration: number;

    constructor(contract: LightContract){
        Object.assign(this, contract);
    }
}