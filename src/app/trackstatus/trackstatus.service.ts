import { Injectable } from "@angular/core";
import { Http,Headers } from "@angular/http";
@Injectable()
export class StatusService{
    private solead = 'api/soleadrecord';
    constructor(private http: Http) {}
    private handleError(error: any): Promise<any> {
        return Promise.reject(error.message || error);
      }
    viewSalesorderRecord(id: any) {
        return this.http.get('api/getsalesorderview' + '/' + id).map(res => res.json()).catch(this.handleError);
      }

      viewsalesorder(cid: any,bid: any,lcname: any,lrefid: any,id: any) {
        return this.http.get('api/salesstatus' + '/' + cid+ '/' + bid+ '/' + lcname+ '/' + lrefid+ '/' + id).map(res => res.json()).catch(this.handleError);
      }
      statustrack(cid: any,bid: any,lcname: any,lrefid: any,id: any) {
        return this.http.get('api/statustrack' + '/' + cid+ '/' + bid+ '/' + lcname+ '/' + lrefid+ '/' + id).map(res => res.json()).catch(this.handleError);
      }  
}