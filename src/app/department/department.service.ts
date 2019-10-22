import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
@Injectable()

export class DepartmentService {
  private department = 'api/dept/CreatedeptRec';
  private existURL = 'api/isExistdept';
  // URL to web API
  private headers = new Headers({ 'Content-Type': 'application/json' });

  constructor(private http: Http) { }

  private handleError(error: any): Promise<any> {
    console.error('Error', error);
    return Promise.reject(error.message || error);
  }

  isExist(name: any) {
    return this.http.get(this.existURL +  name).map(res => res.json());
  }

  savedept(data: String) {
    
    return this.http.post(this.department, data, { headers: this.headers }).map(res => res.json())
      .catch(this.handleError);
    
  }
 
}
