import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from "@angular/forms";
import { AppointmentService } from '../Appointment.services';
import { Router } from '@angular/router';
import { NotificationsComponent } from '../../notifications/notifications.component';
import * as moment from 'moment';
import { AppComponent } from '../../app.component';
@Component({
  selector: 'app-manageAppointment',
  templateUrl: './manageAppointment.component.html',
  styleUrls: ['./manageAppointment.component.css'],
})

export class manageAppointmentComponent implements OnInit {
  @ViewChild('time') timmePic: any;
  appointmentForm: FormGroup;
  dataSource = [];
  physicianlist = [];
  searchDoctors = [];
  searchPatient = [];
  patientlist = [];
  constructor(private appointmentService: AppointmentService, private fb: FormBuilder, private notificationsComponent: NotificationsComponent) {
    this.appointmentForm = this.fb.group({
      id: ['', []],
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
      clientcdate: ['', []],
      companyrefid: ['', []],
      branchrefid: ['', []],
      locrefid: ['', []],
      locname: ['', []],
      //Refrence//
      radioselect: ['', []],
      docid: ['', []],
      patientid: ['', []],
      serdate: ['', []],
    });
  }
  ngOnInit() {
    this.appointmentForm.get('doctorrefid').setValue('opt1');
    this.appointmentForm.get('patientrefid').setValue('opt1');
    this.appointmentForm.get('visitinghours').setValue('opt1');
    this.appointmentForm.get('locname').setValue(AppComponent.locrefID);
    this.appointmentForm.get('companyrefid').setValue(AppComponent.companyID);
    this.appointmentForm.get('branchrefid').setValue(AppComponent.branchID);    
    if (AppComponent.shopID != 0) {
      this.appointmentForm.get('locrefid').setValue(AppComponent.shopID);
      this.appointmentService.getDoctor(AppComponent.companyID, AppComponent.branchID, AppComponent.shopID, AppComponent.locrefID).subscribe(data => this.physicianlist = data, err => {
        console.log('Error Occured On getDoctor()');
      });


      this.appointmentService.getPatient(AppComponent.companyID, AppComponent.branchID, AppComponent.shopID, AppComponent.locrefID).subscribe(data => { this.patientlist = data }, err => {
        console.log("Error Occured On getPatient()");
      });

      this.appointmentService.manageAppoint(AppComponent.companyID, AppComponent.branchID, AppComponent.shopID, AppComponent.locrefID).subscribe(data => { this.getData(data) },
        err => {
          console.log("Error Occured On manageAppoint()")
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

      this.appointmentService.manageAppoint(AppComponent.companyID, AppComponent.branchID, AppComponent.hospitalID, AppComponent.locrefID).subscribe(data => { this.getData(data) },
        err => {
          console.log("Error Occured On manageAppoint()")
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

      this.appointmentService.manageAppoint(AppComponent.companyID, AppComponent.branchID, AppComponent.warehouseID, AppComponent.locrefID).subscribe(data => { this.getData(data) },
        err => {
          console.log("Error Occured On manageAppoint()")
        });
    }
  }
  timefrom1: any = { hour: '00', minute: '00' };
  timeto1: any = { hour: '00', minute: '00' };
  meridian = true;
  timesfrom: any;
  timesto: any;
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

  public flag: boolean = false;
  onSubmit() {
    this.appointmentForm.get('clientcdate').setValue(AppComponent.date);
    if (this.timesfrom !== undefined || this.timesto !== undefined) {
      this.appointmentForm.get('appointfromtime').setValue(this.timesfrom);
      this.appointmentForm.get('appointtotime').setValue(this.timesto);
    }
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
  save() {
    this.appointmentService.createAppointment(JSON.stringify(this.appointmentForm.value)).subscribe(data => {
      if (data == true) {
        this.notificationsComponent.addToast({ title: 'Sucess Message', msg: 'Appointment Updated Sucessfully..', timeout: 5000, theme: 'default', position: 'top-right', type: 'success' });
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
    return true;
  }
  searchDoctor(value: string) {
    let locrefid: any = this.appointmentForm.get('locrefid').value;
    let locrefname: any = this.appointmentForm.get('locname').value;
    this.appointmentService.searchDoctor(value, AppComponent.companyID, AppComponent.branchID, locrefid, locrefname).subscribe(data => {
      this.searchDoctors = [];
      for (let i = 0; i < data.length; i++) {
        this.searchDoctors.push({ value: data[i][0], label: data[i][1] });
      }
    }, err => {
      console.log('Error Occured On searchDoctor()');
    });

  }
  searchPatients(value: string) {
    let locrefid: any = this.appointmentForm.get('locrefid').value;
    let locrefname: any = this.appointmentForm.get('locname').value;
    this.appointmentService.searchPatients(value, AppComponent.companyID, AppComponent.branchID, locrefid, locrefname).subscribe(data => {
      this.searchPatient = [];
      for (let i = 0; i < data.length; i++) {
        this.searchPatient.push({ value: data[i][0], label: data[i][1] });
      }
    }, err => {
      console.log('Error Occured On searchPatients()');
    });
  }
  public ins: number = 0;
  getSearch() {
    this.ins += 1;
    let radioSelect: any = this.appointmentForm.get('radioselect').value;
    let doc: any = this.appointmentForm.get('docid').value;
    let pat: any = this.appointmentForm.get('patientid').value;
    let dat: any = this.appointmentForm.get('serdate').value;
    let locrefid: any = this.appointmentForm.get('locrefid').value;
    let locrefname: any = this.appointmentForm.get('locname').value;
    if (radioSelect == '' || radioSelect == null) {
      this.notificationsComponent.addToast({ title: 'Error', msg: 'Please Select One', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
    }
    if (radioSelect == 0) {
      if (doc == '' || doc == null) {
        this.notificationsComponent.addToast({ title: 'Error', msg: 'Please Select Doctor Name', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      } else {
        this.dataSource = [];
        this.appointmentService.doctorWiseAppointment(doc).subscribe(data => { this.getData(data) },
          err => {
            console.log('Error occured on doctorWiseAppointment');
          });
      }
    }
    if (radioSelect == 1) {
      if (pat == '' || pat == null) {
        this.notificationsComponent.addToast({ title: 'Error', msg: 'Please Select Patient Name', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      } else {
        this.dataSource = [];
        this.appointmentService.patientWiseAppointment(pat).subscribe(data => { this.getData(data) },
          err => {
            console.log('Error occured on patientWiseAppointment');
          });
      }
    }

    if (radioSelect == 2) {
      if (dat == '' || dat == null) {
        this.notificationsComponent.addToast({ title: 'Error', msg: 'Please Select Appoint-Date', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      } else {
        this.dataSource = [];
        this.appointmentService.dateWiseAppointment(dat, AppComponent.companyID, AppComponent.branchID, locrefid, locrefname).subscribe(data => { this.getData(data) },
          err => {
            console.log('Error occured on dateWiseAppointment');
          });
      }
    }

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
          data[k][4],
          data[k][5],
          data[k][6],
          data[k][7],
          data[k][8],
          data[k][9],
          data[k][10],
        ));
        this.inc += 1;
      }
    }
  }
  setDatasource(d1: any, d2: any, d3: any, d4: any, d5: any, d6: any, d7: any, d8: any, d9: any, d10: any, d11: any) {
    return {
      ID: this.inc,
      id: this.inc + 1,
      appointno: d1,
      appointmentdate: d2,
      patientinfo: d3,
      doctorname: d4,
      appointfrom: d5,
      appointto: d6,
      appointid: d7,
      edit: 'Edit'
    }
  }

  getClick(event) {
    let rows: number = event.rowIndex;
    let setData = this.dataSource;
    for (let k = 0; k < setData.length; k++) {
      let i1: any = setData[k].ID;
      if (rows == i1) {
        this.appointmentService.editAppointment(setData[k].appointid).subscribe(data => {
          this.appointmentForm.patchValue(data);
          this.appointmentService.editFromTime(setData[k].appointid).subscribe(data => {
            this.appointmentForm.get('appointfromtime').setValue(data.slice(0, 5));
          },
            err => {
              console.log('Error Occured On editFromTime()');
            })
        });
      }
    }
  }
} 