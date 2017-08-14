import { Injectable } from "@angular/core";
import { SWIFileService, ImageStoreService, SWIHeader } from "app/core";
import { Observable } from "rxjs/Rx";
import { Subject } from "rxjs/Subject";

@Injectable()
export class SWIImportService {

  // Observable string source
  private _importProgress = new Subject<string>();

  // Observable string
  importProgress = this._importProgress.asObservable();

  constructor(
    private swiService: SWIFileService,
    private imageStore: ImageStoreService
  ) {
  }

  async import(swi: SWIHeader): Promise<boolean> {
    this.progress("Checking library");
    // Check to see if the SWI already exists
    const existingSWI = await this.swiService.getFile(swi.id);
    if (existingSWI) {
      this.progress("SWI is already on the device");
      return false;
    }

    const importedSWI = await this.swiService.import(swi);
    this.progress("Client # just after import: " + swi.clientHash);
    this.progress("Processing Images");
    // Manually run the image store .add so that we can repost back progress
    for (let i = 0; i < importedSWI.swiImages.length; i++) {
      const img = importedSWI.swiImages[i];
      await this.imageStore.add(swi.id, img, true);
    }
    // Set the embedded image store back to blank array
    importedSWI.swiImages = [];

    // Save the SWI
    this.progress("Saving");
    await this.swiService.update(importedSWI);
    return true;
  }

  progress(msg: string) {
    this._importProgress.next(msg);
  }


}
