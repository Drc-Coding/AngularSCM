import { Component, OnInit } from '@angular/core';
import { packingService } from '../packing.service';
import { Router } from '@angular/router';
import { AppComponent } from 'app/app.component';

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
  
  constructor(private viewslspackingService :packingService, private router: Router ) {}

  ngOnInit() {


    this.viewslspackingService.getpacklist(AppComponent.companyID,AppComponent.branchID,AppComponent.locRefName1,AppComponent.locrefID1).subscribe(data => {this.data = data},
  err=> {
    console.log('Error Occured View Picking');
  });
  

  }

  

}
