import { Component, OnInit } from '@angular/core';
import { salespickingService } from '../salespicking.service';
import { NotificationsComponent } from 'app/notifications/notifications.component';
import { Router } from '@angular/router';
import { AppComponent } from 'app/app.component';
@Component({
  selector: 'app-viewpicking',
  templateUrl: './viewpicking.component.html',
  // styleUrls: ['./viewpicking.component.css'],
  providers:[salespickingService,NotificationsComponent],
})
export class ViewpickingComponent implements OnInit {
  public data=[];
  public rowsOnPage:number = 10;
  public filterQuery: string = "";
  public sortBy: string = "";
  public sortOrder:string = "desc";
  
  constructor(private viewslspickingService :salespickingService, private router: Router ) {}

  ngOnInit() {


    this.viewslspickingService.getViewpicking(AppComponent.companyID,AppComponent.branchID,AppComponent.locRefName1,AppComponent.locrefID1).subscribe(data => {this.data = data},
  err=> {
    console.log('Error Occured View Picking');
  });
  

  }

}
