 //Private Helper Functions
import { Http, Response, Headers, RequestOptionsArgs, RequestOptions } from "@angular/http";
import { Observable } from "rxjs/Observable";

export function defaultOptions(): RequestOptions {
    let h = new Headers({ "Content-Type": "application/json" });
    let options = new RequestOptions({ headers: h });
    return options;
  }

  export function handleResponse(res: Response): any {
    return res.json();
  }

  export function handleError(error: Response | any) {
    // In a real world app, you might use a remote logging infrastructure
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      // const err = body.error || JSON.stringify(body);
      // errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
      errMsg = `${body.message}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    //console.error(errMsg);
    return Observable.throw(errMsg);
  }
