import { Component, OnInit } from '@angular/core';
import { packingService } from '../packing.service';
import { Router } from '@angular/router';
import { AppComponent } from 'app/app.component';
import { dateFormatPipe } from 'app/notifications/notifications.datepipe';

@Component({
  selector: 'app-viewpacking',
  templateUrl: './viewpacking.component.html',
  styleUrls: ['./viewpacking.component.css'],
  providers:[packingService]
})
export class ViewpackingComponent implements OnInit {
  public data:any;
  public rowOnPage:number = 10;
  public filterQuery: string = "";
  public sortBy: string = "";
  public sortOrder:string = "desc";
  gifFail: boolean=true;
  deviceObj: any;
  
  constructor(private viewslspackingService :packingService, private router: Router,
    private appComponent: AppComponent, private dateformat: dateFormatPipe) {}


  ngOnInit() {

    setTimeout(() => {
    this.viewslspackingService.getpacklist(AppComponent.companyID,AppComponent.branchID,AppComponent.locRefName1,AppComponent.locrefID1).subscribe(data => {this.data = data},
  err=> {
    console.log('Error Occured View Picking');
  });
  this.gifFail=false;

  this.devicedetails();           
  this.deviceObj.apiname="api/getpacklist";
  this.deviceObj.description="View Packing Details";
 
  this.viewslspackingService.devicedetails(JSON.stringify(this.deviceObj)).subscribe(data => {});
  
  },3000);

  }


  devicedetails(){

    this.deviceObj = {

        userid: AppComponent.userID,
        companyrefid: AppComponent.companyID,
        branchrefid: AppComponent.branchID,
        locname: AppComponent.locRefName1,
        locrefid: AppComponent.locrefID1,
        clientcdate:this.dateformat.transform04(),
        ipaddress: this.appComponent.ipAddress, 
        browsertype: this.appComponent.browser,
        ostype: this.appComponent.os,
        osversion: this.appComponent.osversion,
        devicetype: this.appComponent.devicetype,
        description:'',
        apiname:''

      };
  
}

}
