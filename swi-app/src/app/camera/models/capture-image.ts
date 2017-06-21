import { GUID } from "app/core";

export class CaptureImage {
    public key: string;
    public image: string;

    constructor(){
        this.key = new GUID().value;
    }
}