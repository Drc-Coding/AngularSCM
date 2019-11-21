import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import { FormGroup } from "@angular/forms";
@Injectable()
export class drugviewService {
  handleError: any;
  private drugviewUrl = 'api/viewDruginfo';
  private deletecmpUrl = 'api/deleteDrugdetails';
  private getFileuploadedURL = 'api/getUploadfiles';

  private deviceurl='api/User/saveUserActivity';
  
  constructor(private http: Http) { }


  deletedrug(id: number) {
    return this.http.get(this.deletecmpUrl + '/' + id).map(response => response.json());
  }

  getdrugInfo(cid: any) {
    return this.http.get(this.drugviewUrl + '/' + cid).map(response => response.json());
  }


  //get Upload files 
  getImage(id: number): Observable<any> {
    return this.http.get(this.getFileuploadedURL + '/' + id)
      .map((response: Response) => {
        return response.json();
      })
  }


  
  devicedetails(data){

    let header = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: header});
  
    return this.http
      .post(this.deviceurl, data, options)  .map((res: Response) => res.json());  
}

}
