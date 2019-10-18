import { Component, OnInit } from '@angular/core';
import { salespickingService } from '../salespicking.service';
import { NotificationsComponent } from '../../notifications/notifications.component';
import { Router } from '@angular/router';
import { AppComponent } from 'app/app.component';
import { FormBuilder, FormArray, Validators } from '@angular/forms';
@Component({
  selector: 'app-pickedchecking',
  templateUrl: './pickedchecking.component.html',
  styleUrls: ['./pickedchecking.component.css'],
  providers: [NotificationsComponent, salespickingService,]
})
export class PickedcheckingComponent implements OnInit {
  pickedcheckingForm: any;
  picklist: any;
  CheckingEmployee: any;
  constructor(private pickedchecking: salespickingService, private Notification: NotificationsComponent, private router: Router,
    private appcomponent: AppComponent, private formbuilder: FormBuilder) {
    this.pickedcheckingForm = this.formbuilder.group({
      picklistid: ['', [Validators.required]],
      createdBy: ['', []],
      modifiedby: ['', []],
      companyrefid: ['', []],
      branchrefid: ['', []],
      locname: ['', []],
      locrefid: ['', []],
      calcflag: ['', []],
      emprefid: ['', [Validators.required]],
      picktypeno: ['', []],
      picktyperefid: ['', []],
      countryrefid: ['', []],
      returnid: ['', []],
      qrcoderefid: ['', []],
      barcoderefid: ['', []],
      putawayrefid: ['', []],
      sotypeid: ['', []],
      salesorderrefid: ['', []],
      salesinvoiceno: ['', []],
      sinvoice: ['', []],
      sotypename: ['', []],
      custrefid: ['', []],
      customercode: ['', []],
      customername: ['', []],
      custemmobno: ['', []],
      totalprod: ['', []],
      orderdate: ['', []],
      sorefno: ['', []],
      status: ['1', []],
      clientmdate: [AppComponent.date, []],
      SOrederproduct: this.formbuilder.array([]),

    });
  }
  ngOnInit() {

    this.pickedcheckingForm.get('companyrefid').setValue(AppComponent.companyID);
    this.pickedcheckingForm.get('branchrefid').setValue(AppComponent.branchID);
    this.pickedcheckingForm.get('locname').setValue(AppComponent.locRefName1);
    this.pickedcheckingForm.get('locrefid').setValue(AppComponent.locrefID1);
    // this.salespickingForm.get('salesorderid').setValue(this.soid);

    //get Pick id
    this.pickedchecking.getPickingID(AppComponent.companyID, AppComponent.branchID, AppComponent.locRefName1, AppComponent.locrefID1).subscribe(data => { this.picklist = data },


      err => {
        console.log('Error Occured ');
      });

    //get Employee Details
    this.pickedchecking.getEmployedata(AppComponent.companyID, AppComponent.branchID, AppComponent.locRefName1, AppComponent.locrefID1).subscribe(data => { this.CheckingEmployee = data },
      err => {
        console.log('Error Occured');
      });



  }
  //Get Pick Grid Details
  getpidata() {
    this.pickedchecking.getpickingdata(AppComponent.companyID, AppComponent.branchID, AppComponent.locRefName1, AppComponent.locrefID1, this.pickedcheckingForm.get('picklistid').value).subscribe(data => {
      this.pickdetails(data)
    },
      err => {
        console.log('Error Occured');
      });
  }


  //get Pick Products     

