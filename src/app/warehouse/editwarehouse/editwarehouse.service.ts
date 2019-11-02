import { Injectable } from "@angular/core";
import { Http, RequestOptions, Headers, Response } from "@angular/http";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';





@Injectable()
export class Editwarehouseservices {


  private getCountries = 'api/getCountry';
  private getState = 'api/getState';
  private getCitys = 'api/getCity';

  private editStateUrl = 'api/geteditState1';
  private editCityUrl = 'api/geteditCity1';



  constructor(private http: Http) {


  }



  getEditStates(id: number) {
    //Get States 
    return this.http.get(this.editStateUrl + '/' + id).map(response => response.json());
  }

  geteditCity(id:number)
  {
    //Get City 
    return this.http.get(this.editCityUrl + '/' + id).map(response => response.json());
  }






  getwareEditvalues(id: number, compid: any, branid: any, locname: any, locrefid: any) {
    return this.http.get(`api/editvalware` + '/' + id + '/' + compid + '/' + branid + '/' + locname + '/' + locrefid).map(response => response.json());
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