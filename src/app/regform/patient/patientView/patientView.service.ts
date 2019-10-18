import {Injectable} from '@angular/core';
import {Http, Response, RequestOptions, Headers} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class PatientViewService {




  constructor(private http: Http) {}


  options  ;
  
    private    URL='api/patient/';


  ngOnInit() {
    
        let header = new Headers({'Content-Type': 'application/json'});
         this.options = new RequestOptions({headers: header});
    
      }


  patientView(serobj: string) {
     
    let header = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: header});

         return this.http.post( this.URL+`viewPatients`, serobj, options)
    .map((res: Response) => res.json());
  }


  patientDelete(serobj: string) {
    let header = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: header});

         return this.http.post( this.URL+`deletePatient`, serobj, options)
    .map((res: Response) => res.json());
  }



  save(serobj: string) {
    let header = new Headers({'Content-Type': 'application/json' ,'Access-Control-Allow-Origin': '*'   });
    let options = new RequestOptions({headers: header});

         return this.http.post(`http://localhost:8081/api/paytm/saveSales79`, serobj, options)
    .map((res: Response) => res.json());
  }




}
