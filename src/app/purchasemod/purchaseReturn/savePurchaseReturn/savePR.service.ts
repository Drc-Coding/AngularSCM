import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions , Headers} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class savePRService  {




  constructor(private http: Http) {}



  options  ;
    private    URL='api/pr/';
  ngOnInit() {
    
        let header = new Headers({'Content-Type': 'application/json'});
         this.options = new RequestOptions({headers: header});
    
      }


  savePurchReturn(serobj: string) {
    
    
        let header = new Headers({'Content-Type': 'application/json'});
        let options = new RequestOptions({headers: header});
    
        return this.http
          .post(this.URL+`savePurchReturn`, serobj, options).map((res: Response) => res.json());
      }

      savePrProducts(serobj: string) {
        
        
            let header = new Headers({'Content-Type': 'application/json'});
            let options = new RequestOptions({headers: header});
        
            return this.http
              .post(this.URL+`savePrProducts`, serobj, options)  .map((res: Response) => res.json());
          }  



      saveDebitNote(serobj: string) {
        
        
            let header = new Headers({'Content-Type': 'application/json'});
            let options = new RequestOptions({headers: header});
        
            return this.http
              .post(this.URL+`saveDebitNote`, serobj, options)   .map((res: Response) => res.json());
      } 



  viewMedcInvoices(serobj: string) {
          
        
    let header = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: header});

               
               return this.http.post( this.URL+`viewPurcInvoicesNo`, serobj, options)
    .map((res: Response) => res.json());
  }

  viewMedcInvoice(serobj: string) {
      
        
    let header = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: header});

               
               return this.http.post( this.URL+`viewPurcInvoice`, serobj, options)
    .map((res: Response) => res.json());
  }

  viewVendorName(serobj: string) {
    //  alert("services")
        
    let header = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: header});

               
               return this.http.post( this.URL+`savevendoridPurchReturn`, serobj, options)
    .map((res: Response) => res.json());
  }


  viewPiProduct(serobj: string) {
      
        
    let header = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: header});

               
               return this.http.post( this.URL+`viewPiProduct`, serobj, options)
    .map((res: Response) => res.json());
  }

  getTaxmaster(cid: any, bid: any, locrefid: any, locname: any) {
    return this.http.get('api/getTaxmaster' + '/' + cid + '/' + bid + '/' + locrefid + '/' + locname).map(res => res.json());
  }

  editdistname(serobj: string){
    let header = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: header});

               
               return this.http.post( this.URL+`savevendoridPurchReturn`, serobj, options)
    .map((res: Response) => res.json());
  }
}
