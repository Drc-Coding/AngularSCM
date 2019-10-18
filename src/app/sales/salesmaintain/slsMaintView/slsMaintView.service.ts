import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions , Headers} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class slsMaintViewService  {


  constructor(private http: Http) {}
  
  options  ;
  
    private    URL='api/slsinv/';

    private    URLnew='api/slsdum/';


  ngOnInit() {
    
        let header = new Headers({'Content-Type': 'application/json'});
         this.options = new RequestOptions({headers: header});
    
      }
      viewSalesInvoiceAll(serobj: string) {
      let header = new Headers({'Content-Type': 'application/json'});
      let  options = new RequestOptions({headers: header});

        
               return this.http.post( this.URL+`viewSalesInvoiceAll`, serobj, options)
    .map((res: Response) => res.json());
    }
  


    viewSalesDummyAll(serobj: string) {
      let header = new Headers({'Content-Type': 'application/json'});
      let  options = new RequestOptions({headers: header});

        
               return this.http.post( this.URLnew+`viewSalesDummyAll`, serobj, options)
    .map((res: Response) => res.json());
    }
  

    viewSalesInvCustAll(serobj: string) {
      let header = new Headers({'Content-Type': 'application/json'});
      let  options = new RequestOptions({headers: header});

        
               return this.http.post( this.URL+`viewSalesInvCustAll`, serobj, options)
    .map((res: Response) => res.json());
    }
  

    viewSalesDumCustAll(serobj: string) {
      let header = new Headers({'Content-Type': 'application/json'});
      let  options = new RequestOptions({headers: header});

        
               return this.http.post( this.URL+`viewSalesDumCustAll`, serobj, options)
    .map((res: Response) => res.json());
    }
  



    

    viewCustomers(serobj: string) {
      let header = new Headers({'Content-Type': 'application/json'});
      let options = new RequestOptions({headers: header});

        
             return this.http.post( this.URL+`viewSICustomers`, serobj, options)
  .map((res: Response) => res.json());
     }


}
