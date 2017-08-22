import { Injectable, Injector } from "@angular/core";
import { ToastsManager } from "ng2-toastr";
import * as Raven from 'raven-js';

Raven
  .config('https://4291045a400a40b69c15ab98fac95fa3@sentry.io/204440')
  .install();

@Injectable()
export class LoggingService {

  private friendlyError: string;

  constructor(
    private injector: Injector
  ) { }

  log(error: any) {
    this.friendlyError = this.getFriendlyMessage(error);
    this.logToServer(error);
    this.logToConsole(error);
    this.notifyUI(error);
  }

  getFriendlyMessage(error: any) {
    let msg: any = error;
    if (error.json && error.json().exceptionMessage) {
      msg = error.json().exceptionMessage;
    }
    else if (error.friendlyMessage !== undefined) {
      msg = error.friendlyMessage;
    } else {
      const err: Error = msg;
      var firstLine = err.message.split('\n')[0];
      msg = firstLine;
    }
    return msg;
  }

  logToServer(error: any) {
    Raven.captureException(error);
  }

  logToConsole(error: any) {
    console.error(this.friendlyError);
  }

  notifyUI(error: any) {
    const toastManager = this.injector.get(ToastsManager);
    toastManager.error(this.friendlyError, "SWI App Error", { toastLife: 15000, showCloseButton: true });
  }
}
