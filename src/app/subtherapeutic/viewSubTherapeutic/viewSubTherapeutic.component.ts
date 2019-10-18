import {ViewSubTherapeuticServices} from './viewSubTherapeuticservices';
import {Component, OnInit, Injectable} from '@angular/core';
import {FormGroup, FormControl, FormBuilder, Validators} from '@angular/forms';
import {CustomValidators} from 'ng2-validation';
import {Router, ActivatedRoute} from '@angular/router';
import 'jquery';


@Component({
  selector: 'app-viewSubTherapeutic',
  templateUrl: './viewSubTherapeutic.component.html',
  styleUrls: ['./viewSubTherapeutic.component.css'],
  providers: [ViewSubTherapeuticServices]
})
  

export class ViewSubTherapeuticComponent implements OnInit {

  public data=[];
  public rowsOnPage: number =10;
  public filterQuery: string = "";
  public sortBy: string = "";
  public sortOrder: string = "desc";
  constructor(private TherapeuticService: ViewSubTherapeuticServices, private route: Router) {

  }
  private TherapeuticDelete(id:number): void { 
    this.TherapeuticService.SubTherapeuticDelete(id).subscribe(data=>{alert("Employee "+data);
      if(data==1){
         alert("Employee  is succesfully Deleted");
        window.location.reload();
       // window.location.replace('employeeinfo/viewEmployee');
      }
    });
  }
  ngOnInit() {
    this.TherapeuticService.SubTherapeuticView().subscribe(data => {this.data = data,alert(data)},
    err => {
      console.log('Error get values from services in Branch Component');
    });
  
  }

}







