
import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CustomValidators} from 'ng2-validation';
import { AppComponent } from '../../app.component';
import {stktrnsprodservice} from'./report.services';



@Component({
 selector: 'app-report',
 templateUrl: './report.component.html',
 providers : [stktrnsprodservice]
})
export class reportComponent implements OnInit {
 private myForm: FormGroup;

 branchid: any;
 locname: any;
 locrefid: any;
 companyrefid: any;
 status: number=0;
 rack: any;
 shelf: any;
 stranferno: number;

rackno: any;
shelfno: any;
indentno: any;
stocklist:any;

stransno:any;
indtno;

reportvar;
reportvar1;

 constructor(private formBuilder: FormBuilder,private stktrns:stktrnsprodservice ) {


 }

 ngOnInit() {
   this.myForm = this.formBuilder.group({
     
     rack: ['', Validators.required],

     shelf: ['', Validators.required],
    
     from_date: ['', Validators.required],

     to_date: ['', Validators.required],
 
    

     stranferno:['', Validators.required],
     requisitionno:['',Validators.required],



 
 });

   this.branchid=  AppComponent.branchID;
   this.locname=  AppComponent.locRefName1;
   this.locrefid= AppComponent.locrefID1;
   this.companyrefid= AppComponent.companyID;
this.rackno=this.myForm.get("rack").value;
this.shelfno=this.myForm.get("shelf").value;
//this.indtno=this.myForm.get("indentno").value;

this.reportvar= this.myForm.get("from_date").value;
this.reportvar1= this.myForm.get("to_date").value;
this.stktrns.getstocktransfer(this.companyrefid,this.branchid,this.locname,this.locrefid).subscribe(data =>this.stocklist=data)
this.stktrns.getrequisition(this.companyrefid,this.branchid, this.locname,this.locrefid).subscribe(data =>this.indentno = data)

 }
 setDateRange(): void {
   // Set date range (today) using the patchValue function
   let date = new Date();
   this.myForm.patchValue({from_date:  {
       beginDate: {
           year: date.getFullYear(),
           month: date.getMonth() + 1,
           day: date.getDate()
       },
       endDate: {
           year: date.getFullYear(),
           month: date.getMonth() + 1,
           day: date.getDate()
       }
   }});
   let date2 = new Date();
   this.myForm.patchValue({to_date: {
     beginDate: {
         year: date2.getFullYear(),
         month: date2.getMonth() + 1,
         day: date2.getDate()
     },
     endDate: {
         year: date2.getFullYear(),
         month: date2.getMonth() + 1,
         day: date2.getDate()
     }
 }});
}

datefetch(){

   this.reportvar= this.myForm.get("from_date").value;
   this.reportvar1= this.myForm.get("to_date").value;
}
view(){
 this.rackno=this.myForm.get("rack").value;
this.shelfno=this.myForm.get("shelf").value;
this.indtno=this.myForm.get("requisitionno").value;
this.stransno=this.myForm.get("stranferno").value;


}
onSubmit(){

}
}

