import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions , Headers} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class DistributorEditService  {




  constructor(private http: Http) {}

    options  ;
    private    URL='api/dist/';
    private    URLnew='api/patient/';
  
  ngOnInit() {
    
        let header = new Headers({'Content-Type': 'application/json'});
         this.options = new RequestOptions({headers: header});
    
      }

      saveDistributor(serobj: string) {
    
    
        let header = new Headers({'Content-Type': 'application/json'});
        let options = new RequestOptions({headers: header});
    
        return this.http
          .post(this.URL+`updateDistributor`, serobj, options).map((res: Response) => res.json());
      }
      
    
    
        
      viewDistributorEdit(serobj: string) {
            let header = new Headers({'Content-Type': 'application/json'});
            let options = new RequestOptions({headers: header});
       
                           return this.http.post( this.URL+`viewDistributorEdit`, serobj, options)
    .map((res: Response) => res.json());
        
          }
  
    
      
      viewDisttype(serobj: string) {
        let header = new Headers({'Content-Type': 'application/json'});
        let options = new RequestOptions({headers: header});
     
                       return this.http.post( this.URL+`viewDistType`, serobj, options)
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
    

  
   deleteDistributor(serobj: string) {
        let header = new Headers({'Content-Type': 'application/json'});
        let options = new RequestOptions({headers: header});
   
                       return this.http.post( this.URL+`deleteDistributor`, serobj, options)
    .map((res: Response) => res.json());
      }
    


     
      viewDistEditPhCompanies(serobj: string) {
            let header = new Headers({'Content-Type': 'application/json'});
            let options = new RequestOptions({headers: header});
       
                           return this.http.post( this.URL+`viewDistEditPhCompanies`, serobj, options)
    .map((res: Response) => res.json());
        
          }


          
      viewDstPhCompanies(serobj: string) {
        let header = new Headers({'Content-Type': 'application/json'});
        let options = new RequestOptions({headers: header});
  
                       return this.http.post( this.URL+`viewDstPhCompanies`, serobj, options)
    .map((res: Response) => res.json());
      }


      geteditstate(serobj: string){
        let header = new Headers({'Content-Type': 'application/json'});
        let options = new RequestOptions({headers: header});
  
                       return this.http.post( this.URL+`geteditdistState`, serobj, options)
    .map((res: Response) => res.json());

      }

      geteditcity(serobj: string){
        let header = new Headers({'Content-Type': 'application/json'});
        let options = new RequestOptions({headers: header});
  
                       return this.http.post( this.URL+`geteditdistCity`, serobj, options)
    .map((res: Response) => res.json());

      }
  
      getdisttype(serobj: string){
        let header = new Headers({'Content-Type': 'application/json'});
        let options = new RequestOptions({headers: header});
  
                       return this.http.post( this.URL+`geteditdistType`, serobj, options)
    .map((res: Response) => res.json());

      } 


}
