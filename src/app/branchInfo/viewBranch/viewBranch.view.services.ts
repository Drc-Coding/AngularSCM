import {Injectable} from '@angular/core';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import {Observable} from 'rxjs';
import {FormGroup} from "@angular/forms";
@Injectable()
export class branchviewService {
  handleError: any;
  private viewbranchUrl = 'api/viewBranchRecord';
  private deletebranchUrl = 'api/deletebranchRecord';
  constructor(private http: Http) {}

  viewBranch() {  
    return this.http.get(this.viewbranchUrl).map(response => response.json());
  }

  deleteBranch(id:number)
  {
    return this.http.get(this.deletebranchUrl+ '/' + id).map(response => response.json());; 
  }
  
}
