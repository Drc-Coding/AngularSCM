import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from "@angular/forms";
import { AppointmentService } from '../Appointment.services';
import { Router } from '@angular/router';
declare var $: any;
import { NotificationsComponent } from '../../notifications/notifications.component';
import * as moment from 'moment';
import { AppComponent } from '../../app.component';
@Component({
  selector: 'app-Appointment',
  templateUrl: './addAppointment.component.html',
  styleUrls: ['./addAppointment.component.css'],
})

export class addAppointmentComponent implements OnInit {
  @ViewChild('time') timmePic: any;
  appointmentForm: FormGroup;
  dataSource = [];
  physicianlist = [];
  patientlist = [];
  constructor(private appointmentService: AppointmentService, private fb: FormBuilder, private notificationsComponent: NotificationsComponent) {
    this.appointmentForm = this.fb.group({
      appointno: ['', []],
      appointfromtime: ['00:00', []],
      appointtotime: ['00:00', []],
      appointmentdate: ['', []],
      emergencylevel: ['', []],
      doctorrefid: ['', []],
      appointreason: ['', []],
      patientrefid: ['', []],
      appointduration: ['', []],
      visitinghours: ['', []],
      appointmentcharge: ['', []],
      appointviewfromtime: ['00:00', []],
      appointviewtotime: ['00:00', []],

      clientcdate: ['', []],
      createdby : ['', []],

      companyrefid: ['', []],
      branchrefid: ['', []],
      locrefid: ['', []],
      locname: ['', []],
    });
  }
  ngOnInit() {
    this.appointmentForm.get('doctorrefid').setValue('opt1');
    this.appointmentForm.get('patientrefid').setValue('opt1');
    this.appointmentForm.get('visitinghours').setValue('opt1');

    this.appointmentForm.get('companyrefid').setValue(AppComponent.companyID);
    this.appointmentForm.get('branchrefid').setValue(AppComponent.branchID);
    this.appointmentForm.get('locname').setValue(AppComponent.locrefID);
    if (AppComponent.shopID != 0) {
      this.appointmentForm.get('locrefid').setValue(AppComponent.shopID);
      this.appointmentService.getDoctor(AppComponent.companyID, AppComponent.branchID, AppComponent.shopID, AppComponent.locrefID).subscribe(data => this.physicianlist = data, err => {
        console.log('Error Occured On getDoctor()');
      });

      this.appointmentService.getPatient(AppComponent.companyID, AppComponent.branchID, AppComponent.shopID, AppComponent.locrefID).subscribe(data => { this.patientlist = data }, err => {
        console.log("Error Occured On getPatient()");
      });

      this.appointmentService.viewAppoint(AppComponent.companyID, AppComponent.branchID, AppComponent.shopID, AppComponent.locrefID).subscribe(data => { this.getData(data) }, err => {
        console.log('Error Occured On viewAppoint()');
      });

    }
    if (AppComponent.hospitalID != 0) {
      this.appointmentForm.get('locrefid').setValue(AppComponent.hospitalID);
      this.appointmentService.getDoctor(AppComponent.companyID, AppComponent.branchID, AppComponent.hospitalID, AppComponent.locrefID).subscribe(data => this.physicianlist = data, err => {
        console.log('Error Occured On getDoctor()');
      });
      this.appointmentService.getPatient(AppComponent.companyID, AppComponent.branchID, AppComponent.hospitalID, AppComponent.locrefID).subscribe(data => { this.patientlist = data }, err => {
        console.log("Error Occured On getPatient()");
      });
      this.appointmentService.viewAppoint(AppComponent.companyID, AppComponent.branchID, AppComponent.hospitalID, AppComponent.locrefID).subscribe(data => { this.getData(data) }, err => {
        console.log('Error Occured On viewAppoint()');
      });
    }
    if (AppComponent.warehouseID != 0) {
      this.appointmentForm.get('locrefid').setValue(AppComponent.warehouseID);
      this.appointmentService.getDoctor(AppComponent.companyID, AppComponent.branchID, AppComponent.warehouseID, AppComponent.locrefID).subscribe(data => this.physicianlist = data, err => {
        console.log('Error Occured On getDoctor()');
      });
      this.appointmentService.getPatient(AppComponent.companyID, AppComponent.branchID, AppComponent.warehouseID, AppComponent.locrefID).subscribe(data => { this.patientlist = data }, err => {
        console.log("Error Occured On getPatient()");
      });
      this.appointmentService.viewAppoint(AppComponent.companyID, AppComponent.branchID, AppComponent.warehouseID, AppComponent.locrefID).subscribe(data => { this.getData(data) }, err => {
        console.log('Error Occured On viewAppoint()');
      });
    }
  }
  timefrom1: any = { hour: '00', minute: '00' };
  timeto1: any = { hour: '00', minute: '00' };
  viewtimefrom: any = { hour: '00', minute: '00' };
  viewtimeto: any = { hour: '00', minute: '00' };
  meridian = true;
  timesfrom: any;
  timesto: any;
  timeviewfrom: any;
  timeviewto: any;
  checkfromTime() {
    if (this.timefrom1.minute == '0') {
      this.timesfrom = this.timefrom1.hour + ':' + '00' + ':' + '00';
    } else {
      this.timesfrom = this.timefrom1.hour + ':' + this.timefrom1.minute + ':' + '00';
    }
  }
  checktoTime() {
    if (this.timeto1.minute == '0') {
      this.timesto = this.timeto1.hour + ':' + '00' + ':' + '00';
    }
    else {
      this.timesto = this.timeto1.hour + ':' + this.timeto1.minute + ':' + '00';
    }
    let dat: any = this.appointmentForm.get('appointmentdate').value;
    var now = dat + ' ' + this.timesfrom;
    var then = dat + ' ' + this.timesto;

    var diff: any = moment.duration(moment(then).diff(moment(now)));
    var days = parseInt(diff.asDays());
    var hours = parseInt(diff.asHours());
    hours = hours - days * 24;
    var minutes = parseInt(diff.asMinutes());
    minutes = minutes - (days * 24 * 60 + hours * 60);
    this.appointmentForm.get('appointduration').setValue(hours + ':' + minutes);
  }
  viewTime() {
    this.timeviewfrom = this.viewtimefrom.hour + ':' + this.viewtimefrom.minute + ':' + '00';
    this.timeviewto = this.viewtimeto.hour + ':' + this.viewtimeto.minute + ':' + '00';
  }
  getSearch() {
    let date: any = this.appointmentForm.get('appointmentdate').value;
    let cid: any = this.appointmentForm.get('companyrefid').value;
    let bid: any = this.appointmentForm.get('branchrefid').value;
    let lorefif: any = this.appointmentForm.get('locrefid').value;
    let locrefname: any = this.appointmentForm.get('locname').value;
    if (date == '' || date == null) {
      this.notificationsComponent.addToast({ title: 'Error', msg: 'Required Appointment Date..', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
    } else {
      this.dataSource = [];
      this.appointmentService.searchAppoint(date, this.timeviewfrom, this.timeviewto, cid, bid, lorefif, locrefname).subscribe(data => { this.getData(data)}, err => {
        console.log('Error Occured On  searchAppoint()')
      })
    }

  }
  setVistinghours() {
    //alert('Search : ' + this.timeviewfrom + ' : ' + this.timeviewto);
    this.appointmentForm.get('visitinghours').setValue('');
  }

  public flag: boolean = false;
  onSubmit() {
    this.appointmentForm.get('appointfromtime').setValue(this.timesfrom);
    this.appointmentForm.get('appointtotime').setValue(this.timesto);
    this.appointmentForm.get('clientcdate').setValue(AppComponent.date);
    this.appointmentForm.get(' createdby').setValue(AppComponent.userID);

    this.flag = this.appointmentValidation();
    if (this.flag == true) {
      this.appointmentService.checkDocAvailability(this.appointmentForm.get('doctorrefid').value, this.appointmentForm.get('appointfromtime').value, this.appointmentForm.get('appointtotime').value)
        .subscribe(data => {
          if (data == true) {
            this.appointmentService.checkDocAppointment(this.appointmentForm.get('appointmentdate').value, this.appointmentForm.get('doctorrefid').value, this.appointmentForm.get('appointfromtime').value, this.appointmentForm.get('appointtotime').value)
              .subscribe(data => {
                if (data == true) {
                  this.save();
                } else {
                  this.notificationsComponent.addToast({ title: 'Error', msg: 'Appointment Already Fixed..', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
                }
              });
          } else {
            this.notificationsComponent.addToast({ title: 'Information Message', msg: 'Doctor Not Available..', timeout: 5000, theme: 'default', position: 'top-right', type: 'info' });
          }
        });
    }
  }
  save(): any {
    this.appointmentService.createAppointment(JSON.stringify(this.appointmentForm.value)).subscribe(data => {
      if (data == true) {
        this.notificationsComponent.addToast({ title: 'Sucess Message', msg: 'Appointment Saved Sucessfully..', timeout: 5000, theme: 'default', position: 'top-right', type: 'success' });
        this.appointmentForm.reset();
        this.physicianlist = [];
        this.patientlist = [];
        this.dataSource = [];
        this.ngOnInit();
      } else {
        this.notificationsComponent.addToast({ title: 'Error', msg: 'Appointment Not Saved..', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      }
    });
  }
  appointmentValidation(): boolean {
    if (this.appointmentForm.get('appointmentdate').value == '' || this.appointmentForm.get('appointmentdate').value == null) {
      this.notificationsComponent.addToast({ title: 'Error', msg: 'Required Appointment Date..', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      return false;
    }
    if (this.appointmentForm.get('doctorrefid').value == 'opt1' || this.appointmentForm.get('doctorrefid').value == null) {
      this.notificationsComponent.addToast({ title: 'Error', msg: 'Required Physician Name..', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      return false;
    }
    if (this.appointmentForm.get('appointreason').value == '' || this.appointmentForm.get('appointreason').value == null) {
      this.notificationsComponent.addToast({ title: 'Error', msg: 'Required Appointment reason..', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      return false;
    }
    if (this.appointmentForm.get('patientrefid').value == 'opt1' || this.appointmentForm.get('patientrefid').value == null) {
      this.notificationsComponent.addToast({ title: 'Error', msg: 'Required Patient Name..', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      return false;
    }
    if (this.appointmentForm.get('appointfromtime').value == '00:00' || this.appointmentForm.get('appointfromtime').value == null || this.appointmentForm.get('appointfromtime').value == '') {
      this.notificationsComponent.addToast({ title: 'Error', msg: 'Required From-Time..', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      return false;
    }
    if (this.appointmentForm.get('appointtotime').value == '00:00' || this.appointmentForm.get('appointtotime').value == null || this.appointmentForm.get('appointtotime').value == '') {
      this.notificationsComponent.addToast({ title: 'Error', msg: 'Required To-Time..', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      return false;
    }
    if (true) {
      this.appointmentService.maxAppoint(this.appointmentForm.get('appointmentdate').value, this.appointmentForm.get('doctorrefid').value).subscribe(data => {
        this.appointmentForm.get('appointno').setValue(data)
      });
    }
    return true;
  }

  inc = 0;
  getData(data: any) {
    if (data !== null || data !== undefined || data == '') {
      for (let k = 0; k < data.length; k++) {
        this.dataSource.push(this.setDatasource(
          data[k][0],
          data[k][1],
          data[k][2],
          data[k][3],

        ));
        this.inc += 1;
      }
    }
  }
  setDatasource(d0: any, d1: any, d2: any, d3: any) {
    return {
      ID: this.inc,
      id: this.inc + 1,
      appointno: d0,
      patientinfo: d1,
      appointfrom: d2,
      appointto: d3,
    }
  }
} 