import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
@Injectable()

export class DoctorService {
  private getCountries = 'api/getCountry';
  private getState = 'api/getState';
  private getCitys = 'api/getCity';
  private countryCode = 'api/getCountrycode';
  private docURL = 'api/saveDoctor';
  private docupdateURL = 'api/updateDoctor';
  private viewUrl = 'api/viewDoctor';
  private editURL = 'api/editDoctorinfo';
  private editStateUrl = 'api/editDoctorstate';
  private editCcodeUrl = 'api/editDoctorcode';
  private editCityUrl = 'api/editDoctorcity';
  private deleteURL = 'api/deleteDoctor'
  // URL to web API
  private headers = new Headers({ 'Content-Type': 'application/json' });

  constructor(private http: Http) { }

  private handleError(error: any): Promise<any> {
    console.error('Error', error);
    return Promise.reject(error.message || error);
  }

  getcountry(): Promise<any> {
    return this.http.get(this.getCountries)
      .toPromise()
      .then(response => response.json() as any)
      .catch(this.handleError);
  }

  getStates(countryid: number) {
    return this.http.get(this.getState + '/' + countryid).map(response => response.json());
  }

  getCountrycode(countryid: number) {
    return this.http.get(this.countryCode + '/' + countryid).map(response => response.json());
  }

  getCity(sid: number) {
    return this.http.get(this.getCitys + '/' + sid).map(response => response.json());
  }
  createDoctor(data: String): any {
    return this.http.post(this.docURL, data, { headers: this.headers }).map(res => res.json())
      .catch(this.handleError);
  }

  updateDoctor(data: String): any {
    return this.http.post(this.docupdateURL, data, { headers: this.headers }).map(res => res.json())
      .catch(this.handleError);
  }

  viewDoctor(cid: any, bid: any) {
    return this.http.get(this.viewUrl + '/' + cid + '/' + bid).map(res => res.json());
  }

  editDoctorinfo(id: any) {
    return this.http.get(this.editURL + '/' + id).map(res => res.json());
  }
  getEditStates(id: number) {

    return this.http.get(this.editStateUrl + '/' + id).map(response => response.json());
  }

  getCcode(id: number) {
    return this.http.get(this.editCcodeUrl + '/' + id).map(response => response.json());
  }

  geteditCity(id: number) {
    return this.http.get(this.editCityUrl + '/' + id).map(response => response.json());
  }
  deleteDoctor(id: any) {
    return this.http.get(this.deleteURL + '/' + id).map(res => res.json());
  }
}
