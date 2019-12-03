import { Component, OnInit } from '@angular/core';
import { AppComponent } from 'app/app.component';
import { Usertaskservice } from '../usertask.service';
import { NotificationsComponent } from 'app/notifications/notifications.component';

@Component({
  selector: 'app-pendingtasks',
  templateUrl: './pendingtasks.component.html',
  styleUrls: ['./pendingtasks.component.css'],
  providers: [Usertaskservice, NotificationsComponent]
})
export class PendingtasksComponent implements OnInit {

  status =3;
  selobj;
  public data: any;
  public rowsOnPage: number = 10;
  public filterQuery: string = "";
  public sortBy: string = "";
  public sortOrder: string = "desc";

  constructor(private usertaskservice: Usertaskservice, private notificationsComponent: NotificationsComponent) { }
  ngOnInit() {


    this.selobj = {
      userid: AppComponent.userID, locrefid: AppComponent.locrefID1,
      locname: AppComponent.locRefName1, companyid: AppComponent.companyID, branchid: AppComponent.branchID
    };

    this.viewPendingTask();


   

  }



  viewPendingTask() {
   


    var frmdata1 = {
      frmint1: '', frmstr1: '', createdby: '', locrefid: this.selobj.locrefid,
      companyrefid: this.selobj.companyid, locname: this.selobj.locname, branchrefid: this.selobj.branchid,status: this.status
    };

    this.usertaskservice.viewPendingTask(JSON.stringify(frmdata1)).subscribe(data => { this.data = data },


      errorCode => console.log(errorCode));










  }


}
