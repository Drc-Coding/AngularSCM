import { Injectable } from "@angular/core";
import { Http, Response, RequestOptions , Headers} from '@angular/http';

@Injectable()
export class SalesorderleadService {
 private saleslead = 'api/salesOrderlead';
 private solead = 'api/soleadrecord';
 private salesdata = 'api/fetchsalesOrderlead';
 private fetchsolead = 'api/fetchsoleadrecord';
 private provalue = 'api/addsolproduct';
 private prolist = 'api/getPibrandlist';
 private deviceURL='api/User/saveUserActivity';

 
 private handleError(error: any): Promise<any> {
    return Promise.reject(error.message || error);
  }
    constructor(private http: Http) {}

    getsalesleadlist(cid: number, bid: number, loc: number, lrid: number){

        return this.http.get(this.saleslead+'/'+cid+'/'+bid+'/'+loc+'/'+lrid).map(response => response.json());

    }

    getsoleadrecord(id: number){

        return this.http.get(this.solead+'/'+id).map(response => response.json());

    }
    
    fetchsaleslead(cid: number, bid: number, loc: number, lrid: number,soid: number){

        return this.http.get(this.salesdata+'/'+cid+'/'+bid+'/'+loc+'/'+lrid+'/'+soid).map(response => response.json());

    }

    fetchsoleadrecord(id: number){
        return this.http.get(this.fetchsolead+'/'+id).map(response => response.json());

    }

    getprpductvalues(cid: number, bid: number, loc: number, lrid: number,soid: number){

        return this.http.get(this.provalue+'/'+cid+'/'+bid+'/'+loc+'/'+lrid+'/'+soid).map(response => response.json());

    }

    getProductlist(val: any, cid: any, bid: any, locrefid: any, locname: any) {

        return this.http.get(this.prolist + '/' + val + '/' + cid + '/' + bid + '/' + locrefid + '/' + locname).map(res => res.json());
      }

      savesaleslead(data: string){
        let head = new Headers({ 'Content-Type': 'application/json' });
        return this.http.post('api/saveSalesorder', data, { headers: head }).map(response => response.json());
      }

      saveSaleleadRecord(data: String) {
        let head = new Headers({ 'Content-Type': 'application/json' });
        return this.http.post('api/saveSalesorderRecord', data, { headers: head }).map(response => response.json());
      }

      patientList(id: any) {
        return this.http.get('api/sopatientlist' + '/' + id).map(res => res.json()).catch(this.handleError);
      }

      getsotype(id: any){
      
        return this.http.get('api/sotypelist' + '/' + id).map(response => response.json());
      }

      autoIcrement(cid: any, bid: any, locrefid: any, locname: any) {
        return this.http.get('api/salesOrderIncrement' + '/' + cid + '/' + bid + '/' + locrefid + '/' + locname).map(response => response.json());
      }


      viewdevicedetails(data){

        let header = new Headers({'Content-Type': 'application/json'});
        let options = new RequestOptions({headers: header});
  
        return this.http.post( this.deviceURL, data, options)
        .map((res: Response) => res.json());
      }
}