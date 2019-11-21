import { Injectable } from "@angular/core";
import { Http, Headers,Response, RequestOptions } from "@angular/http";

@Injectable()

export class packingService {
  
  constructor(private http: Http) { }

  private deviceurl='api/User/saveUserActivity';


  getpicklist(cid: number, bid: number, loc: number, lrid: number) {
    return this.http.get('api/getpicklist' + '/' + cid + '/' + bid + '/' + loc + '/' + lrid).map(response => response.json());
  }

  getpackingdata(cid: number, bid: number, loc: number, lrid: number, pickid: number) {
    return this.http.get('api/packingdatas' + '/' + cid + '/' + bid + '/' + loc + '/' + lrid + '/' + pickid).map(response => response.json());
  }

  getpackingfielddata(cid: number, bid: number, loc: number, lrid: number, pickid: number) {
    return this.http.get('api/packingfielddatas' + '/' + cid + '/' + bid + '/' + loc + '/' + lrid + '/' + pickid).map(response => response.json());
  }

  getemployeelist(cid: number, bid: number, loc: number, lrid: number) {
    return this.http.get('api/getPlEmpdetails' + '/' + cid + '/' + bid + '/' + loc + '/' + lrid).map(response => response.json());
  }
  savePackageno(data: String) {
    let head = new Headers({ 'Content-Type': 'application/json' });
    return this.http.post('api/savepackageno', data, { headers: head }).map(response => response.json())
  }
  savePacking(data: String) {
    let head = new Headers({ 'Content-Type': 'application/json' });
    return this.http.post('api/savepacking', data, { headers: head }).map(response => response.json())
  }
  savePackingprod(data: String) {
    let head = new Headers({ 'Content-Type': 'application/json' });
    return this.http.post('api/savepackingproducts', data, { headers: head }).map(response => response.json())
  }

  getpacklist(cid: number, bid: number, loc: number, lrid: number) {
    return this.http.get('api/getpacklist' + '/' + cid + '/' + bid + '/' + loc + '/' + lrid).map(response => response.json());
  }

  getpackingno(cid: number, bid: number, loc: number, lrid: number) {
    return this.http.get('api/getpackingno' + '/' + cid + '/' + bid + '/' + loc + '/' + lrid).map(response => response.json());
  }

  getcheckpackingdata(cid: number, bid: number, loc: number, lrid: number, pickid: number) {
    return this.http.get('api/checkpackingdatas' + '/' + cid + '/' + bid + '/' + loc + '/' + lrid + '/' + pickid).map(response => response.json());
  }

  getcheckpackingfielddata(cid: number, bid: number, loc: number, lrid: number, pickid: number) {
    return this.http.get('api/checkpackingfielddatas' + '/' + cid + '/' + bid + '/' + loc + '/' + lrid + '/' + pickid).map(response => response.json());
  }

  checksavePacking(data: String) {
    let head = new Headers({ 'Content-Type': 'application/json' });
    return this.http.post('api/checksavepacking', data, { headers: head }).map(response => response.json())
  }
  checksavePackingprod(data: String) {
    let head = new Headers({ 'Content-Type': 'application/json' });
    return this.http.post('api/checksavepackingproducts', data, { headers: head }).map(response => response.json())
  }

  getapprovepackingno(cid: number, bid: number, loc: number, lrid: number) {
    return this.http.get('api/getapprovepackingno' + '/' + cid + '/' + bid + '/' + loc + '/' + lrid).map(response => response.json());
  }


  devicedetails(data){

    let header = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: header});

    return this.http.post( this.deviceurl, data, options)
    .map((res: Response) => res.json());

  }
}