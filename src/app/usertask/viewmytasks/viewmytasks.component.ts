import { Component, OnInit } from '@angular/core';
import { NotificationsComponent } from 'app/notifications/notifications.component';
import { Usertaskservice } from '../usertask.service';
import { AppComponent } from 'app/app.component';

@Component({
  selector: 'app-viewmytasks',
  templateUrl: './viewmytasks.component.html',
  styleUrls: ['./viewmytasks.component.css'],
  providers: [Usertaskservice, NotificationsComponent]
})
export class ViewmytasksComponent implements OnInit {





  public data: any;
  public rowsOnPage: number = 10;
  public filterQuery: string = "";
  public sortBy: string = "";
  public sortOrder: string = "desc";


    selobj;


  constructor(private usertaskservice: Usertaskservice, private notificationsComponent: NotificationsComponent) { }

  ngOnInit() {


    this.selobj = { userid: AppComponent.userID, locrefid: AppComponent.locrefID1,
      locname: AppComponent.locRefName1, companyid: AppComponent.companyID, branchid:AppComponent.branchID };

this.viewUserTask();


  }



viewUserTask(){



  var frmdata1 = { frmint1: '', frmstr1: '', createdby: '', locrefid: this.selobj.locrefid, 
  companyrefid:this.selobj.companyid, locname: this.selobj.locname, branchrefid:this.selobj.branchid };

  this.usertaskservice.viewUserTask(JSON.stringify(frmdata1)).subscribe(data => { this.data = data },


    errorCode => console.log(errorCode));










}





}
