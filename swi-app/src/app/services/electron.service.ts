import { Injectable } from '@angular/core';

import { BrowserWindow, remote } from 'electron';

@Injectable()
export class ElectronService {

    constructor() {
    }

    public isKioskMode(): boolean {
        let window: Electron.BrowserWindow = remote.getCurrentWindow();
        if (window != null) {
            return window.isKiosk();
        } else {
            return false;
        }
    }

    public toggleKiosk() {
        let window: Electron.BrowserWindow = remote.getCurrentWindow();
        if (window != null) {
            window.setKiosk(!this.isKioskMode());
        } else {
            console.log("Error retreving current window to toggle the kiosk mode");
        }
    }

    public toggleDeveloperTools() {
        remote.getCurrentWindow().webContents.toggleDevTools();
    }

    public quitApp(){
        remote.app.quit();
    }

}
