import { Component, OnInit } from '@angular/core';
import { AppComponent } from 'app/app.component';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { UsertaskModule } from './usertask.module';

@Component({
  selector: 'app-usertask',
  templateUrl: './usertask.component.html',
  styleUrls: ['./usertask.component.css']
})
export class UsertaskComponent implements OnInit {
 



  usertask: FormGroup;



  constructor() { }
  
  


ngOnInit() {

  this.usertask.get('companyrefid').setValue(AppComponent.companyID);
  this.usertask.get('branchrefid').setValue(AppComponent.branchID);
  this.usertask.get('locname').setValue(AppComponent.locrefID);
  this.usertask.get('locrefid').setValue(AppComponent.shopID);   

    const companyrefid = new FormControl();
  const samplename = new FormControl('', Validators.required);
  const branchrefid = new FormControl();
  const locname = new FormControl();
  const locrefid = new FormControl();

  this.usertask = new FormGroup({

    companyrefid: companyrefid,
  
    branchrefid: branchrefid,
    locname: locname,
    locrefid: locrefid

   
  });

}
}