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
                    console.log(file);
                    fs.readFile(path.join(this.appDataPath, 'documents', file), 'utf8', (err, data) => {
                        let json: SWIHeader = JSON.parse(data);
                        json.filename = file;
                        console.log(json.title);
                        results.push(json);
                    });
                });
                resolve(results);
            });
        });
    }

    private validateRepairAppDataDirectory() {
        //Must have dir 'swi-data'
        //Must have dir 'swi-data/templates'
        //Must have dir 'swi-data/documents'
        //Must have dir 'swi-data/image-store'

        let validRoot: boolean = false;
        let validTemplates: boolean = false;
        let validDocumetns: boolean = false;
        let validImageStore: boolean = false;

        fs.exists(this.appDataPath, (exists) => {
            if (!exists) {
                fs.mkdir(this.appDataPath, (err) => {
                    if (!err) {
                        //Go ahed and start creating the first level folders
                        this.checkExistsOrCreateDir(path.join(this.appDataPath, "templates"));
                        this.checkExistsOrCreateDir(path.join(this.appDataPath, "documents"));
                        this.checkExistsOrCreateDir(path.join(this.appDataPath, "image-store"));
                    }
                });
            } else {
                //Go ahed and start creating the first level folders
                this.checkExistsOrCreateDir(path.join(this.appDataPath, "templates"));
                this.checkExistsOrCreateDir(path.join(this.appDataPath, "documents"));
                this.checkExistsOrCreateDir(path.join(this.appDataPath, "image-store"));
            }
        });
    }

    private checkExistsOrCreateDir(path: string) {
        fs.exists(path, (exists) => {
            if (!exists) {
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