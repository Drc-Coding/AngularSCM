import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { packingService } from '../packing.service';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { AppComponent } from 'app/app.component';
import { NotificationsComponent } from 'app/notifications/notifications.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-savepacking',
  templateUrl: './savepacking.component.html',
  styleUrls: ['./savepacking.component.css'],
  providers: [packingService, NotificationsComponent]
})
export class SavepackingComponent implements OnInit {
  closeResult: string;
  PackingForm: FormGroup;
  picklist: any;
  empname: any;
  constructor(private modalService: NgbModal, private packservice: packingService, private fb: FormBuilder, private notificationsComponent: NotificationsComponent, private router: Router) {
    this.PackingForm = this.fb.group({
      picklistrefid: ['', []],
      salesorderrefid: ['', []],
      sorefno: ['', []],
      orderdate: ['', []],
      salesinvoiceno: ['', []],
      sinvoice: ['', []],
      customername: ['', []],
      custrefid: ['', []],
      sotypeid: ['', []],
      sotypename: ['', []],
      emprefid: ['', []],
      Pack_materila: ['', []],
      Package_size: ['', []],
      qty: ['', []],
      totalprod: ['', []],
      wrapping_check_status: ['', []],
      companyrefid: [AppComponent.companyID, []],
      branchrefid: [AppComponent.branchID, []],
      locname: [AppComponent.locRefName1, []],
      locrefid: [AppComponent.locrefID1, []],
      clientcdate:[AppComponent.date,[]],
      packingpro: this.fb.array([

      ]),
      wrappingpro: this.fb.array([

      ])
    })
  }

  ngOnInit() {
    this.packservice.getpicklist(AppComponent.companyID, AppComponent.branchID, AppComponent.locRefName1, AppComponent.locrefID1).subscribe(
      data => {
        this.picklist = data
      }
    )
    this.packservice.getemployeelist(AppComponent.companyID, AppComponent.branchID, AppComponent.locRefName1, AppComponent.locrefID1).subscribe(
      data => {
        this.empname = data
      }
    )

  }
  getpackingdata() {
    this.packservice.getpackingdata(AppComponent.companyID, AppComponent.branchID, AppComponent.locRefName1, AppComponent.locrefID1, this.PackingForm.get('picklistrefid').value).subscribe(
      data => {
        this.packingdata(data)
      }
    )
    this.packservice.getpackingfielddata(AppComponent.companyID, AppComponent.branchID, AppComponent.locRefName1, AppComponent.locrefID1, this.PackingForm.get('picklistrefid').value).subscribe(
      data => {
        this.packingfielddata(data)
      }
    )
  }
  openwrappinglist() {
    this.packservice.getpackingfielddata(AppComponent.companyID, AppComponent.branchID, AppComponent.locRefName1, AppComponent.locrefID1, this.PackingForm.get('picklistrefid').value).subscribe(
      data => {
        this.wrappingfielddata(data)
      }
    )
  }

  packingdata(data) {
    if (data !== undefined || data !== null) {
      for (let p = 0; p < data.length; p++) {
        this.PackingForm.patchValue(this.fetchpackingdata(
          data[p][0],
          data[p][1],
          data[p][2],
          data[p][3],
          data[p][4],
          data[p][5],
          data[p][6],
          data[p][7],
          data[p][8]
        ));
      }
    }
  }


  fetchpackingdata(siid: any, sino: any, soid: any, sono: any, ptid: any, ptname: any, date: any, sotypeid: any, sotypename: any) {
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
      picklistrefid: this.PackingForm.get('picklistrefid').value
    }
  }

  packingfielddata(data) {
    const getData = <FormArray>this.PackingForm.controls['packingpro'];
    getData.controls = [];
    if (data !== undefined || data !== null) {
      for (let p = 0; p < data.length; p++) {
        getData.push(this.fetchpackingfielddata(
          data[p][0],
          data[p][1],
          data[p][2],
          data[p][3],
          data[p][4],
          data[p][5],
          data[p][6],
          data[p][7]
        ));
      }

    }

  }
  fetchpackingfielddata(a1: any, a2: any, a3: any, a4: any, a5: any, a6: any, a7: any,a8: any) {
    return this.fb.group({
      drugproductrefid: a1,
      brandname: a2,
      formulation: a3,
      dosage: a4,
      batchno: a5,
      qty: a6,
      expirydate: a7,
      batchrefid: a8,
      returnqty: '',
      remarks: '',
      packingtype: '',
      companyrefid: AppComponent.companyID,
      branchrefid: AppComponent.branchID,
      locname: AppComponent.locRefName1,
      locrefid: AppComponent.locrefID1
    })
  }
  wrappingfielddata(data) {
    const getData = <FormArray>this.PackingForm.controls['wrappingpro'];
    getData.controls = [];
    if (data !== undefined || data !== null) {
      for (let p = 0; p < data.length; p++) {
        getData.push(this.fetchwrappingfielddata(
          data[p][0],
          data[p][1],
          data[p][2],
          data[p][3],
          data[p][4],
          data[p][5],
          data[p][6]
        ));
      }

    }

  }
  fetchwrappingfielddata(a1: any, a2: any, a3: any, a4: any, a5: any, a6: any, a7: any) {
    return this.fb.group({
      drugproductrefid: a1,
      brandname: a2,
      formulation: a3,
      dosage: a4,
      batchno: a5,
      qty: a6,
      expirydate: a7,
      checkbox: false
    })
  }
  savewrapping(c) {
    
    const getData = <FormArray>this.PackingForm.controls['wrappingpro'];
    let setData = getData.value;


    for (let p = 0; p < setData.length; p++) {
      if (setData[p].checkbox == false) {
        this.notificationsComponent.addToast({ title: 'Error Message', msg: 'Please select product', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      }
      else {
        this.PackingForm.get('wrapping_check_status').setValue(1);
      }
    }
    c('Close click')
  }
  open(content) {
    this.modalService.open(content).result.then((result) => {
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
  savepackageno(c) {
    c('Close click')
    var packvalues = {
      pack_materila: this.PackingForm.get('Pack_materila').value,
      package_size: this.PackingForm.get('Package_size').value,
      qty: this.PackingForm.get('qty').value
    }
    this.packservice.savePackageno(JSON.stringify(packvalues)).subscribe(
      data => data
    )
  }

  onSubmit() {
    const getData = <FormArray>this.PackingForm.controls['packingpro'];
    let data: any = getData.value
     this.PackingForm.get('totalprod').setValue(data.length);
    this.packservice.savePacking(JSON.stringify(this.PackingForm.value)).subscribe(
      data => {
        if (data == true) {
          const getData = this.PackingForm.controls['packingpro'];
          this.packservice.savePackingprod(JSON.stringify(getData.value)).subscribe(
            data => {
              if (data == true) {
                this.notificationsComponent.addToast({ title: 'Success Message', msg: 'Data Saved Successfully.', timeout: 5000, theme: 'default', position: 'top-right', type: 'success' });
                setTimeout(() => {
                  this.router.navigate(['Packing/Viewpacking']);
                }, 2000);
              }
              else {
                this.notificationsComponent.addToast({ title: 'Error Message', msg: 'Data Not Saved', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
              }
            },
            error => console.log("Error occurs in saveSaleleadRecord()"))
        }
      },
      error => console.log("Error occurs in savesaleslead()"))
  }
}
