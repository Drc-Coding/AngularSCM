import { Component, OnInit } from '@angular/core';
import { SalesorderleadService } from './salesorderlead.service';
import { AppComponent } from 'app/app.component';
import { dateFormatPipe } from 'app/notifications/notifications.datepipe';

@Component({
  selector: 'app-salesorderlead',
  templateUrl: './salesorderlead.component.html',
 
  providers: [SalesorderleadService]
})
export class SalesorderleadComponent implements OnInit {
  public data: any;
  public rowsOnPage: number = 10;
  public filterQuery: string = "";
  public sortBy: string = "";
  public sortOrder: string = "desc";
  gifFail: boolean=true;
  deviceObj: any;

  constructor(private saleslead : SalesorderleadService,private appComponent: AppComponent,
    private dateformat: dateFormatPipe) { }

  ngOnInit() {

    setTimeout(() => {
    this.saleslead.getsalesleadlist(AppComponent.companyID, AppComponent.branchID, AppComponent.locRefName1, AppComponent.locrefID1).subscribe(data =>{ this.data = data},
      err => {
          console.log('Error Occured On viewSalesorder()');
      });
      this.gifFail=false;
    },3000)


    this.devicedetails();           
    this.deviceObj.apiname="api/salesOrderlead";
    this.deviceObj.description="View SalesOrder Lead";
   
    this.saleslead.viewdevicedetails(JSON.stringify(this.deviceObj)).subscribe(data => {});

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
