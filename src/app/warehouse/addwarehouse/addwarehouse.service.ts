import { Injectable } from "@angular/core";
import { Http, RequestOptions, Headers, Response } from "@angular/http";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';





@Injectable()
export class Addwarehouseservices {


    private getCountries = 'api/getCountry';
    private getState = 'api/getState';
    private getCitys = 'api/getCity';





    constructor(private http: Http) {


    }




    saveWarohuseDetails(serobj: string) {


        let header = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: header });

        return this.http.post(`api/savewarehouse`, serobj, options).map((response: Response) => response.json());






    }



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






}