import { Component, OnInit, Input, Output, AfterViewInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { FormBuilder, FormControl, Validators, FormArray } from "@angular/forms";
import { addInvoicesessionService } from './addPurchasesession.services';
import { providers } from 'ng2-toasty';
import { ToastyService, ToastOptions, ToastData } from "ng2-toasty";
import { Router } from '@angular/router';
import swal from 'sweetalert2';
declare var jquery: any;
declare var $: any;
const textPattern = "[a-zA-Z][a-zA-Z ]+";
const textnumbers = '^[0-9]+(\.[0-9]{1,3})?$';
import { NotificationsComponent } from '../../notifications/notifications.component';
import { AppComponent } from '../../app.component';
import { dateFormatPipe } from '../../notifications/notifications.datepipe';
/*
@Author AJith Kumar
 */
@Component({
  selector: 'app-addPurchasesession',
  templateUrl: './addPurchasesession.component.html',
  styleUrls: ['./addPurchasesession.component.css'],
  providers: [addInvoicesessionService, NotificationsComponent]
})
export class addInvocesessionComponent implements OnInit, AfterViewInit {
  purchasesession: any;
  companylist = [];
  branchlist = [];
  shoplist = [];
  warehouselist = [];
  hospitallist = [];
  tablesessionshop = [];
  tablesessionview = [];
  tablesessionhosp = [];
  /**Multi Select Declare**/
  dropdownSettings = {};
  selectedItems = [];
  dropdownSettings1 = {};
  selectedItems1 = [];
  dropdownSettings2 = {};
  dropdownSettings3 = {};
  /** Secondary Declaration**/
  i;
  x;
  branch = [];
  g;
  constructor(private sessionService: addInvoicesessionService, private router: Router, private formBuilder: FormBuilder,
    private notificationsComponent: NotificationsComponent, private appComponent: AppComponent, private dateformat: dateFormatPipe) {
    this.purchasesession = this.formBuilder.group({
      companyid: ['', []],
      branchid: ['', []],
      shopid: ['', []],







      // warehouseid: ['', []],

      shlist: ['', []],

      // hospitalid: ['', []],


      sessiondate: [this.dateformat.transform05(Date.now()), [Validators.required]],
      sessionno: ['', []],
      companyrefid: ['', []],
      branchrefid: ['', []],
      locname: ['', []],
      locrefid: ['', []],
      clientcdate: ['', []],
      purcsession: this.formBuilder.array([
      ]),
    });
  }
  ngOnInit() {
    /**To Set DropDown values in PlaceHolder**/
    this.purchasesession.get('companyid').setValue("opt1");
    /** Get Company Info**/
    this.sessionService.getsessCompany(AppComponent.companyID).subscribe(data => {
      this.companylist = data
    },
      error => {
        console.log('Error Occured On getsessCompany()');
      }
    );
    this.purchasesession.get('companyrefid').setValue(AppComponent.companyID);
    this.purchasesession.get('branchrefid').setValue(AppComponent.branchID);
    this.purchasesession.get('locname').setValue(AppComponent.locrefID);
    if (AppComponent.shopID != 0) {
      this.purchasesession.get('locrefid').setValue(AppComponent.shopID);
    }


    // if (AppComponent.hospitalID != 0) {
    //   this.purchasesession.get('locrefid').setValue(AppComponent.hospitalID);
    // }
    // if (AppComponent.warehouseID != 0) {
    //   this.purchasesession.get('locrefid').setValue(AppComponent.warehouseID);
    // }



    /** Multi Select (4)**/
    this.dropdownSettings = {
      maxHeight: 400,
      singleSelection: false,
      text: "--- Select Branch ---",
      badgeShowLimit: 1,
      classes: "myclass custom-class"
    };

    this.dropdownSettings1 = {
      maxHeight: 400,
      singleSelection: false,
      text: "--- Select Shop ---",
      badgeShowLimit: 1,
      classes: "myclass custom-class"
    };

    this.dropdownSettings2 = {
      maxHeight: 400,
      singleSelection: false,
      text: "--- Select Warehouse ---",
      badgeShowLimit: 1,
      classes: "myclass custom-class"
    };

    this.dropdownSettings3 = {
      maxHeight: 400,
      singleSelection: false,
      text: "--- Select Hospital ---",
      badgeShowLimit: 1,
      classes: "myclass custom-class"
    };

  }
  selectAll(event: any) {


    const setData = <FormArray>this.purchasesession.controls['purcsession'];

    let getData = setData.value;

    if (event) {

      for (let i = 0; i < getData.length; i++) {

        if (getData[i].indentno != null || undefined) {

          setData.controls[i].get('checkbox').setValue(true);


        }




      }



    }
    else {


      for (let i = 0; i < getData.length; i++) {

        if (getData[i].indentno != null || undefined) {

          setData.controls[i].get('checkbox').setValue(false);


        }


    }




  }

  }







  /** Get Branch Info**/
  getBranchlist() {
    this.branchlist = [];
    this.sessionService.getsessBranch(this.purchasesession.get('companyid').value).subscribe(data => { this.branchList(data) },
      error => {
        console.log('Error Occured On getBranchlist()')
      }
    );
  }

  public getshoplist(): any {
    this.branch = this.purchasesession.get('branchid').value;
    this.shoplist = [];
    for (this.g = 0; this.g < this.branch.length; this.g++) {
      /** Get Shop Info**/
      this.sessionService.getSessShop(this.purchasesession.get('companyid').value, this.branch[this.g].id).subscribe(data => { this.getShoplist(data) },
        error => {
          console.log('Error Occured On getSessShop()')
        }
      );
    }
  }
  getwarelist() {
    this.branch = this.purchasesession.get('branchid').value;
    this.warehouselist = [];
    for (this.g = 0; this.g < this.branch.length; this.g++) {
      /** Get Warehouse Info**/
      this.sessionService.getSessWarehouse(this.purchasesession.get('companyid').value, this.branch[this.g].id).subscribe(data => { this.warehouselists1(data) },
        error => {
          console.log('Error Occured On getSessWarehouse()')
        }
      );
    }
  }
  getHosp() {
    this.branch = this.purchasesession.get('branchid').value;
    this.hospitallist = [];
    for (this.g = 0; this.g < this.branch.length; this.g++) {
      /** Get Hospital Info**/
      this.sessionService.getSessHosp(this.purchasesession.get('companyid').value, this.branch[this.g].id).subscribe(data => { this.hosplist(data) },
        error => {
          console.log('Error Occured On getSessHosp()')
        }
      );
    }
  }

  branchList(data: any) {
    for (this.i = 0; this.i < data.length; this.i++) {
      this.branchlist.push({ id: data[this.i][0], itemName: data[this.i][1] });
    }
  }
  getShoplist(data: any) {
    for (this.i = 0; this.i < data.length; this.i++) {
      this.shoplist.push({ id: data[this.i][0], itemName: data[this.i][1] });
    }
  }
  warehouselists1(data: any) {
    for (this.i = 0; this.i < data.length; this.i++) {
      this.warehouselist.push({ id: data[this.i][0], itemName: data[this.i][1] });
    }
  }

  hosplist(data: any) {
    for (this.i = 0; this.i < data.length; this.i++) {
      this.hospitallist.push({ id: data[this.i][0], itemName: data[this.i][1] });
    }
  }

  /** Table Fetch Data**/
  getTabledata(data: any) {
    if (data !== undefined || data !== null) {
      const getpurcSession = <FormArray>this.purchasesession.controls['purcsession'];
      let pSession = getpurcSession.value;
      let flag: number = 0;
      for (this.i = 0; this.i < data.length; this.i++) {
        for (this.x = 0; this.x < pSession.length; this.x++) {
          if (data[this.i][3] == pSession[this.x].indentid) {
            flag = 1;
          }
        }
        if (flag == 1) {
          this.notificationsComponent.addToast({ title: 'Error', msg: 'The Indent FormName  ' + data[this.i][2] + '  Already Exist!!', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
        }
        else {
          getpurcSession.push(this.showTabledata(
            data[this.i][0],

            data[this.i][1],
            // data[this.i][2],
            data[this.i][3],
            data[this.i][4],
            data[this.i][5],
            data[this.i][6],
            data[this.i][7],
            data[this.i][8],
            data[this.i][10],
            data[this.i][9]
          ));
        }
      }
      //  this.purchasesession.get('shopid').setValue("");

      // this.purchasesession.get('warehouseid').setValue("");
      // this.purchasesession.get('hospitalid').setValue("");
    }
    if (data == '' || data == null) {
      this.notificationsComponent.addToast({ title: 'Error', msg: 'Session Data Not Available..', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
    }
  }

  showTabledata(indno: any, inddate: any, indid: any, bname: any, wbqty: any, wsqty: any, wtqty: any, wtoqty: any, shopname: any, pid: any) {
    return this.formBuilder.group({
      checkbox: [false, []],






      indentno: [indno, []],
      indentdate: [inddate, []],


      // formname: [fname, []],



      indentid: [indid, []],
      brandname: [bname, []],
      waitboxqty: [wbqty, []],
      waitstripqty: [wsqty, []],
      waittabletqty: [wtqty, []],
      waittotqty: [wtoqty, []],

      ShopName: [shopname, []],
      drugproid: [pid, []]
    });
  }
  shop: any = 0; warehouse: any = 0; hosp: any = 0;

  getPurchaseSession() {
    this.shop = this.purchasesession.get('shopid').value;
    // this.warehouse = this.purchasesession.get('warehouseid').value;
    // this.hosp = this.purchasesession.get('hospitalid').value;
    if (this.shop == "") {

      // && this.warehouse == "" && this.hosp == ""

      this.notificationsComponent.addToast({ title: 'Error', msg: 'Please Choose One...', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
    }

    // if ((this.hosp != '' && this.warehouse != '') || (this.warehouse != '' && this.shop != '') || (this.hosp != '' && this.shop != '')) 


    if (this.shop == "") {
      this.notificationsComponent.addToast({ title: 'Error', msg: 'Please!!! Select Only one To Get Purchase Session..', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
    }




    else {
      if (this.shop != "") {
        for (this.g = 0; this.g < this.shop.length; this.g++) {
          this.sessionService.getPurcSessionshop(this.shop[this.g].id,
            this.purchasesession.get('companyrefid').value,
            this.purchasesession.get('branchrefid').value,
            this.purchasesession.get('locname').value,
            this.purchasesession.get('locrefid').value).subscribe(data => { this.getTabledata(data) },
              error => {
                console.log("Error Occured from getPurcSessiontable()");
              });

        }
      }



      // if (this.warehouse != "") {
      //   for (this.g = 0; this.g < this.warehouse.length; this.g++) {
      //     this.sessionService.getPurcSessionwarehouse(this.warehouse[this.g].id,
      //       this.purchasesession.get('companyrefid').value,
      //       this.purchasesession.get('branchrefid').value,
      //       this.purchasesession.get('locname').value,
      //       this.purchasesession.get('locrefid').value).subscribe(data => { this.getTabledata(data) },
      //       error => {
      //         console.log("Error Occured from getPurcSessionshop()");
      //       });
      //   }
      // }
      // if (this.hosp != "") {
      //   for (this.g = 0; this.g < this.hosp.length; this.g++) {
      //     this.sessionService.getPurcSessionhosp(this.hosp[this.g].id,
      //       this.purchasesession.get('companyrefid').value,
      //       this.purchasesession.get('branchrefid').value,
      //       this.purchasesession.get('locname').value,
      //       this.purchasesession.get('locrefid').value).subscribe(data => { this.getTabledata(data) },
      //       error => {
      //         console.log("Error Occured from getPurcSessionshop()");
      //       });
      //   }
      // }



    }
  }

  ngAfterViewInit() {
    //Check Box in Table
    $(document).ready(function () {
      $('.checkAll').on('click', function () {
        $(this).closest('table').find('tbody :checkbox')
          .prop('checked', true)
          .closest('tr').toggleClass('selected', this.checked);
      });

      $('tbody :checkbox').on('click', function () {
        $(this).closest('tr').toggleClass('selected', this.checked);

        $(this).closest('table').find('.checkAll').prop('checked',
          ($(this).closest('table').find('tbody :checkbox:checked').length == $(this).closest('table').find('tbody :checkbox').length));
      });
    });
    $(document).ready(function () {
    });
  }

  openMyModal(event, index: number) {
    const getpurcSession = <FormArray>this.purchasesession.controls['purcsession'];
    let pSession = getpurcSession.value;
    let sid: any = pSession[index].indentid;
    this.sessionService.getPurcSessionview(sid).subscribe(data => {
      this.tablesessionview = data;
      if (data != null) {
        document.querySelector("#" + event).classList.add('md-show');
      }
      else {
        this.notificationsComponent.addToast({ title: 'Error', msg: 'Data Not Valid.', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      }
    },
      error => {
        console.log("Error Occured from getPurcSessiontable()");
      });

  }

  closeMyModal(event) {
    ((event.target.parentElement.parentElement).parentElement).classList.remove('md-show');
  }

  onSubmit() {
    alert("Empty");
  }
  public retValue: any;
  generatePurchaseSession(): any {
    this.retValue = this.invoiceDatavalidation();
    this.appComponent.ngOnInit();
    this.purchasesession.get('clientcdate').setValue(AppComponent.date);
    if (this.retValue = true) {
      this.sessionService.savePurcSession(JSON.stringify(this.purchasesession.value)).subscribe(
        (result: any) => {
          let res = result.res;
          if (res == true) {
            const getpurcSession = <FormArray>this.purchasesession.controls['purcsession'];
            this.sessionService.getSessiondata(JSON.stringify(getpurcSession.value)).subscribe(
              (result: any) => {
                let re = result.res;
                if (re == true) {
                  getpurcSession.controls = [];
                  this.purchasesession.reset();
                  this.purchasesession.get('shopid').setValue("");

                  // this.purchasesession.get('warehouseid').setValue("");
                  // this.purchasesession.get('hospitalid').setValue("");

                  this.purchasesession.get('companyid').setValue("opt1");
                  this.purchasesession.get('branchid').setValue("");
                  this.notificationsComponent.addToast({ title: 'Sucess Message', msg: 'Data Saved Sucessfully..', timeout: 5000, theme: 'default', position: 'top-right', type: 'success' });
                  this.openSuccessSwal();
                }
                else {
                  this.notificationsComponent.addToast({ title: 'Error', msg: 'Data Not Saved.', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
                }
              }
            );

          }
        }, (error: any) => {
          console.log(error['Errors']);
        }
      );
    }

  }
  invoiceDatavalidation(): Boolean {
    const getpurcSession = <FormArray>this.purchasesession.controls['purcsession'];
    let setData = getpurcSession.value;
    if (setData.length == '' || setData.length == null || setData.length == undefined) {
      this.notificationsComponent.addToast({ title: 'Error', msg: 'Your Table Data is Empty.', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      return false;
    }
    else {

    }
    return true;
  }
  removerow(index: number) {
    const getpurcSession = <FormArray>this.purchasesession.controls['purcsession'];
    getpurcSession.removeAt(index);
  }

  openSuccessSwal() {
    swal({
      title: 'Good job!',
      text: 'Data Saved Sucessfully',
      type: 'success'
    }).catch(swal.noop);
  }
}
   /*
<div class="form-group row">
                             <div class="chkdropdown" id="chkdropdown">
                                 --- Select Shop ----
                                 <ul>
                                     <li *ngFor="let shop of shoplists"><input type="checkbox" value="{{shop[0]}}" formControlName="shlist">{{shop[1]}}</li>
                                 </ul>
                             </div>
                     </div>
*/

