import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions , Headers} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class slsInvSaveService  {




  constructor(private http: Http) {}
  
  
  
  
  
    options  ;
  
      private    URL='api/slsinv/';
  
  
    
    ngOnInit() {
      
          let header = new Headers({'Content-Type': 'application/json'});
           this.options = new RequestOptions({headers: header});
      
        }
  
  
  
  
        sendMailAttachment(serobj: any){



          let header = new Headers({'Content-Type': 'application/json'});
          let options = new RequestOptions({headers: header});
      
          return this.http
            .post(`api/sendMailAttachment`, serobj, options).map((res: Response) => res.json());



        }
        getcustemail(id:any){

          return this.http.get(`api/getcustemail` + '/' + id).map((res: Response) => res.json());



        }
  
  
  
        saveSalesInvoice(serobj: string) {
      
      
          let header = new Headers({'Content-Type': 'application/json'});
          let options = new RequestOptions({headers: header});
      
          return this.http
            .post(this.URL+`saveSalesInvoice`, serobj, options).map((res: Response) => res.json());
        }
  
  
  
  
  
  
          saveSIProducts(serobj: string) {
          
            let head = new Headers({'Content-Type': 'application/json'});
   return this.http.post(this.URL+`saveSIProduct`, serobj, {headers: head}).map((res:Response)=>{
      return {"res":res.json()}
    }) 
              // let header = new Headers({'Content-Type': 'application/json'});
              // let options = new RequestOptions({headers: header});
          
              // return this.http
              //   .post(this.URL+`saveSIProduct`, serobj, options)  .map((res: Response) => res.json());
            }
  
  
  
          saveSISalesJournal(serobj: string) {
          
          
              let header = new Headers({'Content-Type': 'application/json'});
              let options = new RequestOptions({headers: header});
          
              return this.http
                .post(this.URL+`saveSISalesJournal`, serobj, options)  .map((res: Response) => res.json());
            }


            saveNewProduct(savenp: string) {

              let header = new Headers({ 'Content-Type': 'application/json' });
              let options = new RequestOptions({ headers: header });
          
              return this.http
                .post(this.URL + `savenewprod`, savenp, options).map((res: Response) => res.json());
          
          
            }


            saveSIReceipt(serobj: string) {
              
              
                  let header = new Headers({'Content-Type': 'application/json'});
                  let options = new RequestOptions({headers: header});
              
                  return this.http
                    .post(this.URL+`saveSIReceipt`, serobj, options)  .map((res: Response) => res.json());
                }

                

  
            saveTempStock(serobj: string) {
              
              
                  let header = new Headers({'Content-Type': 'application/json'});
                  let options = new RequestOptions({headers: header});
              
             return this.http
                    .post(this.URL+`saveTempStock`, serobj, options)  .map((res: Response) => res.json());

                }
  

        
   





                







                

                savePresImage(serobj: FormData) {
                  let header = new Headers();
                  let options = new RequestOptions({headers: header});
             
                       return this.http.post( this.URL+`saveSIPresImage`, serobj, options) 
                       .map((res: Response) => res.text() ) ;
                  
                }


  
         viewCustomers(serobj: string) {
          let header = new Headers({'Content-Type': 'application/json'});
          let options = new RequestOptions({headers: header});
  
            
       return this.http.post( this.URL+`viewSICustomers`, serobj, options)
               .map((res: Response) => res.json());
         }

         viewsoCustomers(serobj: string) {
          let header = new Headers({'Content-Type': 'application/json'});
          let options = new RequestOptions({headers: header});
  
            
       return this.http.post( this.URL+`viewSICustomers1`, serobj, options)
               .map((res: Response) => res.json());
         }
             
         
         viewDoctors(serobj: string) {
          let header = new Headers({'Content-Type': 'application/json'});
          let options = new RequestOptions({headers: header});
  
            
       return this.http.post( this.URL+`viewSIDoctors`, serobj, options)
               .map((res: Response) => res.json());
         }


  
       viewSIProductNames(serobj: string) {
        let header = new Headers({'Content-Type': 'application/json'});
        let options = new RequestOptions({headers: header});
  
      
   return this.http.post( this.URL+`viewSIProductNames`, serobj, options)
      .map((res: Response) => res.json());
         }
        






















































        
  
        viewSIProductName(serobj: string   ) {
          let header = new Headers({'Content-Type': 'application/json'});
          let options = new RequestOptions({headers: header});
    
                 return this.http.post( this.URL+`viewSIProductName`, serobj, options)
      .map((res: Response) => res.json());
        }
  
       viewSIPdtNamesGeneric(serobj: string   ) {
          let header = new Headers({'Content-Type': 'application/json'});
          let options = new RequestOptions({headers: header});
    
                 return this.http.post( this.URL+`viewSIPdtNamesGeneric`, serobj, options)
      .map((res: Response) => res.json());
        }


        
        viewBarCodeProd(serobj: string   ) {
          let header = new Headers({'Content-Type': 'application/json'});
          let options = new RequestOptions({headers: header});
    
                 return this.http.post( this.URL+`viewSIBarCodeProd`, serobj, options)
      .map((res: Response) => res.json());
        }


    
  

        viewPriceSettings(serobj: string   ) {
          let header = new Headers({'Content-Type': 'application/json'});
          let options = new RequestOptions({headers: header});
    
                 return this.http.post( this.URL+`viewSIPriceSettings`, serobj, options)
      .map((res: Response) => res.json());
        }
  
        
        viewDiscountSettings(serobj: string   ) {
          let header = new Headers({'Content-Type': 'application/json'});
          let options = new RequestOptions({headers: header});
    
                 return this.http.post( this.URL+`viewSIDiscountSettings`, serobj, options)
      .map((res: Response) => res.json());
        }

        viewSITaxSettings(serobj: string   ) {
          let header = new Headers({'Content-Type': 'application/json'});
          let options = new RequestOptions({headers: header});
    
                 return this.http.post( this.URL+`viewSITaxSettings`, serobj, options)
      .map((res: Response) => res.json());
        }


  
      viewCustOutstandingTot(serobj: string   ) {
          let header = new Headers({'Content-Type': 'application/json'});
          let options = new RequestOptions({headers: header});
    
                 return this.http.post( this.URL+`viewCustOutstandingTot`, serobj, options)
      .map((res: Response) => res.json());
        }



      viewScheme(serobj: string   ) {
          let header = new Headers({'Content-Type': 'application/json'});
          let options = new RequestOptions({headers: header});
    
                 return this.http.post( this.URL+`viewScheme`, serobj, options)
      .map((res: Response) => res.json());
        }



        
      viewCustAmt(serobj: string   ) {
          let header = new Headers({'Content-Type': 'application/json'});
          let options = new RequestOptions({headers: header});
    
                 return this.http.post( this.URL+`viewCustAmt`, serobj, options)
      .map((res: Response) => res.json());
        }

        viewCustInvoiceNo(serobj: string   ) {
          let header = new Headers({'Content-Type': 'application/json'});
          let options = new RequestOptions({headers: header});
    
                 return this.http.post( this.URL+`viewCustInvoiceNo`, serobj, options)
      .map((res: Response) => res.text());
        }


        
        viewSalesOrderAll(serobj: string   ) {
          let header = new Headers({'Content-Type': 'application/json'});
          let options = new RequestOptions({headers: header});
    
                 return this.http.post( this.URL+`viewSalesOrderAll`, serobj, options)
      .map((res: Response) => res.json());
        }


        
        viewSalesOrderProd(serobj: string   ) {
          let header = new Headers({'Content-Type': 'application/json'});
          let options = new RequestOptions({headers: header});
    
                 return this.http.post( this.URL+`viewSalesOrderProd`, serobj, options)
      .map((res: Response) =>  res.json());
        }



        






}










