import {Injectable} from '@angular/core';
import {Http, Response, RequestOptions, Headers} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';


@Injectable()
export class viewDistProdService {


  options  ;
    private    URL='api/distprod/';


    constructor(private http: Http) {}
    
       
  ngOnInit() {
    
        let header = new Headers({'Content-Type': 'application/json'});
         this.options = new RequestOptions({headers: header});
    
      }
      viewDistProdAll(serobj: string ) {
        let header = new Headers({'Content-Type': 'application/json'});
        let  options = new RequestOptions({headers: header});

             return this.http.post( this.URL+`viewDistProdAll`, serobj, options)
    .map((res: Response) => res.json());
      }


}
