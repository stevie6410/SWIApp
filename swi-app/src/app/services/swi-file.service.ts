import { Injectable } from '@angular/core';
import { remote, shell } from 'electron';
import * as fs from 'fs-promise';
import * as path from 'path';
import { SWIHeader } from '../models/app.models';

@Injectable()
export class SWIFileService {

    readonly dirName: string = "swi-data";
    private appDataPath: string;

    constructor() {
        this.appDataPath = path.join(remote.app.getPath('appData'), this.dirName);
        console.log('App Data Path: ', this.appDataPath);
        this.validateRepairAppDataDirectory();
    }

    openLocalDocumentsDirectory() {
        shell.showItemInFolder(path.join(this.appDataPath, "documents"));
    }

    saveFile(filename: string, swi: SWIHeader): Promise<string> {
        return new Promise<string>((resolve, reject) => {
            swi = this.cleanupSWI(swi);
            swi.updatedOn = new Date();
            if (!swi.createdOn) swi.createdOn = new Date();
            fs.writeFile(path.join(this.appDataPath, "documents", filename), JSON.stringify(swi))
                .then(() => {
                    resolve(filename);
                })
                .catch((err) => {
                    reject(Error(`File save error: ${err}`));
                });
        });
    }

    getFile(filename: string): Promise<Object> {
        return new Promise<SWIHeader>((resolve, reject) => {
            //check to see if the file exists
            fs.readFile(path.join(this.appDataPath, 'documents', filename), 'utf8', (err, data) => {
                if (err) reject(Error(err.message));
                resolve(JSON.parse(data));
            });

        });
    }

    getAllFiles(): Promise<Object> {
        return new Promise<SWIHeader[]>((resolve, reject) => {
            let results: Array<SWIHeader> = new Array<SWIHeader>();
            fs.readdir(path.join(this.appDataPath, 'documents'), (err, files) => {
                files.forEach(file => {
                    // console.log(file);
                    fs.readFile(path.join(this.appDataPath, 'documents', file), 'utf8', (err, data) => {
                        let json: SWIHeader = JSON.parse(data);
                        json.filename = file;
                        // console.log(json.title);
                        results.push(json);
                    });
                });
                resolve(results);
            });
        });
    }

    cleanupSWI(swi: SWIHeader): SWIHeader {
        swi = this.cleanupSWIImages(swi);
        return swi;
    }

    private cleanupSWIImages(swi: SWIHeader): SWIHeader {

        let imgCount: number = swi.swiImages.length;

        //Get a list of all image keys used in the swi 
        let keys: string[] = [];
        if (swi.coverImage) keys.push(swi.coverImage);
        swi.swiStages.forEach(stage => {
            if (stage.image) keys.push(stage.image);
        });
        swi.swiTools.forEach(tool => {
            if (tool.image) keys.push(tool.image);
        });
        swi.swiImages.forEach(image => {
            if (!(keys.indexOf(image.key) > -1)) {
                swi.swiImages = swi.swiImages.filter(img => img.key != image.key);
            }
        });

        if (swi.swiImages.length < imgCount) {
            console.log(`Cleanup removed ${imgCount - swi.swiImages.length} images`)
        }

        return swi;
    }

    private validateRepairAppDataDirectory() {
        console.log("Validating App Data Dir");
        fs.exists(this.appDataPath, (err, exists) => {
            if (!exists) {
                fs.mkdir(this.appDataPath, (err) => {
                    if (!err) {
                        //Go ahed and start creating the first level folders
                        this.checkExistsOrCreateDir(path.join(this.appDataPath, "documents"));
                        this.checkExistsOrCreateDir(path.join(this.appDataPath, "trash"));
                    } else {
                        console.log(`Error checking app data ${err.message}`)
                    }
                });
            } else {
                //Go ahed and start creating the first level folders
                this.checkExistsOrCreateDir(path.join(this.appDataPath, "documents"));
                this.checkExistsOrCreateDir(path.join(this.appDataPath, "trash"));
            }
        });
    }

    private checkExistsOrCreateDir(path: string) {
        fs.exists(path, (err, exists) => {
            if (!exists) {
                console.log(`Path ${path} does not exist`);
                fs.mkdir(path, (err) => this.handleCretaedDir);
            } else {
                console.log(`${path} exists`);
            }
        });
    }

    private handleCretaedDir(err) {
        if (err) {
            console.log("Error, could not create folder", err);
        } else {
            console.log("Folder was created succesfully");
        }
    }

}