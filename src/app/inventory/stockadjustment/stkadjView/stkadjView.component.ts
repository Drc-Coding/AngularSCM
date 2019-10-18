
import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CustomValidators} from 'ng2-validation';


import { stkadjViewService } from './stkadjView.service' ;
import { AppComponent } from '../../../app.component';
@Component({
  selector: 'app-stkadjView',
  templateUrl: './stkadjView.component.html',
  providers: [stkadjViewService]
})
export class stkadjViewComponent implements OnInit {


   public data: any; 
  public rowsOnPage: number =10;
  public filterQuery: string = ""; 
  public sortBy: string = "";
  public sortOrder: string = "desc";

    datall = [];
  
    selobj ;
    constructor(private userService: stkadjViewService) {}
  
    ngOnInit() {
  
    
      this.selobj  = {   userid  : AppComponent.userID , locrefid  :AppComponent. locrefID1 , locname  :AppComponent.locRefName1       , countryrefid  :AppComponent.countryID   , companyid  :AppComponent.companyID    , branchrefid  :AppComponent.branchID   }  ;
     

      this.viewAll() ;
  
    }
  
  
  
      viewAll() {
  
        var   frmdata={ frmint1 : '' ,  frmstr1  :'', createdby  :'' , locrefid  :this.selobj.locrefid , locname  :this.selobj.locname   } ;
      this.userService.phcompanyView(JSON.stringify(frmdata)).subscribe(data => {this.data = data },
        errorCode => console.log(errorCode));
  
  
    }
  



viewmul75(){
  //    this.userService.viewmul75(JSON.stringify(this.datall)).subscribe(data => {this.datall = data ,alert(JSON.stringify(data)) },
  //      errorCode => console.log(errorCode));


}


fileChange(event) {

  var  valflag =0 ; 

    let fileList: FileList = event.target.files;
    if(fileList.length > 0) {

        let file: File = fileList[0];

        let formData:FormData = new FormData();
        formData.append('file', file, file.name);

            this.userService.viewmul75(formData).subscribe(data => {this.datall = data ,alert(JSON.stringify(data)) },
        errorCode => console.log(errorCode));
    
    }
}



}