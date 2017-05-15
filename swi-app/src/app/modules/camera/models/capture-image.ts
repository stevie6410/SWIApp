import { GUID } from "app/models/app.models";

export class CaptureImage {
    public key: string;
    public image: string;

    constructor(){
        this.key = new GUID().value;
    }
}