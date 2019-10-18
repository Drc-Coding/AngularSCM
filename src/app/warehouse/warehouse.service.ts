import { Addwarehouse } from './addwarehouse';
import { Injectable} from '@angular/core';
import {Headers, Http } from '@angular/http';
@Injectable()
export class Datawarehouse {
 private warehouseUrl = 'api/warehouseget';
 private warehouseupdateUrl = 'api/warehouseget';
 private warehousedeleteUrl = 'api/warehouseget';
 private statewUrl = 'api/statewarehouse';
private cityUrl = 'api/citywarehouse';
private compUrl = 'api/accesscompid';
  private headers = new Headers({'Content-Type': 'application/json'});
   constructor(private http: Http) {}
   create(addwarehouse: Addwarehouse): Promise<Addwarehouse> {
    return this.http
      .post('api/postwarehouse', JSON.stringify(addwarehouse), {headers : this.headers})
      .toPromise()
      .then(res => res.json() as Addwarehouse)
      .catch(this.handleError);
  }
// get warehouse
   getwarehouse(): Promise<Addwarehouse[]> {
    return this.http.get(this.warehouseUrl)
      .toPromise()
      .then(response => response.json() as Addwarehouse[])
      .catch(this.handleError);
  }

  // update
update(warehouse: Addwarehouse): Promise<Addwarehouse> {
     const url = `${this.warehouseupdateUrl}/${warehouse.warehouseid}`;
    return this.http
      .put(url , JSON.stringify(warehouse), {headers: this.headers})
      .toPromise()
      .then(() => warehouse)
      .catch(this.handleError);
  }
  // delete
   delete(id: number): Promise<void> {
    const url = `${this.warehousedeleteUrl}/${id}`;
    return this.http.delete(url, {headers: this.headers})
      .toPromise()
      .then(() => null)
      .catch(this.handleError);
  }

  // get country  
  getCountry(compid: number) {


    const url = `${this.compUrl}/${compid}`;
    return this.http.get(url).map(response => response.json());
}
  // get warehouse
  getCountrywarehouse(): Promise<any> {
    return this.http.get('api/countrywarehouse')
      .toPromise()
      .then(response => response.json() as any)
      .catch(this.handleError);
  }
// get statewarehouse
getstate(stateid: number) {


     const url = `${this.statewUrl}/${stateid}`;
     return this.http.get(url).map(response => response.json());
}
// get getcityw
getcityw(cityid: number) {


     const url = `${this.cityUrl}/${cityid}`;
     return this.http.get(url).map(response => response.json());
}
   private handleError(error: any): Promise<any> {
    console.error('Error', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}
