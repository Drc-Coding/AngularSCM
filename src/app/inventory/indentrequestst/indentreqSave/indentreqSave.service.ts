import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class indentreqSaveService {

    options;

    private URL = 'api/indreq/';


    private URLnew = 'api/stkmin/';
    constructor(private http: Http) { }







    ngOnInit() {

        let header = new Headers({ 'Content-Type': 'application/json' });
        this.options = new RequestOptions({ headers: header });

    }






    saveIndentRequest(serobj: string) {


        let header = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: header });

        return this.http
            .post(this.URL + `saveIndentRequest`, serobj, options).map((res: Response) => res.json());
    }



    saveIndentProducts(serobj: string) {


        let header = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: header });

        return this.http
            .post(this.URL + `saveIndentProducts`, serobj, options).map((res: Response) => res.json());



    }












    viewWareHouse(serobj: string) {

        let header = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: header });


        return this.http.post(this.URL + `viewWareHouse`, serobj, options)
            .map((res: Response) => res.json());
    }






    viewshopinformation(serobj: string) {


        let header = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: header });



        return this.http.post(this.URL + `viewshopinformation`, serobj, options)
            .map((res: Response) => res.json());
    }

    viewHospital(serobj: string) {

        let header = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: header });



        return this.http.post(this.URL + `viewHospital`, serobj, options)
            .map((res: Response) => res.json());
    }


    viewIrqWhCustProduct(serobj: string) {

        let header = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: header });


        return this.http.post(this.URL + `viewIrqCustProducts`, serobj, options)
            .map((res: Response) => res.json());
    }

    viewServCustProducts(serobj: string) {

        let header = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: header });



        return this.http.post(this.URL + `viewIrqCustProduct`, serobj, options)
            .map((res: Response) => res.json());
    }










    /*  viewStkMinQty(serobj: string) {
          
                
         let header = new Headers({'Content-Type': 'application/json'});
         let options = new RequestOptions({headers: header});
             return this.http
               .post(this.URL+`viewIrqStkMinQty`, serobj, options).map((res: Response) => res.json());
           }
     */

    adminpurchaseOrder(pono: string) {
        let header = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: header });
        return this.http
            .get(this.URL + 'adminindentpurchaseorder'+'/'+pono).map((res: Response) => res.json());
    }




    purchaseOrder(pono:any,compid: any) {
        let header = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: header });
        return this.http
            .get(this.URL + 'indentpurchaseorder'+'/'+pono+'/'+compid).map((res: Response) => res.json());
    }



    /*   viewStkMinQtyAll(serobj: string) {
       let header = new Headers({'Content-Type': 'application/json'});
       let options = new RequestOptions({headers: header});
   
            return this.http.post( this.URL+`viewIrqStkMinQtyAll`, serobj, options)
       .map((res: Response) => res.json());
     }*/

    getPurchaseOrderNO(serobj: string) {
        let header = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: header });

        return this.http.post(this.URL + 'indentgetpurchaseorderno', serobj, options)
            .map((res: Response) => res.json());
    }
}
