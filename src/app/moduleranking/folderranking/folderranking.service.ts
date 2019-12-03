import {Injectable} from '@angular/core';
import {Http, Response, RequestOptions, Headers} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';


@Injectable()
export class FolderrankService {


  options  ;
    private  getfolderURL='api/getloginuserlabel/';
    private  saverankURL='api/updateusermodulelable/';

    constructor(private http: Http) {}
    
       
  ngOnInit() {
    
        let header = new Headers({'Content-Type': 'application/json'});
         this.options = new RequestOptions({headers: header});
    
      }

      savefolderrank(id: number) {
       
        return this.http.get(this.getfolderURL+'/'+id).map(response => response.json());
      }

      saverank(data) {
        let header = new Headers({'Content-Type': 'application/json'});
        let  options = new RequestOptions({headers: header});

        return this.http.post(this.saverankURL, data, options).map(response => response.json());
      }

  
}
