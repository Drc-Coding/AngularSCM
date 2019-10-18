import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import { HttpEventType } from '@angular/common/http';
@Injectable()
export class TaxsettingsService {
  

    private getcountry = 'api/getCountry';
    private getCompany = 'api/getcompanytax';
    private getBranch = 'api/getbranchtax';
    private getShopname = 'api/getshoptax';
    private getWarehouse = 'api/getwarehousetax';
    private getHospital = 'api/gethospitaltax';
    private saveGstflag = 'api/savetaxationtype';//not in use
    private saveTaxsetting = 'api/savetax';//taxtype
    private save='api/savetaxvalue';//taxpercentage
    //private saveTaxsetting='api/savetaxsetting';
    private gettaxtype='api/gettaxtypetsetting';

    constructor(private http: Http) { }

    getCountry() {
        //Get Coutries 
        return this.http.get(this.getcountry).map(response => response.json());
    }
    getcompany(countryid: number) {
        //Get Company 
        return this.http.get(this.getCompany + '/' + countryid).map(response => response.json());

    }

    gettaxtypes(companyid: number): any {
        return this.http.get(this.gettaxtype + '/' + companyid).map(response => response.json());
    }

    getbranch(companyid: number) {
        return this.http.get(this.getBranch + '/' + companyid).map(response => response.json());
    }
    getshopname(branchid: number) {
        return this.http.get(this.getShopname + '/' + branchid).map(response => response.json());
    }
    getwarehouse(branchid: number) {
        return this.http.get(this.getWarehouse + '/' + branchid).map(response => response.json());
    }
    gethospital(branchid: number) {
        return this.http.get(this.getHospital + '/' + branchid).map(response => response.json());
    }

    getrequest() {

        alert(HttpEventType)
    }

    savegstflag(data: String) {
        alert('Inside Services savegstflag')
        alert(data)
        let header = new Headers({ 'Content-Type': 'application/json' });
        return this.http.post(this.saveGstflag, data, { headers: header }).map(response => response.json()).catch(this.handleError);
    }
//addtaxtype
    savetaxtype(data: String) {
        alert('Inside Services savetax')
        alert(data)
        let header = new Headers({ 'Content-Type': 'application/json' });
        return this.http.post(this.saveTaxsetting, data, { headers: header }).map(response => response.json()).catch(this.handleError);
    }
//addtaxsettings
    savetax(data: string): any {
        alert('Inside Services savetax')
        alert(data)
        let header = new Headers({ 'Content-Type': 'application/json' });
       // return this.http.post(this.save, data, { headers: header }).map(response => response.json()).catch(this.handleError);

        return this.http.post(this.save, data, { headers: header }).map((res: Response) => {
            return { "res": res.json() };
      });
    }


    private handleError(error: any): Promise<any> {
        console.error('Error', error);
        return Promise.reject(error.message || error);
    }
}