  getsiprod() {

    this.pickedchecking.GetPickingprod(AppComponent.companyID, AppComponent.branchID, AppComponent.locRefName1, AppComponent.locrefID1, this.pickedcheckingForm.get('picklistid').value).subscribe(data => {
      this.pickproduct(data)
    },
      err => {
        console.log('Error Occured');

      });
  }
  //Get Sales Order Grid Details
  i;
  pickdetails(data: any) {
    if (data !== undefined || data !== null) {
      for (this.i = 0; this.i < data.length; this.i++) {
        this.pickedcheckingForm.patchValue(this.fetchsodata(
          data[this.i][0],
          data[this.i][1],
          data[this.i][2],
          data[this.i][3],
          data[this.i][4],
          data[this.i][5],
          data[this.i][6],
          data[this.i][7],
          data[this.i][8],
          data[this.i][9],
          data[this.i][10]
        ));
      }
    }
  }
  fetchsodata(siid: any, sino: any, soid: any, sono: any, ptid: any, ptname: any, date: any, sotypeid: any, sotypename: any, ptmob: any, ptcode: any) {
    return {
      salesinvoiceno: siid,
      sinvoice: sino,
      salesorderrefid: soid,
      sorefno: sono,
      custrefid: ptid,
      customername: ptname,
      orderdate: date,
      sotypeid: sotypeid,
      sotypename: sotypename,
      custemmobno: ptmob,
      customercode: ptcode,
      picklistid: this.pickedcheckingForm.get('picklistid').value

    }
  }
  //Get Table Data 
  p;
  j;
  pickproduct(data: any) {
    const getData = <FormArray>this.pickedcheckingForm.controls['SOrederproduct']
    getData.controls = [];
    if (data !== undefined || data == null) {
      for (this.p = 0; this.p < data.length; this.p++) {
        getData.push(this.fetchsoproduct(
          data[this.p][0],
          data[this.p][1],
          data[this.p][2],
          data[this.p][3],
          data[this.p][4],
          data[this.p][5],
          data[this.p][6],
          data[this.p][7],
          data[this.p][8],
          data[this.p][9],
          data[this.p][10],
          data[this.p][11],
          data[this.p][12],
          data[this.p][13],
          data[this.p][14],
          data[this.p][15]
        )
        )
      }

    }
  }
  fetchsoproduct(prodcode: any, proname: any, formual: any, dosg: any, batname: any, qty: any, exdate: any, batchno: any, shelf: any, block: any, rack: any, avlqty: any, pick: any, returnqty: any, reqty: any, remarks: any) {
    return this.formbuilder.group({
      drugproductrefid: prodcode,
      brandname: proname,
      dosage: dosg,
      formulation: formual,
      batchrefid: batchno,
      batchname: batname,
      expirydate: exdate,
      availqty: avlqty,
      invoiceqty: reqty,
      qty: qty,
      shelfno: shelf,
      blockno: block,
      rackno: rack,
      pickedqty: pick,
      returnqty: returnqty,
      remarks: remarks,
      picklistrefid: this.pickedcheckingForm.get('picklistid').value,
      companyrefid: [AppComponent.companyID, []],
      branchrefid: [AppComponent.branchID, []],
      locname: [AppComponent.locRefName1, []],
      locrefid: [AppComponent.locrefID1, []],
      countryrefid: [AppComponent.countryID, []],
    })
  }
  onSubmit() {
    const getData = <FormArray>this.pickedcheckingForm.controls['SOrederproduct'];
    let data: any = getData.value
    this.pickedcheckingForm.get('totalprod').setValue(data.length);
    this.pickedchecking.Savechecksalespick(JSON.stringify(this.pickedcheckingForm.value)).subscribe(data => {
      if (data == true) {
        // const getData = this.salespickingForm.controls['SOrederproduct'];
        this.pickedchecking.Savecheckpickproduct(JSON.stringify(getData.value)).subscribe(
          data => {
            if (data == true) {
              this.Notification.addToast({ title: 'success msg', msg: 'Data Saved Successfully..', timeout: 5000, theme: 'default', position: 'top-right', type: 'success' });
              setTimeout(() => {
                this.router.navigate(['Picking/ViewPicking']);
              }, 2000);
            }
            else {
              this.Notification.addToast({ title: 'Error Msg', msg: 'Data not Save..', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
            }
          },
          error => console.log("Error Occure in SavePick"))


      }
      else {
        this.Notification.addToast({ title: 'Error Msg', msg: 'Select Employe Name', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      }
    })

    // Need So Date    

  }


}



