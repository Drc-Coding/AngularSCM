import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormArray } from '@angular/forms';

import { AppComponent } from 'app/app.component';
import { PrescUploadService } from '../prescupdation.service';
import { editSubTherapeuticRoutes } from 'app/subtherapeutic/editSubTherapeutic/editSubTherapeutic.routing';
import { NotificationsComponent } from 'app/notifications/notifications.component';
import { DomSanitizer } from '@angular/platform-browser';



@Component({
  selector: 'app-addpresc-updation',
  templateUrl: './addpresc-updation.component.html',
  styleUrls: ['./addpresc-updation.component.css'],
  providers: [PrescUploadService,NotificationsComponent]
})
export class AddprescUpdationComponent implements OnInit {
  prescuploadForm: any;
  imgURL:any="assets/images/blank image.png";
  signimgURL:any ="assets/images/blank image.png";;
  imagePath:any;
  message:any;
  patientid:any;
  patient:any;
  patientdetails:any;
  pmobile:any;
  pgender:any;
  doctors:any;
  employee:any;
  searchProducts=[];
  ephoto: File;
  sphoto:File;
  imgprop: boolean=false;
  ordertype:any;
  constructor(private router: Router, private formbuilder: FormBuilder,  private appcomponent: AppComponent, private prescuploadservice: PrescUploadService, private Notification:NotificationsComponent, private sanitizer:DomSanitizer) {
    this.prescuploadForm = this.formbuilder.group({
      prescimage:['',[]],
      patient_id:['',[]],
      
      mobile:['',[]],
      gender:['',[]],
      doctor_id:['',[]],
    employee_id:['',[]],
    qty:['',[]],
    days:['',[]],
    drugproductid: ['', []],
     
      modifiedby: ['', []],
      modifieddate: ['', []],
     
      remarks: ['', []],
      salesordertypeid:['',[]],   
      clientcdate:[AppComponent.date,[]],
      clientmdate:[AppComponent.date,[]],
      companyrefid: [AppComponent.companyID, []],
      branchrefid: [AppComponent.branchID, []],
      locname: [AppComponent.locRefName1, []],
      locrefid: [AppComponent.locrefID1, []],
      prescproduct:this.formbuilder.array([]),



    });
  }

  ngOnInit() {
  
//Get PatientId and Patient Name
this.prescuploadservice.getpatientid(AppComponent.companyID,AppComponent.branchID,AppComponent.locRefName1,AppComponent.locrefID1).subscribe(
  data => {this.patient=data,this.patientid = data[0]}
)


this.prescuploadservice.GetOrderType().subscribe(data =>
  {this.ordertype = data})
  
  }


