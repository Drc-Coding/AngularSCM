import { Injectable } from "@angular/core";
import { RequestOptions, Response, Headers, Http } from "@angular/http";
import 'rxjs/add/operator/map';



@Injectable()
export class addShipmentServices {

    private URL = 'api/shi/';
    private productinfoUrl = 'api/getproductinfo';

    private getCountries = 'api/getCountry';
    private getState = 'api/getState';
    private getCitys = 'api/getCity';

    private deviceurl='api/User/saveUserActivity';

    options;


    constructor(private http: Http) { }


    getCountry() {
        //Get Coutries 
        return this.http.get(this.getCountries).map(response => response.json());
    }


    getStates(countryid: number) {
        //Get States 
        return this.http.get(this.getState + '/' + countryid).map(response => response.json());
      }


    getCity(sid: number) {
        //Get City 
        return this.http.get(this.getCitys + '/' + sid).map(response => response.json());
      }



    saveShipping(data: any) {
        alert(data)

        let header = new Headers({ 'Content-Type': 'application/json' });

        let options = new RequestOptions({ headers: header });

        return this.http.post(this.URL + `saveShipping`, data, options).map(res => res.json())

    }



    saveShippingdetail(data: any) {


        let header = new Headers({ 'Content-Type': 'application/json' });

        let options = new RequestOptions({ headers: header });

        return this.http.post(this.URL + `saveShippingdetail`, data, options).map(res => res.json());


    }


    getPackingno(cid: any, bid: any, locn: any, locreid: any) {


        return this.http.get(this.URL + `getPackingno` + '/' + cid + '/' + bid + '/' + locn + '/' + locreid).map((res: Response) => res.json());

    }


    getPackDetails(obj: any) {

        let header = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: header });


        return this.http.post(this.URL + `viewPack`, obj, options).map((res: Response) => res.json());

    }


    gettablevalue(obj: any) {

        let header = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: header });


        return this.http.post(this.URL + `gettablevalue`, obj, options).map((res: Response) => res.json());

    }
    
    adddevicedetails(data){

        let header = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: header});
  
    return this.http
      .post(this.deviceurl, data, options)  .map((res: Response) => res.json());  

    }





}





