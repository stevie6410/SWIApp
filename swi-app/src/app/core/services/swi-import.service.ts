import { Injectable } from "@angular/core";
import { SWIFileService, ImageStoreService, SWIHeader } from "app/core";
import { Observable } from "rxjs/Rx";
import { Subject } from "rxjs/Subject";
import { ToastsManager } from "ng2-toastr/ng2-toastr";

@Injectable()
export class SWIImportService {

  // Observable string source
  private _importProgress = new Subject<string>();

  // Observable string
  importProgress = this._importProgress.asObservable();

  constructor(
    private swiService: SWIFileService,
    private imageStore: ImageStoreService,
    private toast: ToastsManager
  ) {
  }

  async isOnDevice(swiId: string): Promise<boolean> {
    const existingSWI = await this.swiService.getFile(swiId);
    return !(existingSWI === undefined);
  }

  async import(swi: SWIHeader): Promise<boolean> {
    try {
      this.progress("Checking library");
      // Check to see if the SWI already exists
      console.log("Is On device", this.isOnDevice(swi.id));
      if (await this.isOnDevice(swi.id)) { throw new Error("SWI already on device"); }

      const importedSWI = await this.swiService.import(swi);
      // this.progress("Client # just after import: " + swi.clientHash);
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
      await this.swiService.update(importedSWI, importedSWI.clientHash);
      this.toast.success(importedSWI.title, "SWI Imported From Repository");
      return true;
    } catch (error) {
      this.toast.error(swi.title, error, { tokenLifespan: 5000 });
    }
  }

  progress(message: string) {
    this._importProgress.next(message);
  }
}
