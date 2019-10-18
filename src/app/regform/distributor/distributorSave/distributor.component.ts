import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import { DistributorService } from './distributor.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { NotificationsComponent } from '../../../notifications/notifications.component';
import { dateFormatPipe } from '../../../notifications/notifications.datepipe';
import { AppComponent } from '../../../app.component';
@Component({
  selector: 'app-patientedit',
  templateUrl: './distributor.component.html',
  providers: [DistributorService, NotificationsComponent, dateFormatPipe]
})
export class DistributorComponent implements OnInit {
  
  emailPattern =  "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";
  
  closeResult: string;
  model: number[];
  disttypes = [];
  countries = [];
  states = [];
  cities = [];
  phcompany = [];
  dupi = [];
  i;
  selobj;
  registerForm: FormGroup;
  mulSettings = {};
  mulList = [];
  mulservList = [];
  mulservtype = [];
  multype = [];
  constructor(private formBuilder: FormBuilder, private router: Router, private dateformat: dateFormatPipe, private userService: DistributorService, private modalService: NgbModal, private notificationsComponent: NotificationsComponent) { }
  ngOnInit() {
    this.mulSettings = {
      maxHeight: 200,
      singleSelection: false,
      text: "Select Types",
      badgeShowLimit: 1,
      classes: "myclass custom-class"
    };
    var date = this.dateformat.transformnew(Date.now());
    this.selobj = { userid: AppComponent.userID, locrefid: AppComponent.locrefID1, locname: AppComponent.locRefName1, countryrefid: AppComponent.countryID, companyid: AppComponent.companyID, branchrefid: AppComponent.branchID,cdate: AppComponent.date };
    
    this.registerForm = this.formBuilder.group({

      indvdisttype: ['', []],
      distid: ['', []],
      distributorname: ['', [Validators.required, Validators.pattern("[a-zA-Z ]*"), CustomValidators.rangeLength([5, 20])]],
      dshortname: ['', [Validators.pattern("[a-zA-Z ]*")]],
      dcompnaytype: ['', []],
      dcompnaysubtype: ['', []],
      estdyear: ['', []],
      email: ['', [Validators.pattern(this.emailPattern)]],
      address1: ['', [Validators.required]],
      address2: ['', []],
      pincode: ['', []],
      country: ['', []],
      state: ['', []],
      city: ['', []],
      countrycode: ['', []],
      contactperson: ['', []],
      designationid: ['', []],
      mobileno: ['', [Validators.required]],
      phoneno: ['', []],
      panno: ['', []],
      tinno: ['', []],
      gstno: ['', []],
      ieccode: ['', []],
      termsandconditions: ['', []],
      dipaddress: ['', []],
      aadharno: ['', []],
      paymenttype: ['', []],
      creditdays: ['', []],
      bankname: ['', []],
      bankbranch: ['', []],
      accountnumber: ['', []],
      ifsccode: ['', []],
      swiftcode: ['', []],
      misccode: ['', []],
      ipaddress: ['', []],
      macid: ['', []],
      ostype: ['', []],
      browsertype: ['', []],
      rating: ['', []],
      comments: ['', []],
      createddate: ['', []],
      modifiedby: ['', []],
      modifieddate: ['', []],
      clientcdate: [this.selobj.cdate, []],
      createdby: [this.selobj.userid, []],
      locrefid: [this.selobj.locrefid, []],
      locname: [this.selobj.locname, []],
      countryrefid: [this.selobj.countryrefid, []],
      companyrefid: [this.selobj.companyid, []],
      branchrefid: [this.selobj.branchrefid, []],
      status: [0, []],
      distributortypeid: ['', []],
      phcompanyid: [, []],
      phcompany: [, []],
      leadtime: [, []]
    });
    
    var frmdata = { frmint1: '', frmstr1: '', createdby: '', locrefid: this.selobj.locrefid, locname: this.selobj.locname };
    this.userService.viewDistType(JSON.stringify(frmdata)).subscribe(data => { this.disttypes = data},
      errorCode => console.log(errorCode));
    this.userService.viewCountry(JSON.stringify(frmdata)).subscribe(data => this.countries = data,
      errorCode => console.log(errorCode));
    this.userService.viewDstPhCompanies(JSON.stringify(frmdata)).subscribe(data => { this.mulservList = data, this.viewPharmaCompany() },
      errorCode => console.log(errorCode));
    // $(document).ready(function () {
    //   setInterval("yourAjaxCall()", 1000);
    //   function yourAjaxCall() {
    //   }
    // });
  }
  onSubmit() {
  //  var answer = confirm("Save data?");
  
      this.registerForm.get('clientcdate').setValue(AppComponent.date);
      this.userService.saveDistributor(JSON.stringify(this.registerForm.value)).subscribe(data => { this.saveDistPhcompany(data), this.savevalid(data) },
        errorCode => console.log(errorCode));
        setTimeout(() => {
          this.router.navigate(['Distributor/ViewDistributor']);
        }, 2000);
  }
  viewPharmaCompany() {
    for (this.i = 0; this.i < this.mulservList.length; this.i++) {
      this.mulList.push({ id: this.mulservList[this.i][0], itemName: this.mulservList[this.i][1] });
    }
  }
  getadddistributortype(event, contentadddis) {
    if (event == 'addditributor') {
      this.open(contentadddis);
    }
    else {
      return;
    }
  }
  saveDistPhcompany(data: any) {
    this.multype = this.registerForm.get('phcompany').value;
    if (this.multype != null) {
      for (this.i = 0; this.i < this.multype.length; this.i++) {
        this.mulservtype.push({ frmint1: this.multype[this.i].id, locrefid: this.selobj.locrefid, locname: this.selobj.locname });
      }
    }
    if (data == 1) {
      this.userService.saveDistPhcompany(JSON.stringify(this.mulservtype)).subscribe(data => { this.savevalid(data) },
        errorCode => console.log(errorCode));
    }
    this.multype = [];
    this.mulservtype = [];
  }
  savevalid(data: any) {
    if (data == 1) {
      this.notificationsComponent.addToast({ title: 'Success', msg: 'Data  Saved  ', timeout: 5000, theme: 'default', position: 'top-right', type: 'success' });
    } else {
      this.notificationsComponent.addToast({ title: 'Error', msg: 'Data Not  saved  ', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
    }
  }
  saveIndvDistType1(c) {
    c('Close click')
    var frmdata = { frmint1: '', frmstr1: this.registerForm.get('indvdisttype').value, createdby: '', locrefid: this.selobj.locrefid, locname: this.selobj.locname };
    //var frmdata = { indvdisttype: this.registerForm.get('indvdisttype').value };
    var answer = confirm("Save data?");
    if (answer) {
      this.userService.saveIndvDistType1(JSON.stringify(frmdata)).subscribe(data => { c('Close click'),  this.userService.viewDistType(JSON.stringify(frmdata)).subscribe(data => { this.disttypes = data },
        errorCode => console.log(errorCode)); },
        errorCode => console.log(errorCode));
     
    }
  }
  viewState() {
    var frmdata = { frmint1: this.registerForm.get('country').value, frmstr1: '', createdby: '', locrefid: this.selobj.locrefid, locname: this.selobj.locname };
    this.userService.viewState(JSON.stringify(frmdata)).subscribe(data => this.states = data,
      errorCode => console.log(errorCode));
  }
  viewCity() {
    this.cities = [];
    var frmdata = { frmint1: this.registerForm.get('state').value, frmstr1: '', createdby: '', locrefid: this.selobj.locrefid, locname: this.selobj.locname };
    this.userService.viewCity(JSON.stringify(frmdata)).subscribe(data => this.cities = data,
      errorCode => console.log(errorCode));
  }
  open(contentadddis) {
    this.modalService.open(contentadddis).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
}