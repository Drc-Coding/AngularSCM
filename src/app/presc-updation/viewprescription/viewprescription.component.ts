import { Component, OnInit } from '@angular/core';
import { PrescUploadService } from '../prescupdation.service';
import { Router } from '@angular/router';
import { AppComponent } from 'app/app.component';
import { DomSanitizer } from '@angular/platform-browser';


@Component({
  selector: 'app-viewprescription',
  templateUrl: './viewprescription.component.html',
  styleUrls: ['./viewprescription.component.css'],
  providers:[PrescUploadService]
})
export class ViewprescriptionComponent implements OnInit {
  public data=[];
  public rowsOnPage:number = 10;
  public filterQuery: string = "";
  public sortBy: string = "";
  public sortOrder:string = "desc";
  prid:any;
  imgURL:any;

  constructor(private ViewPrescservice:PrescUploadService, private router:Router, private appcomponent:AppComponent, private sanitizer:DomSanitizer) { }

  ngOnInit() {
          this.ViewPrescservice.getPresccdetails(AppComponent.companyID,AppComponent.branchID,AppComponent.locRefName1,AppComponent.locrefID1).subscribe(
            data =>{this.data= data},
            err=> {
              console.log('Error Occured View Picking');
            }
            
          );
  }


  showpresimage(data){
alert(data);
    this.ViewPrescservice.getprescimage(data).subscribe(
      data =>{this.viewimage(data)},
      err=> {
        console.log('Error Occured View Picking');
      }
      
    );

  }
  
    private readonly imageType: any = 'data:image/*;base64,';
 
    viewimage(data){
 
     this.imgURL = this.sanitizer.bypassSecurityTrustUrl(this.imageType + data.content)
     
    }
 
  
}
