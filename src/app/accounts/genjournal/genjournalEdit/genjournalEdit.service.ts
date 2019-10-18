import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class genjournalEditService {




  private URL = 'api/genjrnl/';


  constructor(private http: Http) { }






  saveGenJournal(myObj: string) {


    let header = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: header });

    return this.http
      .post(this.URL + `updateGenJournal`, myObj, options).map((res: Response) => res.json());
  }




  viewDebitNoteNo(serobj: string) {
    let header = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: header });


    return this.http.post(this.URL + `viewDebitNoteNo`, serobj, options)
      .map((res: Response) => res.json());
  }


  viewGenJournal(serobj: string) {
    let header = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: header });

    return this.http.post(this.URL + `viewGenJournal`, serobj, options)
      .map((res: Response) => res.json());
  }



  viewGenJournalAll(serobj: string) {
    let header = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: header });

    return this.http.post(this.URL + `viewGenJournalAll`, serobj, options)
      .map((res: Response) => res.json());
  }



  deleteGenJournal(serobj: string) {
    let header = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: header });

    return this.http.post(this.URL + `deleteGenJournal`, serobj, options)
      .map((res: Response) => res.json());
  }



}
