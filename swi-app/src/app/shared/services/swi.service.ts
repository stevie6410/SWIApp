import { Injectable } from '@angular/core';
import { Http, Request, Response } from '@angular/http';
import { Observable, Subject } from "rxjs/Rx";
import { SWI } from '../models/swi-app.models';

@Injectable()
export class SwiService {

  constructor(
    private http: Http
  ) {

  }

  getSWI(): Observable<SWI> {
    return this.http.get('../../documents/sampledoc1.swi')
      .map((res: Response) => {
        return res.json();
      });
  }

}
