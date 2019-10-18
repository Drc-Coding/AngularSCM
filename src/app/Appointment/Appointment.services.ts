import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, } from '@angular/http';
import { Observable } from 'rxjs';
@Injectable()
export class AppointmentService {
  private docUrl = 'api/getphysician';
  private paURl = 'api/getAppointpatientlist';
  private saveUrl = 'api/saveAppointment';
  private chURL = 'api/doctorAvailability';
  private apointURL = 'api/checkdoctorAppointment';
  private viewURL = 'api/viewdoctorAppointment';
  private searchURL = 'api/searchdoctorAppointment';
  headers = new Headers({ 'Content-Type': 'application/json' });
  constructor(private http: Http) { }

  getDoctor(cid: any, bid: any, lref: any, lname: any) {
    return this.http.get(this.docUrl + '/' + cid + '/' + bid + '/' + lref + '/' + lname).map(res => res.json()).catch(this.handleError);
  }
  getPatient(cid: any, bid: any, lref: any, lname: any) {
    return this.http.get(this.paURl + '/' + cid + '/' + bid + '/' + lref + '/' + lname).map(res => res.json()).catch(this.handleError);
  }
  createAppointment(data: String) {
    return this.http.post(this.saveUrl, data, { headers: this.headers }).map(res => res.json()).catch(this.handleError);
  }

  checkDocAvailability(did: any, fromTime: any, toTime: any) {
    return this.http.get(this.chURL + '/' + did + '/' + fromTime + '/' + toTime).map(res => res.json());
  }

  checkDocAppointment(Ddate: any, did: any, fromTime: any, toTime: any) {
    return this.http.get(this.apointURL + '/' + Ddate + '/' + did + '/' + fromTime + '/' + toTime).map(res => res.json());
  }

  viewAppoint(cid: any, bid: any, lref: any, lname: any) {
    return this.http.get(this.viewURL + '/' + cid + '/' + bid + '/' + lref + '/' + lname).map(res => res.json()).catch(this.handleError);
  }
  searchAppoint(date: any, frtime: any, totime: any, cid: any, bid: any, lref: any, lname: any) {
    return this.http.get(this.searchURL + '/' + date + '/' + frtime + '/' + totime + '/' + cid + '/' + bid + '/' + lref + '/' + lname).map(res => res.json()).catch(this.handleError);
  }
  maxAppoint(date: any, id: any) {
    return this.http.get('api/maxAppointnumber' + '/' + date + '/' + id).map(res => res.text()).catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    return Promise.reject(error.message || error);
  }
  //**********MANAGE APPOINTMENT************/
  searchDoctor(value: any, cid: any, bid: any, lref: any, lname: any) {
    return this.http.get('api/searchAppointdoctor' + '/' + value + '/' + cid + '/' + bid + '/' + lref + '/' + lname).map(res => res.json()).catch(this.handleError);
  }
  searchPatients(value: any, cid: any, bid: any, lref: any, lname: any) {
    return this.http.get('api/searchAppointpatient' + '/' + value + '/' + cid + '/' + bid + '/' + lref + '/' + lname).map(res => res.json()).catch(this.handleError);
  }

  doctorWiseAppointment(docID: any) {
    return this.http.get('api/doctorWiseappointment' + '/' + docID).map(res => res.json()).catch(this.handleError);
  }
  patientWiseAppointment(patID: any) {
    return this.http.get('api/patientWiseappointment' + '/' + patID).map(res => res.json()).catch(this.handleError);
  }

  dateWiseAppointment(date: any, cid: any, bid: any, lref: any, lname: any) {
    return this.http.get('api/dateWiseappointment' + '/' + date + '/' + cid + '/' + bid + '/' + lref + '/' + lname).map(res => res.json()).catch(this.handleError);
  }

  manageAppoint(cid: any, bid: any, lref: any, lname: any) {
    return this.http.get('api/listManageappoint' + '/' + cid + '/' + bid + '/' + lref + '/' + lname).map(res => res.json()).catch(this.handleError);
  }

  editAppointment(id: any) {
    return this.http.get('api/geteditAppointment' + '/' + id).map(res => res.json()).catch(this.handleError);
  }
  //edit
  editFromTime(id: any) {
    return this.http.get('api/geteditFromtime' + '/' + id).map(res => res.text()).catch(this.handleError);
  }
}
