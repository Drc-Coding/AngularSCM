import { Component, OnInit } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";

import { NotificationsComponent } from "app/notifications/notifications.component";
import { dateFormatPipe } from "app/notifications/notifications.datepipe";
import { AppComponent } from "app/app.component";
import { Editwarehouseservices } from "./editwarehouse.service";
import { ActivatedRoute } from "@angular/router";


@Component({

  selector: 'edit-warehouse',
  templateUrl: './editwarehouse.component.html',
  providers: [Editwarehouseservices, NotificationsComponent, dateFormatPipe]



})


export class Editwarehousecomponent implements OnInit {


  
  private wareValue: any;
  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";

  selobj;
  countries = [];
  states = [];
  cities = [];


  warehouseform: any;
  wareid: number;

  constructor(private fb: FormBuilder, private whService: Editwarehouseservices, private route: ActivatedRoute, private notificationsComponent: NotificationsComponent
    , private dateformat: dateFormatPipe) {



  }



  ngOnInit(): void {

    this.selobj = {
      userid: AppComponent.userID, locrefid: AppComponent.locrefID1, locname: AppComponent.locRefName1, countryrefid: AppComponent.countryID,
      companyid: AppComponent.companyID
      , branchrefid: AppComponent.branchID, vatdispflag: AppComponent.vatDispFlag, boxdispflag: AppComponent.BoxDispFlag
      , stripdispflag: AppComponent.StripDispFlag, tabdispflag: AppComponent.TabDispFlag
    };


    this.wareValue = this.route.params.subscribe(params => {
      this.wareid = +params['wareid'];
    });



    this.whService.getwareEditvalues(this.wareid,
      
      this.selobj.companyid,

      this.selobj.branchrefid,

        this.selobj.locname,

      this.selobj.locrefid ).subscribe(data => this.getEditdata(data),
      error => {
        console.log('Error occured in Drug getdrugEditvalues');
      });



    this.whService.getCountry().subscribe(data => this.countries = data,
      err => {
        console.log('Error Occured ');
      });





    this.warehouseform = this.fb.group({

      // warehouseid: [, []],
      // productid: [, []],


      // countryid: [, []],


      companyid: [, []],

      warehousename: [, [Validators.required]],
      warehousecode: [, [Validators.required]],

      username: [, []],
      password: [, []],


      owner_name: [, [Validators.required]],
      address1: [, []],
      address2: [, []],
      address3: [, []],
      city: [, []],
      state: [, []],
      country: [, []],
      pincode: [, []],
      contact_no1: [, [Validators.required]],
      contact_no2: [, []],
      mobile_no: [, [Validators.required]],
      email_id: [, [Validators.pattern(this.emailPattern)]],
      dlno: [, []],
      license_holder: [, []],
      tinno: [, []],
      cstno: [, []],
      panno: [, []],
      status: [0, []],
      gstno: [, []],
      coldstorage: [, []],
      createdby: [, []],
      createddate: [, []],
      modifiedby: [, []],
      modifieddate: [, []],
      clientcdate: [this.dateformat.transform04(), []],
      clientmdate: [AppComponent.date, []],

      companyrefid: [AppComponent.companyID, []],
      branchrefid: [AppComponent.branchID, []],
      locname: [AppComponent.locRefName1, []],
      locrefid: [AppComponent.locrefID1, []],
      // registerflag: [, []],



    });





    this.warehouseform.get('country').setValue('0');
    this.warehouseform.get('state').setValue('0');
    this.warehouseform.get('city').setValue('0');




    //Get State   
    this.whService.getEditStates(this.wareid).subscribe(data => this.states = data,
      err => {
        console.log('Error Occured Get States');
      });

    //Get City    
    this.whService.geteditCity(this.wareid).subscribe(data => this.cities = data,
      err => {
        console.log('Error Occured Get City');
      });






  }


  


