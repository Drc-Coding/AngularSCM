import {Injectable} from '@angular/core';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import {Observable} from 'rxjs';
import {HttpClient, HttpRequest, HttpEvent} from '@angular/common/http';
@Injectable()
export class drugpicService {
  handleError: any;
  private getFileuploadedURL = 'api/modifyuploadphoto';
  constructor(private http1: HttpClient) {}

  pushFileToStorage(file: File, id: number): Observable<HttpEvent<{}>> {
    let formdata: FormData = new FormData();
    formdata.append('file', file);
    const req = new HttpRequest('POST', this.getFileuploadedURL + '/' + id, formdata, {
      reportProgress: true,
      responseType: 'text'
    });
    return this.http1.request(req);
  }
}
