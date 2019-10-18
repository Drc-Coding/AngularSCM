import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
@Injectable()
export class DataHospitalform {
  private countryURL = 'api/getCountry';
  private getState = 'api/getState';
  private getCitys = 'api/getCity';
  private countryCode = 'api/getCountrycode';
  private saveHosp = 'api/saveHospinfo';
  private updateHosp = 'api/updateHospinfo';
  private specURL = 'api/getspeciality';
  private gethospitalUrl = 'api/viewHospitaldetails';
  private editURl = 'api/edithospitalinfo';
  private editStateUrl = 'api/gethospeditState';
  private editCityUrl = 'api/gethospeditCity';
  private editCcodeUrl = 'api/gethospeditCcode';
  private deleteUrl = 'api/deleteHospitaldetails';
  private headers = new Headers({ 'Content-Type': 'application/json' });

  constructor(private http: Http) { }
  private handleError(error: any): Promise<any> {
    return Promise.reject(error.message || error);
  }

  getCountry() {
    return this.http.get(this.countryURL).map(response => response.json());
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

  createHospital(data: String) {
      return this.http.post(this.saveHosp, data, { headers: this.headers }).map(res => res.json());
  }
  getSpeciality() {
    return this.http.get(this.specURL).map(response => response.json());
  }

  gethospitals(cid: any, bid: any): Promise<any> {
    return this.http.get(this.gethospitalUrl + '/' + cid + '/' + bid)
      .toPromise()
      .then(response => response.json() as any)
      .catch(this.handleError);
  }

  getEdithospital(id: number) {
    return this.http.get(this.editURl + '/' + id).map(res => res.json()).catch(this.handleError);
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

  updateHospital(data: String) {
    return this.http.post(this.updateHosp, data, { headers: this.headers }).map(res => res.json()).catch(this.handleError);
  }

  deleteHospital(id: number) {
    return this.http.get(this.deleteUrl + '/' + id).map(res => res.json()).catch(this.handleError);
  }
}
