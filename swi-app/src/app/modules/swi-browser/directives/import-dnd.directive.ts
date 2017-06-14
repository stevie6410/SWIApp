import { Directive, HostListener, HostBinding, Output, EventEmitter } from '@angular/core';
import { SWIHeader } from "../../../models/app.models";
import { ToastsManager } from "ng2-toastr";
import { SWIFileService } from "../../../services/swi-file.service";
import { ImageStoreService } from "../../../services/image-store.service";

@Directive({ selector: '[importDropZone]' })
export class ImportDropZoneDirective {

    @Output() onImportStageUpdate = new EventEmitter<string>();
    @Output() onImportProgress = new EventEmitter<number>();
    @Output() onImported = new EventEmitter<void>();
    @Output() onImportStarted = new EventEmitter<void>();

    constructor(
        private toast: ToastsManager,
        private imageStore: ImageStoreService,
        private swiStore: SWIFileService
    ) { }

    @HostBinding('style.background') private background = '#fff';

    @HostListener('dragover', ['$event']) public onDragOver(evt) {
        evt.preventDefault();
        evt.stopPropagation();
        this.background = '#ffd5d5';
    }
    @HostListener('dragleave', ['$event']) public onDragLeave(evt) {
        evt.preventDefault();
        evt.stopPropagation();
        this.background = '#fff'
    }
    @HostListener('drop', ['$event']) public onDrop(evt) {
        this.onImportStarted.emit();
        // this.toast.warning("Started importing SWI file");
        this.background = '#fff'
        evt.preventDefault();
        evt.stopPropagation();
        let files = evt.dataTransfer.files;
        if (files.length > 0) {
            console.log("Files Selected: ", files);
            var reader: FileReader = new FileReader();
            reader.onloadend = () => {
                console.log("Reader.OnLoadend");
                let rawSWI: any = reader.result;
                this.handleRawSWI(rawSWI);
            };
            reader.readAsText(files[0], 'utf8');
        }
    }

    async handleRawSWI(rawSWI: string) {
        let swi = JSON.parse(rawSWI);
        await this.import(swi);
    }

    public async import(swi: SWIHeader): Promise<SWIHeader> {
        this.updateImportStage("Importing Header");
        //Check to see if this swi id is already in the local database
        let existingSWI = await this.swiStore.getFile(swi.id);
        if(existingSWI){
            console.log("SWI is already imported");
            this.updateImportStage("SWI is already imported!")
            setTimeout(() => {
                this.onImported.emit();
            }, 3000);
            return null;
        }

        let importedSWI = await this.swiStore.add(swi, true, true);
        this.updateImportStage("Compressing Images");
        //Manually run the image store .add so that we can repost back progress
        for (var i = 0; i < importedSWI.swiImages.length; i++) {
            var img = importedSWI.swiImages[i];
            await this.imageStore.add(swi.id, img, true);
            this.updateImportProgress(importedSWI.swiImages.length, i);
        }
        //Set the embedded image store back to blank array
        importedSWI.swiImages = [];

        //Save the SWI
        this.updateImportStage("Saving");
        await this.swiStore.update(importedSWI);
        this.updateImportProgress(100,0);
        this.onImported.emit();
        return importedSWI;
    }

    private updateImportStage(importStageName: string) {
        this.onImportStageUpdate.emit(importStageName);
    }

    private updateImportProgress(total: number, increment: number) {
        this.onImportProgress.emit(Math.trunc((increment / total) * 100));
    }

    // loadSWIIntoMemory(swi: SWIHeader) {
    //     console.log("Load SWI into memory START");
    //     this.swiService.add(swi, true).then(importedSwi => {
    //         //add a time buffer for UI
    //         console.log("Load SWI into memory FINISH");
    //         this.toast.success(`SWI has been imported`);
    //         this.onImported.emit();
    //         // setTimeout(() => {
    //         // }, 1000);
    //     }).catch(err => {
    //         if (err && err.message && err.message == "Key already exists in the object store.") {
    //             this.toast.error(`SWI already imported`);
    //         } else {
    //             this.toast.error(`SWI could not be imported`);
    //         }
    //     });
    // }

}
