import { Component, OnInit } from '@angular/core';
import { SalesorderleadService } from './salesorderlead.service';
import { AppComponent } from 'app/app.component';

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
  constructor(private saleslead : SalesorderleadService) { }

  ngOnInit() {
    this.saleslead.getsalesleadlist(AppComponent.companyID, AppComponent.branchID, AppComponent.locRefName1, AppComponent.locrefID1).subscribe(data =>{ this.data = data},
      err => {
          console.log('Error Occured On viewSalesorder()');
      });

  }

}
