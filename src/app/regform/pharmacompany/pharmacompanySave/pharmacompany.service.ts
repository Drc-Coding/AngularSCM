import {Injectable} from '@angular/core';
import {Http, Response, RequestOptions, Headers} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';





@Injectable()
export class PharmacompanyService {





  constructor(private http: Http) {}


  options  ;
  
    private    URL='api/phcompany/';
    private    URLnew='api/patient/';


  ngOnInit() {
    
        let header = new Headers({'Content-Type': 'application/json'});
         this.options = new RequestOptions({headers: header});
    
      }

  savePhcompany(serobj: string) {


    let header = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: header});

    return this.http
      .post(this.URL+`savePhCompany`, serobj, options) .map((res: Response) => res.json());
  }
  


  
    saveComptype(serobj: string) {
    
    
    
        let header = new Headers({'Content-Type': 'application/json'});
        let options = new RequestOptions({headers: header});
    
        return this.http
          .post(this.URL+`savecomptype`, serobj, options)  .map((res: Response) => res.json());
      }
    
    
    
      saveDivision(serobj: string) {
    
    
    
        let header = new Headers({'Content-Type': 'application/json'});
        let options = new RequestOptions({headers: header});
    
        return this.http
          .post(this.URL+`savedivision`, serobj, options)  .map((res: Response) => res.json());
      }
      

      saveIndvComptype(serobj: string) {
        
        
        
            let header = new Headers({'Content-Type': 'application/json'});
            let options = new RequestOptions({headers: header});
        
            return this.http
              .post(this.URL+`addcomptype`, serobj, options)  .map((res: Response) => res.json());
     }



     saveIndvDivision(serobj: string) {
            
            
            
                let header = new Headers({'Content-Type': 'application/json'});
                let options = new RequestOptions({headers: header});
            
                return this.http
                  .post(this.URL+`adddivision`, serobj, options)  .map((res: Response) => res.json());
    }




  
  viewComptype(serobj: string) {
    let header = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: header});
  
         return this.http.post( this.URL+`viewComptype`, serobj, options)
    .map((res: Response) => res.json());
  }


  viewDivision(serobj: string) {
    let header = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: header});

         return this.http.post( this.URL+`viewDivision`, serobj, options)
    .map((res: Response) => res.json());
  }


  viewCountry(serobj: string) {
    let header = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: header});
  
         return this.http.post( this.URLnew+`viewCountry`, serobj, options)
    .map((res: Response) => res.json());

  }

  viewState(serobj: string) {
    let header = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: header});

         return this.http.post( this.URLnew+`viewState`, serobj, options)
    .map((res: Response) => res.json());
  }

  viewCity(serobj: string) {
    let header = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: header});
     
         return this.http.post( this.URLnew+`viewCity`, serobj, options)
    .map((res: Response) => res.json());
  }


    
   


}
