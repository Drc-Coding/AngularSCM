import { Injectable } from '@angular/core';
import { Headers, Http,Response } from '@angular/http';
import { HttpEventType } from '@angular/common/http';

@Injectable()
export class CurrencySettingService {
 
    private getcountryname = 'api/getCountryname';
    private getcurrencysymbol = 'api/getcurrencysymbol';
    private getcountry = 'api/getCountry';
    private getCurrencysy = 'api/getCurrency';
    private saveCurrency = 'api/saveCurrencyset';

    constructor(private http: Http) { }


    getCountryname(cn: any, ) {
        return this.http.get(this.getcountryname + '/' + cn).map(response => response.json());
    }

    getCountry() {
        //Get Coutries 
        return this.http.get(this.getcountry).map(response => response.json());
    }
    getCurreny(countryrefid:number){
        return this.http.get(this.getCurrencysy + '/' + countryrefid).map(response => response.json());
    }
    savecurrency(data: string): any {
        let header = new Headers({ 'Content-Type': 'application/json' });

        return this.http.post(this.saveCurrency, data, { headers: header }).map((res: Response) => {
          return { "res": res.json() };
        });
      }
}