  openfile(){
    $("#imagefile").click();
  }

  
 
//Prescription Image Upload Process
  fileChange(event){

    this.message="";

    // when the load event is fired and the file not empty
    if(event.target.files && event.target.files.length > 0) {
  
       //Check & Print Type Error Message
       var mimeType = event.target.files[0].type;
       if (mimeType.match(/image\/*/) == null) {
         this.imgprop=false;
         this.message = "Only images are supported.";
          return;
       }
      
  
      if (event.target.files[0].size < 500000) {
  
        this.imgprop=true;
      // Fill file variable with the file content
      this.ephoto = event.target.files[0];
  
    
      // Instantiate an object to read the file content
      let reader = new FileReader();
  
        //To read Encrypted file and send url to display in html
        reader.readAsDataURL(this.ephoto); 
        reader.onload = (_event) => { 
          this.imgURL = reader.result; 
        }
  
    }
  
    else{
      this.message = "Max Image Size 500KB Only & Check File Format";
    }
  
  }
  }

  //Zoom in out

  imgwidth = 460;
  imgheight = 420;

  zoomin() {

    this.imgwidth += 12;
    this.imgheight += 12;
  }

  zoomout() {

    this.imgwidth += -12;
    this.imgheight += -12;
  }



  //Prescription image save

  saveimage():Boolean{

    // Instantiate a FormData to store form fields and encode the file
    let body = new FormData();
    // Add file content to prepare the request
    body.append("file", this.ephoto);
   
    // Launch post request Service Call
    this.prescuploadservice.SavePresImg(body).subscribe(
      // Admire results
      (data) => {
        if(data == false){
          return false;
        }
        console.log(data)},
      // Or errors :-(
      (error)=>{ console.log(error)},
      // tell us if it's finished
      () => { console.log("completed") }
    );
 return true;
 }
//Show Signature
showsign(){
  this.prescuploadservice.showempsign(this.prescuploadForm.get('employee_id').value).subscribe(data =>{
    data = this.viewimage(data),
    err=> {
      console.log('Error Occured View Picking');
    }
  })
}

private readonly imageType: any = 'data:image/*;base64,';
 
    viewimage(data){
 
     this.signimgURL = this.sanitizer.bypassSecurityTrustUrl(this.imageType + data.content)
     
    }
 





// Get Product Details
searchProduct(searchValue: any) {
  this.prescuploadservice.getsearchproduct(this.prescuploadForm.get('companyrefid').value, this.prescuploadForm.get('branchrefid').value, this.prescuploadForm.get('locrefid').value, this.prescuploadForm.get('locname').value,searchValue).subscribe(data => {
   this.searchProducts = [];
    for (let j = 0; j < data.length; j++) {
      this.searchProducts.push({ value: data[j][0], label: data[j][1] });
    }
  },
    err => {
      console.log('Error occured On searchProduct()');
    });
}



//Patient Mobile No and Gender Details
pdetails(){

  this.prescuploadservice.getpatiendetails(this.prescuploadForm.get('patient_id').value,AppComponent.companyID, AppComponent.branchID, AppComponent.locRefName1, AppComponent.locrefID1).subscribe(
    data => {this.prescuploadForm.get('mobile').setValue(data[0][0]),
            this.pgender = (data[0][1])
          if(this.pgender == 1){
          this.prescuploadForm.get('gender').setValue("Male");
          }
          else{
          this.prescuploadForm.get('gender').setValue("Female");
          } 
})
  
}

//Get Doctor Details
getdoctor(){

  this.prescuploadservice.getdoctor(AppComponent.companyID,AppComponent.branchID,AppComponent.locRefName1,AppComponent.locrefID1).subscribe(
    data => {this.doctors = data

    })
}
//Get Employee details
getemployee(){

  this.prescuploadservice.getemployee(AppComponent.companyID,AppComponent.branchID,AppComponent.locRefName1,AppComponent.locrefID1).subscribe(
    data => {this.employee = data,(alert(data))

    })
}





// Product Entry
  geprod(){  

   
  
   this.prescuploadservice.Getproductdetails(this.prescuploadForm.get('drugproductid').value).subscribe(data => {
     this.getproduct(data)},
     err =>{
       console.log('Error Occured');
     
   });
   
  }
 p;
 getproduct(data:any){
   const getData = <FormArray>this.prescuploadForm.controls['prescproduct']
  //  getData.controls = [];
   if(data !== undefined || data == null){
     for(this.p=0; this.p < data.length; this.p++){
       getData.push(this.fetchprescprod(
       data[this.p][0],
       data[this.p][1],
       data[this.p][2],
       data[this.p][3],
       data[this.p][4]
       
        )
       )
     }
   }
   this.prescuploadForm.get('drugproductid').setValue('');
   this.prescuploadForm.get('qty').setValue('');
   this.prescuploadForm.get('days').setValue('');
 }
 fetchprescprod(productid:any,productname:any,dosage:any,genricname:any,formulation:any){
   return this.formbuilder.group({
    drugproductname:productname,
    pdosage:dosage,
    pgenericname:genricname,
    pformulation:formulation,
    drugproductid:productid,
    qty: [this.prescuploadForm.get('qty').value, []],
    days: [this.prescuploadForm.get('days').value, []],
    salesordertypeid:[this.prescuploadForm.get('salesordertypeid').value,[]],
    companyrefid:[AppComponent.companyID,[]],
    branchrefid:[AppComponent.branchID,[]],
    locname:[AppComponent.locRefName1,[]],
    locrefid:[AppComponent.locrefID1,[]],
    countryrefid:[AppComponent.countryID,[]]
   
   
   })

 }
   

 //Redirect Add Customer form
 addcust(){
  this.router.navigate(['/Customer/AddCustomer']);
 }
 imageresp:any;
 signimageresp:any;
 onSubmit(){
   const getData = <FormArray>this.prescuploadForm.controls['prescproduct'];
   let Data:any = getData.value;
   this.prescuploadservice.SavePrescUpload(JSON.stringify(this.prescuploadForm.value)).subscribe(Data =>
    {
      if(Data == true){
        this.prescuploadservice.SavePresProduct(JSON.stringify(getData.value)).subscribe( Data =>
          {

            if(Data == true){
             this.imageresp = this.saveimage();

                 if( this.imageresp == true){
                    

                    this.Notification.addToast({title: 'success msg', msg: 'Data Saved Successfully..', timeout: 5000, theme: 'default', position: 'top-right', type: 'success'});
                    setTimeout(() => {
                      this.router.navigate(['/PrescUpdation/ViewUpdatePrescription']);
                    },2000);

                  }
                   else{
                    this.Notification.addToast({title: 'Error Msg', msg: 'Data not Save..', timeout: 5000, theme:'default', position: 'top-right', type: 'error'});
                   }
                
              }
            // else{
            //         this.Notification.addToast({title: 'Error Msg', msg: 'Data Only Saved', timeout: 5000, theme:'default', position: 'top-right', type: 'error'});
            //    }
          })
      }
    })
 }

}


