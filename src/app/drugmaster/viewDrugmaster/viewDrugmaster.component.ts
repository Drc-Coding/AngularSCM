import { Component, OnInit, Input, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from "@angular/forms";
import { providers } from 'ng2-toasty';
import { drugviewService } from './viewDrugmaster.services';
import { Router } from '@angular/router';
import * as $ from 'jquery';
import { forEach } from '@angular/router/src/utils/collection';
import { DomSanitizer } from '@angular/platform-browser';
import { AppComponent } from '../../app.component';
import { NotificationsComponent } from '../../notifications/notifications.component';
import { dateFormatPipe } from 'app/notifications/notifications.datepipe';
@Component({
  selector: 'app-viewDrugmaster',
  templateUrl: './viewDrugmaster.component.html',
  providers: [drugviewService, NotificationsComponent]
})

export class viewdrugComponent implements OnInit, AfterViewInit {

  drugForm:FormGroup;
  bindvalue;
  drugsearch=true;
  genericsearch=false;
  public rowsOnPage: number = 10;
  public sortBy: string = "";
  public sortOrder: string = "desc";
  i;
  genericid = [];
  public search: any = '';
  locked: any[] = [];
  //Search Pipe Declare 
  public bigTotalItems: number = 175;
  public maxSize: number = 5;
  data: Array<any>;
  isDesc: boolean = false;
  column;
  @Input() searchText;
 

  //Pagination
  totalRec: number;
  page: number = 1;
  checkedvalues: any = [];
 
  public gifFail: boolean = true;
  public indx;
  deviceObj: any;
  
  constructor(private viewdrug: drugviewService, private router: Router, private formBuilder: FormBuilder, 
    private sanitizer: DomSanitizer, private notificationsComponent: NotificationsComponent,
    private appComponent: AppComponent, private dateformat: dateFormatPipe ) { this.data = new Array<any>();
  
    
    this.drugForm = this.formBuilder.group({

      drugsearch:[,[]],
      genericsearch:[,[]]
    });
  
  }

  ngOnInit() {

   
    this.drugForm.get('drugsearch').setValue(true);
    this.indx=0;

    setTimeout(() => {
      this.viewdrug.getdrugInfo(AppComponent.companyID).subscribe(data => this.data = data,

        err => {


          console.log('Error occured on getdrugInfo()');
        });
        
      this.gifFail = false;

      this.devicedetails();           
      this.deviceObj.apiname="api/viewDruginfo";
      this.deviceObj.description="View Drug Details";
     
      this.viewdrug.devicedetails(JSON.stringify(this.deviceObj)).subscribe(data => {});

    }, 3000);


    //alert(this.checkedvalues);
    $(document).ready(function () {
      //here i checked localstorage values
      var checkedvalues;//= JSON.parse(localStorage.getItem("checkedvalues"))
      console.log(checkedvalues);
      //  alert(checkedvalues);          
      if ($(this).prop("checked") == true) {

        alert("Checkbox is checked.");
      }
      else if ($(this).prop("checked") == false) {
        alert("Checkbox is unchecked.");
      }
      //created obj to store check values
      let someObj: any = {};
      someObj.checked = [];
      //looped through checkvalues from local storge ad add checked property to its values
      $.each(checkedvalues, function (key, value) {
        console.log(key, value);
        $("#" + value).prop('checked', value);
        console.log($("#" + value));
      });
      $(".hidecol").click(function () {

        var id = this.id;
        var splitid = id.split("_");
        var colno = splitid[1];
        var checked = true;
        if ($(this).is(":checked")) {
          checked = true;
          //push chekced values in above created array.
          someObj.checked.push($(this).attr("id"));
          console.log(someObj.checked);
          //add same values in local storage.
          //   localStorage.setItem("checkedvalues", JSON.stringify(someObj.checked));

        } else {
          checked = false;
        }
        setTimeout(function () {
          if (checked) {
            $('#drug_table td:nth-child(' + colno + ')').hide();
            $('#drug_table th:nth-child(' + colno + ')').hide();
          } else {
            $('#drug_table td:nth-child(' + colno + ')').show();
            $('#drug_table th:nth-child(' + colno + ')').show();
          }

        }, 500);

      });
    });
  }

   
  devicedetails(){

    this.deviceObj = {

        userid: AppComponent.userID,
        companyrefid: AppComponent.companyID,
        branchrefid: AppComponent.branchID,
        locname: AppComponent.locRefName1,
        locrefid: AppComponent.locrefID1,
        clientcdate:this.dateformat.transform04(),
        ipaddress: this.appComponent.ipAddress, 
        browsertype: this.appComponent.browser,
        ostype: this.appComponent.os,
        osversion: this.appComponent.osversion,
        devicetype: this.appComponent.devicetype,
        description:'',
        apiname:''

      };
  
}


  check(event, id: number) {

    if (event.target.checked) {
      
    if (id == 0) {
      this.drugForm.get('genericsearch').setValue(false);
      this.drugsearch=true;
      this.genericsearch=false;
      this.indx=0;
      this.searchText ="";
    }

    else if( id == 1) {
      this.drugForm.get('drugsearch').setValue(false);
      this.genericsearch=true;
      this.drugsearch=false;
      this.indx=1;
      this.searchText ="";
    }

  }
    

  }


  deleteDrug(id: number) {
    
    var answer = confirm("Delete data?");
    if (answer) {

    this.viewdrug.deletedrug(id).subscribe(data => {

      if(data==1){
        
        this.devicedetails();
        this.deviceObj.apiname="api/deleteDrugdetails";
        this.deviceObj.description="Removed Drug Data"
        
        this.viewdrug.devicedetails(JSON.stringify(this.deviceObj)).subscribe(data => {});
  
      this.notificationsComponent.addToast({ title: 'SUCESS MESSAGE', msg: 'DATA DELETED SUCESSFULLY.', timeout: 5000, theme: 'default', position: 'bottom-right', type: 'success' });
      setTimeout(() => {
       this.ngOnInit();
        }, 3000);
  
      }
      else{

        this.notificationsComponent.addToast({ title: 'ERROR MESSAGE', msg: 'DATA NOT DELETED...', timeout: 5000, theme: 'default', position: 'bottom-right', type: 'error' });
      }

    },
      errorCode => console.log(errorCode));
     
    }
  }


  public image: any = [];
  private readonly imageType: any = 'data:image/*;base64,';

  sid: number = 1;
  showInfo(id) {
   
    this.viewdrug.getImage(id)
      .subscribe(data =>
        this.image = this.sanitizer.bypassSecurityTrustUrl(this.imageType + data.content), error => {
          console.log('Error Occured on getImages  : ' + this.image);
         
        });
  }

  ngAfterViewInit() {

  }


  getvalue(getval : any) {

  this.bindvalue = getval.textContent;
  this.searchText =this.bindvalue;

  }



}

/*
<div class="chkdropdown" id="chkdropdown">
    Show and Hide Columns
    <ul>
      <li>
        <input type="checkbox" class="hidecol" id="col_2" name="value">&nbsp;S NO&nbsp;</li>
      <li>
        <input type="checkbox" class="hidecol" id="col_3" name="value">&nbsp;DrugName&nbsp;</li>
      <li>
        <input type="checkbox" class="hidecol" id="col_4" name="value">&nbsp; Generic Name&nbsp;</li>
      <li>
        <input type="checkbox" class="hidecol" id="col_5" name="value">&nbsp;Generic Combination&nbsp;</li>
      <li>
        <input type="checkbox" class="hidecol" id="col_6" name="value">&nbsp;Dosage &nbsp;</li>
      <li>
        <input type="checkbox" class="hidecol" id="col_7" name="value">&nbsp;VAT &nbsp;</li>
    </ul>
  </div>
*/

