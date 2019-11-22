import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class salesGatePassEditService {


    options;
    private URL = 'api/indreq/';
    constructor(private http: Http) { }





    ngOnInit() {

        let header = new Headers({ 'Content-Type': 'application/json' });
        this.options = new RequestOptions({ headers: header });

    }








    saveIndentRequest(serobj: string) {


        let header = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: header });

        return this.http
            .post(this.URL + 'updateIndentRequest', serobj, options).map((res: Response) => res.json());
    }



    saveIndentProducts(serobj: string) {


        let header = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: header });

        return this.http
            .post(this.URL + 'updateIndentProducts', serobj, options).map((res: Response) => res.json());
    }















    viewshopinformation(serobj: string) {

        let header = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: header });


        return this.http.post(this.URL + 'viewshopinformation', serobj, options)
            .map((res: Response) => res.json());
    }

    viewWareHouse(serobj: string) {


        let header = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: header });


        return this.http.post(this.URL + 'viewWareHouse', serobj, options)
            .map((res: Response) => res.json());
    }

    viewHospital(serobj: string) {


        let header = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: header });


        return this.http.post(this.URL + 'viewHospital', serobj, options)
            .map((res: Response) => res.json());
    }



    viewServCustProducts(serobj: string) {


        let header = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: header });

        return this.http.post(this.URL + 'viewIrqCustProducts', serobj, options)
            .map((res: Response) => res.json());
    }


    viewIrqCustProduct(serobj: string) {


        let header = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: header });


        return this.http.post(this.URL + 'viewIrqCustProduct', serobj, options)
            .map((res: Response) => res.json());
    }


    viewIndentRequests(serobj: string) {

        let header = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: header });

        return this.http.post(this.URL + 'viewIndentRequests', serobj, options)
            .map((res: Response) => res.json());
    }


    getPurchaseOrderNO(serobj: string) {
        let header = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: header });

        return this.http.post(this.URL + 'indentgetpurchaseorderno', serobj, options)
            .map((res: Response) => res.json());
    }


    viewIndentRequest(serobj: string) {


        let header = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: header });


        return this.http.post(this.URL + 'viewIndentRequest', serobj, options)
            .map((res: Response) => res.json());
    }

    viewIndentProduct(serobj: string) {

        let header = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: header });


        return this.http.post(this.URL + 'viewIndentProduct', serobj, options)
            .map((res: Response) => res.json());
    }



    viewIndentRequestsAll(serobj: string) {

        let header = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: header });


        return this.http.post(this.URL + 'viewIndentRequestsAll', serobj, options)
            .map((res: Response) => res.json());
    }



    deleteIndReq(serobj: string) {

        let header = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: header });


        return this.http.post(this.URL + 'deleteIndReq', serobj, options)
            .map((res: Response) => res.json());
    }




}
