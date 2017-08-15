 // Private Helper Functions
import { Http, Response, Headers, RequestOptionsArgs, RequestOptions } from "@angular/http";
import { Observable } from "rxjs/Observable";

export function defaultOptions(): RequestOptions {
    const authToken = window.localStorage.getItem("auth-token");
    const h = new Headers({ "Content-Type": "application/json", "token": authToken });
    const options = new RequestOptions({ headers: h });
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
    console.error(errMsg);
    return Observable.throw(errMsg);
  }
