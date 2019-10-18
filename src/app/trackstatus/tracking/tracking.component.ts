import { style } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { StatusService } from '../trackstatus.service';
import { ActivatedRoute } from '@angular/router';
import { AppComponent } from 'app/app.component';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-tracking',
  templateUrl: './tracking.component.html',
  styleUrls: ['./tracking.component.css'],
  providers:[StatusService]
})
export class TrackingComponent implements OnInit {

  soid: any;
  data: any;
  sdetails:any;
  status:any;
sodetails: FormGroup;
  public rowsOnPage: number = 10;
  public filterQuery: string = "";
  public sortBy: string = "";
  public sortOrder: string = "desc";

  constructor(private stservice:StatusService,private routes: ActivatedRoute,private fb: FormBuilder) {
    this.sodetails = this.fb.group({
      customer:['',[]],
      salesno:['',[]],
      email:['',[]],
      mobile:['',[]],
      address:['',[]],
      totalitem:['',[]],
      orderdate:['',[]]
    })
   }

  ngOnInit() {
    this.soid = this.routes.snapshot.paramMap.get('id');
    this.stservice.viewSalesorderRecord(this.soid).subscribe(data => 
      {
        this.data = data,
      err => console.log("error occurs in getsoleadrecord()")
      });

      this.stservice.viewsalesorder(AppComponent.companyID,AppComponent.branchID,AppComponent.locRefName1,AppComponent.locrefID1,this.soid).subscribe(data => 
        {
          this.sdetails = data ,this.sodetails.get('customer').setValue(this.sdetails[0][0]);
          this.sodetails.get('mobile').setValue(this.sdetails[0][1]);
          this.sodetails.get('email').setValue(this.sdetails[0][2]);
          this.sodetails.get('address').setValue(this.sdetails[0][3]);
          this.sodetails.get('salesno').setValue(this.sdetails[0][4]);
          this.sodetails.get('orderdate').setValue(this.sdetails[0][5]);
          this.sodetails.get('totalitem').setValue(this.sdetails[0][6]);
        err => console.log("error occurs in viewsalesorder()")
        });
        this.stservice.statustrack(AppComponent.companyID,AppComponent.branchID,AppComponent.locRefName1,AppComponent.locrefID1,this.soid).subscribe(data => 
          {
            this.status = data,
          err => console.log("error occurs in viewsalesorder()")
          });
        
  }

  
  openav(){

    document.getElementById("sideview").style.width="300px";
  }

  closenav(){
    document.getElementById("sideview").style.width="0px";
  }

}