  getEditdata(data: any) {
    let k;
    let temp: number = 0;
    if (data !== undefined || data !== null) {
      for (k = 0; k < data.length; k++) {
        this.warehouseform.patchValue(this.fetchEidtdata(
          data[k][0],
          data[k][1],
          data[k][2],
          data[k][3],
          data[k][4],
          data[k][5],
          data[k][6],
          data[k][7],
          data[k][8],
          data[k][9],
          data[k][10],
          data[k][11],
          data[k][12],
          data[k][13],
          data[k][14],
          data[k][15],
          data[k][16],
          data[k][17],
         
         


        ));

      }
    }
  }




  fetchEidtdata(d0: any, d1: any, d2: any, d3: any, d4: any, d5: any, d6: any, d7: any, d8: any,
     d9: any, d10: any, d11: any, d12: any, d13: any, d14: any, d15: any, d16: any, d17: any) {



    return {

      warehousename: d0,
      warehousecode:d1,
      owner_name: d2,
      address1: d3,
      address2:d4, 
      address3: d5,
      city: d6,
      state: d7,
      country:d8,
      pincode:d9,
      contact_no1: d10,
      mobile_no: d11,
      email_id: d12,
      license_holder: d13,
      tinno: d14,
      panno: d15,
      gstno: d16,
      coldstorage: d17,
     
    }

  }












  public retrunFlag: boolean = false;


  onSubmit() {

    this.retrunFlag = this.basicValidation();


    if (this.retrunFlag) {


      this.whService.saveWarohuseDetails(JSON.stringify(this.warehouseform.value)).subscribe(data => {
        this.savevalid(data);
        //  window.location.href = "warehouse/ViewWarehouse";


      })




    }

  }







  getState() {
    //Get States 
    this.whService.getStates(this.warehouseform.get('country').value).subscribe(data => this.states = data,
      err => {
        console.log('Error Occured Get States');
      });

  }

  getCity() {
    //Get City 
    this.whService.getCity(this.warehouseform.get('state').value).subscribe(data => this.cities = data,
      err => {
        console.log('Error Occured Get City');
      });
  }






  basicValidation(): boolean {






    if (this.warehouseform.get('warehousename').value == '' || 0 || null || undefined) {


      this.notificationsComponent.addToast({ title: 'Error', msg: 'please enter warehousename..', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      return false;

    }




    //  else if (this.warehouseform.get('productid').value == '' || 0 || null || undefined) {
    //     // debugger;

    //     this.notificationsComponent.addToast({ title: 'Error', msg: 'please enter productid..', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
    //     return false;

    //   }






    // else if (this.shipmentForm.get('package_description').value == null || undefined || "") {

    //     this.notificationsComponent.addToast({ title: 'Error', msg: 'please enter description..', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
    //     return false;
    // }


    else if (this.warehouseform.get('warehousecode').value == '' || 0 || null || undefined) {


      this.notificationsComponent.addToast({ title: 'Error', msg: 'please enter warehousename..', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      return false;

    }



    else if (this.warehouseform.get('warehousename').value == '' || 0 || null || undefined) {


      this.notificationsComponent.addToast({ title: 'Error', msg: 'please enter warehousename..', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      return false;

    }


    else if (this.warehouseform.get('owner_name').value == '' || 0 || null || undefined) {


      this.notificationsComponent.addToast({ title: 'Error', msg: 'please enter warehousename..', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      return false;

    }

    else if (this.warehouseform.get('contact_no1').value == '' || 0 || null || undefined) {


      this.notificationsComponent.addToast({ title: 'Error', msg: 'please enter warehousename..', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      return false;

    }

    else if (this.warehouseform.get('mobile_no').value == '' || 0 || null || undefined) {


      this.notificationsComponent.addToast({ title: 'Error', msg: 'please enter mobile number..', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      return false;

    }


    return true;
  }








  savevalid(data: any) {
    if (data == true) {
      this.notificationsComponent.addToast({ title: 'Success', msg: 'Data  Saved  ', timeout: 2000, theme: 'default', position: 'top-right', type: 'success' });
    } else {
      this.notificationsComponent.addToast({ title: 'Error', msg: 'Data Not  saved  ', timeout: 2000, theme: 'default', position: 'top-right', type: 'error' });
    }
  }















}