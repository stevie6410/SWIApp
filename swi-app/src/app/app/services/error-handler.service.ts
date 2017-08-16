import { ErrorHandler, Injectable, Injector } from "@angular/core";
import { LoggingService } from "./logging.service";
import { Observable } from "rxjs/Observable";

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {

  constructor(
    private injector: Injector
  ) { }

  handleError(error: any) {
    const loggingService = this.injector.get(LoggingService);
    loggingService.log(error);
    throw error;
  }

  handleHttpError(error: any, friendlyMessage: string = null) {
    if (friendlyMessage) { error.friendlyMessage = friendlyMessage; }
    this.handleError(error);
    // console.log("GOT AN ERROR", error);
    // In a real world app, you might use a remote logging infrastructure
    // let errMsg: string;
    // if (error instanceof Response) {
    //   const body: any = error.json() || '';
    //   // const err = body.error || JSON.stringify(body);
    //   // errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    //   errMsg = `${body.exceptionMessage}`;
    // } else {
    //   errMsg = error.message ? error.message : error.toString();
    // }

    return Observable.throw(error);
  }

}

