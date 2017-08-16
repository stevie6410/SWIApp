import { Injectable, Injector } from "@angular/core";
import { ToastsManager } from "ng2-toastr";
import * as Raven from 'raven-js';

Raven
  .config('https://4291045a400a40b69c15ab98fac95fa3@sentry.io/204440')
  .install();

@Injectable()
export class LoggingService {

  constructor(
    private injector: Injector
  ) { }

  log(error: any) {
    this.logToServer(error);
    this.logToConsole(error);
    this.notifyUI(error);
  }

  logToServer(error: any) {
    Raven.captureException(error);
    console.log("Sentry log submitted");
  }

  logToConsole(error: any) {
    console.error("SWI APP ERROR:: ", error);
  }

  notifyUI(error: any) {
    const toastManager = this.injector.get(ToastsManager);
    let msg: any = error;
    if (error.friendlyMessage !== undefined) {
      msg = error.friendlyMessage;
    }
    toastManager.error(msg, "SWI App Error", { toastLife: 15000, showCloseButton: true });
  }
}
