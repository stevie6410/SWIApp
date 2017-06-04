import { Directive, HostListener, HostBinding, Output, EventEmitter } from '@angular/core';
import { SWIHeader } from "../../../models/app.models";
import { SWIFileService } from "../../../services/swi-file.service";
import { ToastsManager } from "ng2-toastr";

@Directive({ selector: '[importDropZone]' })
export class ImportDropZoneDirective {

    @Output() onImported = new EventEmitter<void>();
    @Output() onImportStarted = new EventEmitter<void>();

    constructor(
        private swiService: SWIFileService,
        private toast: ToastsManager
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
        this.toast.warning("Started importing SWI file");
        this.background = '#fff'
        evt.preventDefault();
        evt.stopPropagation();
        let files = evt.dataTransfer.files;
        if (files.length > 0) {
            console.log("Files Selected: ", files);

            var reader: FileReader = new FileReader();
            reader.onloadend = () => {
                let rawSWI: any = reader.result;
                this.handleRawSWI(rawSWI);
            };
            reader.readAsText(files[0], 'utf8');
        }
    }

    handleRawSWI(rawSWI: string) {
        let swi: SWIHeader;
        swi = JSON.parse(rawSWI);
        console.log("swi: ", swi);
        this.loadSWIIntoMemory(swi);
    }

    loadSWIIntoMemory(swi: SWIHeader) {
        this.swiService.createSWI(swi).then(importedSwi => {
            //add a time buffer for UI
            setTimeout(() => {
                this.toast.success(`SWI has been imported`);
                this.onImported.emit();
            }, 1000);
        }).catch(err => {
            if (err && err.message && err.message == "Key already exists in the object store.") {
                this.toast.error(`SWI already imported`);
            } else {
                this.toast.error(`SWI could not be imported`);
            }
        });

    }

}
