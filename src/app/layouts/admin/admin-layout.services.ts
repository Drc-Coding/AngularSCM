import {Injectable} from '@angular/core';
//import {Http} from '@angular/http';
import {Observable} from 'rxjs';
import {Http, Response, Headers, RequestOptions} from '@angular/http';

@Injectable()
export class adminService{
    private shopinfo= 'api/getshopinfo';
    private userinfo= 'api/empprofileinfo';
    private imagereceive='api/getsendImage';
    private updateURL='api/updateEmployeeProfile';

    constructor(private http: Http) {}

    public getIPAddress()
    {
        //Get IP Address
      return this.http.get("http://api.ipify.org/?format=json").map(response => response.json());
      
    }

    getShopName(shopid: number) {
        //Get getDrugList
        return this.http.get(this.shopinfo+'/'+shopid).map(response => response.json());
       }

    getuserinfo(id: number) {
        //Get user info
        return this.http.get(this.userinfo+'/'+id).map(response => response.json());
       }
    
       receiveimage(id: number) {
        //Get userimage
        return this.http.get(this.imagereceive+'/'+id).map(response => response.json());
       }

       updateinfo(data){

        let header = new Headers({'Content-Type': 'application/json'});
        let options = new RequestOptions({headers: header});
         return this.http.post(this.updateURL, data, options).map((res: Response) =>
         {return {"res":res.json()}})
         
       }

}