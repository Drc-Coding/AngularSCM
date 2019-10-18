import {ViewTherapeuticServices} from './viewTherapeutic.services';
import {Component, OnInit, Injectable} from '@angular/core';
import {FormGroup, FormControl, FormBuilder, Validators} from '@angular/forms';
import {CustomValidators} from 'ng2-validation';
import {Router, ActivatedRoute} from '@angular/router';
import 'jquery';


@Component({
  selector: 'app-viewTherapeutic',
  templateUrl: './viewTherapeutic.component.html',
  styleUrls: ['./viewTherapeutic.component.css'],
  providers: [ViewTherapeuticServices]
})
  

export class viewTherapeuticComponent implements OnInit {

  public data=[];
  public rowsOnPage: number =10;
  public filterQuery: string = "";
  public sortBy: string = "";
  public sortOrder: string = "desc";
  constructor(private TherapeuticService: ViewTherapeuticServices, private route: Router) {

     this.TherapeuticService.TherapeuticView().subscribe(data => {this.data = data},
      err => {
        console.log('Error get values from services in Branch Component');
      });
    

  }
  private DeleteTherapeutic(id:number): void { 
    alert("delteTherapeutic");
    this.TherapeuticService.TherapeuticDelete(id).subscribe(data=>{alert("Employee "+data);
      if(data==true){
         alert("Employee  is succesfully Deleted");
        window.location.reload();     
      }
    });
  }
  ngOnInit() {

  }

}







