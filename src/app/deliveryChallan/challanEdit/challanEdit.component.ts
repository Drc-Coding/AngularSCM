
import {Component, OnInit  ,ViewChild   } from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {FormBuilder, FormGroup, Validators  , FormArray} from '@angular/forms';
import {CustomValidators} from 'ng2-validation';
import { DxDataGridComponent } from "devextreme-angular";
import {challanEditService} from './challanEdit.service' ;
import {NgbDropdownConfig} from '@ng-bootstrap/ng-bootstrap';
import {NotificationsComponent }  from  '../../notifications/notifications.component'  ;
import {dateFormatPipe }  from  '../../notifications/notifications.datepipe'  ;
import { AppComponent } from '../../app.component';

const textPattern = "[a-zA-Z][a-zA-Z ]+";
const textnumbers = '^[0-9]+(\.[0-9]{1,3})?$';


@Component({
  selector: 'app-deliverychallan',
  templateUrl: './challanEdit.component.html',
  styleUrls:['./challanEdit.component.css'],
  providers: [challanEditService ,NgbDropdownConfig ,NotificationsComponent  ,  dateFormatPipe]
 
})
export class challanEditComponent implements OnInit {





  stkval =[];
  id: number;


  private sub:any;

shid = []

  $: any;
  EditDeliveryForm: any;
  isDesc: boolean = false;
  column;
  brandlist = [];
  branddata = [];
  returnValid: any;
  distibutor: Array<any>
  distributors=[];
  salesinvoice=[];
  distvalues = [''];
  characters = [];
  destination =[];
  purtax = [];
  localstore = [];
  firms=[];
  x;
  polist = [];
  coltax: any;
  constructor(private invoiceService: challanEditService, private router: ActivatedRoute, private formBuilder: FormBuilder, private notificationsComponent: NotificationsComponent, private appComponent: AppComponent) {
    this.EditDeliveryForm = this.formBuilder.group({
      productid: ['', []],
      pino: ['', []],    
      deliverytype: ['', []],
      previouspurchaseitem: ['', []],    
      totalproduct: ['', []],
      totalqty: ['', []],
      totalboxqty:['',[]],
      totaltabqty:['',[]],
      totalstripqty:['',[]],
      brandcode: ['', []],
      brandname: ['', []],
      batchno:['123',[]],
      totalamt: ['', []],   
      taxableamount: ['', []],
      companyrefid: ['', []],
      branchrefid: ['', []],
      locname: ['', []],
      locrefid: ['', []],
      clientcdate: ['', []],
      deliverydate:['',[]],
      stockno:['', []],
      fromlocrefid:['',[]],
      fromlocname:['',[]],   
      tolocname:['',[]],
      tolocrefid:['',[]],
      dcno:['',[]],
      brandDetails: this.formBuilder.array([
      ]),
    });

  }
  ngOnInit() {


  

    this.sub = this.router.params.subscribe(params => {
      this.id = +params['id'];
    });



    this.invoiceService.getUserShop(AppComponent.companyID,AppComponent.locrefID).subscribe(data => { this.firms = data },
      err => {
         console.log('Error Occured Get Warehouse');
      });

    //Auto Increment        
    
    //Here to Set Default Values For DropDownBoxes
    this.EditDeliveryForm.get('companyrefid').setValue(AppComponent.companyID);
    this.EditDeliveryForm.get('branchrefid').setValue(AppComponent.branchID);
    this.EditDeliveryForm.get('locname').setValue(AppComponent.locrefID1);
    this.EditDeliveryForm.get('locrefid').setValue(AppComponent.locRefName1);
    this.EditDeliveryForm.get('fromlocname').setValue(AppComponent.locrefID1);
    this.EditDeliveryForm.get('fromlocrefid').setValue(AppComponent.locRefName1);
    

   

    if (AppComponent.usertype == "\"SuperAdmin\" ") {
     /* this.invoiceService.getTransfer(AppComponent.companyID, AppComponent.branchID, AppComponent.shopID, AppComponent.locrefID).subscribe(data => this.distibutor = data,
        err => {
          console.log('Error Occured on Get Distributor Details');
        }); */

       this.invoiceService.getAutoIncr(AppComponent.companyID, AppComponent.branchID, AppComponent.shopID, AppComponent.locrefID).subscribe(data => { this.EditDeliveryForm.get('dcno').setValue(data.toString()); },
        err => {
          console.log('Error Occured Get AutoIncrement');
        });
     
      /*Get Tax inclusive Or Exclusive*/
     
    /*  this.invoiceService.getTaxmaster(AppComponent.companyID, AppComponent.branchID, AppComponent.shopID, AppComponent.locrefID).subscribe(data => {
        this.coltax = data
        if (data[0] == 0) {
          $("#colhide").hide();
          $('.colhide').hide();
          $("#colvathide").show();
          $('.colvathide').show();
        }
        if (data[0] == 1) {
          $("#colvathide").hide();
          $('.colvathide').hide();
          $("#colhide").show();
          $('.colhide').show();
        }
      },
        err => {
          console.log('Console Error getTaxmaster()');
        }
      );*/

    }else{
     /* this.invoiceService.getTransfer(AppComponent.companyID, AppComponent.branchID, AppComponent.shopID, AppComponent.locrefID).subscribe(data => this.distibutor = data,
        err => {
          console.log('Error Occured on Get Distributor Details');
        });*/
     
      /*Get Tax inclusive Or Exclusive*/
      this.invoiceService.getAutoIncr(AppComponent.companyID, AppComponent.branchID, AppComponent.shopID, AppComponent.locrefID).subscribe(data => { this.EditDeliveryForm.get('dcno').setValue(data.toString()); },
      err => {
        console.log('Error Occured Get AutoIncrement');
      });
     
     /* this.invoiceService.getTaxmaster(AppComponent.companyID, AppComponent.branchID, AppComponent.shopID, AppComponent.locrefID).subscribe(data => {
        this.coltax = data
        if (data[0] == 0) {
          $("#colhide").hide();
          $('.colhide').hide();
          $("#colvathide").show();
          $('.colvathide').show();
        }
        if (data[0] == 1) {
          $("#colvathide").hide();
          $('.colvathide').hide();
          $("#colhide").show();
          $('.colhide').show();
        }
      },
        err => {
          console.log('Console Error getTaxmaster()');
        }
      );
       */
    }



    this.invoiceService.getEditDeliveryChallan(AppComponent.companyID, AppComponent.branchID, 
      AppComponent.locRefName1, AppComponent.locrefID1, this.id).subscribe(data=>{ this.fieldset(data)
    
    
    },
    
    err=> {
console.log("Error occured getEditDeliveryChallan");

    });



    this.invoiceService.getEditDeliveryProduct(AppComponent.companyID, AppComponent.branchID, 
      AppComponent.locRefName1, AppComponent.locrefID1, this.id).subscribe(data=>{this.getTabledata(data) , alert(data)

    
    
    },
    
    err=> {
console.log("Error occured getEditDeliveryChallan");

    });



    // this.invoiceService.getLocname(this.EditDeliveryForm.get('tolocname').value).subscribe(data=> {this.firms =data},
      
      
    //   err => {
    //     console.log('Error Occured Get getLocname');
    //   });



      this.invoiceService.getShid(this.id).subscribe(data => {this.stkval=data[0][0] ,alert(data[0][0] + " stkval"), this.firms = data[0][0]}, 
        
          err => {

console.log('Error occured getShid');


        });



    
  } //ngoninit end


  getStock(searchValue: string) {

    if (AppComponent.usertype == "\"SuperAdmin\" ") {


      this.invoiceService.getSuperStockNo(searchValue).subscribe(data => {
        this.distributors = [];
        for (let i = 0; i < data.length; i++) {
          this.distributors.push({ value: data[i][0], label: data[i][1] });
        }
      });
    } else {
      this.invoiceService.getStockNo(searchValue,AppComponent.companyID, AppComponent.branchID, AppComponent.locRefName1, AppComponent.locrefID1).subscribe(data => {
        this.distributors=[];
        for (let i = 0; i < data.length; i++) {
          this.distributors.push({ value: data[i][0], label: data[i][1] });
        }
      });



    }
  }





  getFirm() {
   
    if (AppComponent.usertype == "\"SuperAdmin\" ") {
      
      if(this.EditDeliveryForm.get('tolocname').value==1){   
       this.invoiceService.getShop(this.EditDeliveryForm.get('tolocname').value).subscribe(data => { this.firms = data },
      err => {
        console.log('Error Occured Get Shop');
      });
    }

    if(this.EditDeliveryForm.get('tolocname').value==2){        
    this.invoiceService.getWareHouse(this.EditDeliveryForm.get('tolocname').value).subscribe(data => { this.firms = data },
      err => {
        console.log('Error Occured Get Warehouse');
      });
    }

    if(this.EditDeliveryForm.get('tolocname').value==3){         
    this.invoiceService.getHospital(this.EditDeliveryForm.get('tolocname').value).subscribe(data => { this.firms = data  },
      err => {
        console.log('Error Occured Get Hospital');
      });
    }
    }else{
      
      
      if(this.EditDeliveryForm.get('tolocname').value==1){  

        this.invoiceService.getUserShop(AppComponent.companyID,AppComponent.locrefID).subscribe(data => { this.firms = data },
          err => {
             console.log('Error Occured Get Warehouse');
          });
     
      }
      if(this.EditDeliveryForm.get('tolocname').value==2){  
        this.invoiceService.getUserWareHouse(AppComponent.companyID,AppComponent.locrefID).subscribe(data => { this.firms = data },
          err => {
             console.log('Error Occured Get Warehouse');
          });

      }
      if(this.EditDeliveryForm.get('tolocname').value==3){  
        this.invoiceService.getUserHospital(AppComponent.companyID,AppComponent.locrefID).subscribe(data => { this.firms = data },
          err => {
             console.log('Error Occured Get Warehouse');
          });
      }
    }

  }
    





  public setvatTax: boolean = false;
  public setgstTax: boolean = false;



  fieldset(data: any){
    if (data != null || data != undefined) {

      alert(data[0][9] + " 999999");

      alert(data[0][4] + " totaltabqty");
    this.EditDeliveryForm.get('tolocname').setValue(data[0][8]);
    this.EditDeliveryForm.get('deliverydate').setValue(data[0][2]);
    this.EditDeliveryForm.get('totaltabqty').setValue(data[0][7]);
    this.EditDeliveryForm.get('totalproduct').setValue(data[0][3]);
    this.EditDeliveryForm.get('tolocrefid').setValue(data[0][9]);
    this.EditDeliveryForm.get('stockno').setValue(data[0][0]);
    
    


  

    //this.distributors.push({ value: data[i][0], label: data[i][1] });
    }
  }




  getTabledata(data: any) {

const getData = <FormArray>this.EditDeliveryForm.controls['brandDetails'];

getData.controls = [];

  
    if (data !== undefined || data !== null) {
      let flag: number = 0;
      const getData = <FormArray>this.EditDeliveryForm.controls['brandDetails'];
      let setData = getData.value;
      for (this.i = 0; this.i < data.length; this.i++) {
        for (this.x = 0; this.x < setData.length; this.x++) {
          if (data[this.i][0] == setData[this.x].productid) {
            flag = 1;
          }
        }
        if (flag == 1) {
          this.notificationsComponent.addToast({ title: 'Error Message', msg: 'The  ' + data[this.i][1].toUpperCase() + '  Product Already Exist...', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
        }
        else {
          //if (this.coltax[0] == 0) {
          //   this.setvatTax = true;
          //   $("#colvathide").show();
          //   $('.colvathide').show();
          //   $("#colhide").hide();
          //   $('.colhide').hide();
          // }
          // if (this.coltax[0] == 1) {
          //   this.setgstTax = true;
          //   $("#colvathide").hide();
          //   $('.colvathide').hide();
          //   $("#colhide").show();
          //   $('.colhide').show();
          // }
          getData.push(this.showBrandlist(
            data[this.i][0],
            data[this.i][1],
            data[this.i][2],
            data[this.i][3],
            data[this.i][4],
            data[this.i][5],
            data[this.i][6],
            data[this.i][7],
            data[this.i][8],
            data[this.i][9],
            data[this.i][10],
            data[this.i][11],
            data[this.i][12]
          ));
        }
      }
    
      this.EditDeliveryForm.get('brandcode').setValue("");

     





      this.characters = [];
      this.getSum();
    }
  }
  showBrandlist(pid: any, pname: any, form: any, dosage: any, mfrg: any,  tqty:any, btno:any, vats: any,
    gsts: any, cgsts: any, mrps: any, sgsts: any, dosageId: number) {
    return this.formBuilder.group({  
      drugproductrefid: [pid, []],
      dcrefid:['',[]],
      productname: [pname, []],
      batchno: [btno, []],
      boxqty: ['0', Validators.pattern(textnumbers)],
      stripqty: ['0', Validators.pattern(textnumbers)],
      tabqty: [tqty, Validators.pattern(textnumbers)],         
      totalqty: ['', []],     
    });
  }

  /**Table calculation Start **/
  i;
  j;
  m;
  imagepath: string;
  sbQuantity = [];


  getSum() {
    /** Declare Given Table Datas**/
  
    let txtproduct: number = 0;
    let txttabletquantity: any = 0;
    let txtstripquantity: any = 0;
    let txtboxquantity: any = 0; 
    /** To set and calculate Given Table Datas into total values(formcontrolname) **/
    let totalproduct: any = 0;
    let totalQuantity: any = 0;
    let BoxQuantity: any=0;
    let StripQuantity: any=0;
    let TabQuantity: any=0;
    const getData = <FormArray>this.EditDeliveryForm.controls['brandDetails'];
    let setData = getData.value;   
    let purcTax: any = this.purtax;
    let k: number = 0;
    let Stripperbox: any;
    let Quantityperstrip: any;
    for (this.j = 0; this.j < setData.length; this.j++) {  
     
      this.getSBQuantity(setData[this.j].drugproductrefid);
      
      Stripperbox = this.sbQuantity[0][0];
      Quantityperstrip = this.sbQuantity[0][1];
      /* To Get Total Products */
      if (parseInt(setData.length) !== null) {
        txtproduct = parseInt(setData.length);      
      }
      /* Tablet Quantity */
      if (setData[this.j].tabqty == '' || parseFloat(setData[this.j].tabqty) == null) {
        setData[this.j].tabqty = 0;
        txttabletquantity = 0;
      }
      else {
        txttabletquantity = parseFloat(setData[this.j].tabqty);
        TabQuantity+=parseFloat(setData[this.j].tabqty);
      }
      /* Strip Quantity */
      if (setData[this.j].stripqty == '' || parseFloat(setData[this.j].stripqty) == null) {
        setData[this.j].stripqty = 0;
        txtstripquantity = 0;
      }
      else {
        txtstripquantity = parseFloat(setData[this.j].stripqty) * Quantityperstrip;
        StripQuantity+=parseFloat(setData[this.j].stripqty);
      }
      /* Box Quantity */
      if (setData[this.j].boxqty == '' || parseFloat(setData[this.j].boxqty) == null) {
        setData[this.j].boxqty = 0;
        txtboxquantity = 0;
      }
      else {
        txtboxquantity = parseFloat(setData[this.j].boxqty) * Stripperbox * Quantityperstrip;
        BoxQuantity+=parseFloat(setData[this.j].boxqty);
      }


     
      /* Row Wise SubTotal Amount */
    
      
      setData[this.j].totalqty = txttabletquantity + txtstripquantity + txtboxquantity;

      /* To Patch values Row wise */
      getData.patchValue(setData);
      /* Toatl Calculation*/
      totalproduct = txtproduct;
      totalQuantity += txttabletquantity + txtstripquantity + txtboxquantity;          
      /* To Set value from Table calculation Final Values on Input types*/
      this.EditDeliveryForm.get('totalproduct').setValue(totalproduct);
      this.EditDeliveryForm.get('totalqty').setValue(totalQuantity);   
      this.EditDeliveryForm.get('totalboxqty').setValue(BoxQuantity);  
      this.EditDeliveryForm.get('totalstripqty').setValue(StripQuantity);  
      this.EditDeliveryForm.get('totaltabqty').setValue(TabQuantity);      
      //To set Temporary Values In Bottom Input types    
    }
  }


































  getSBQuantity(id: number) {
    this.invoiceService.getSBQuantity(id).subscribe(data => {this.sbQuantity = data }),
      error => {
        console.log("Error Occured on getSBQuantity");
      }
  }

  /* Table calculation End*/
  // keyup while typing show data...keyup.enter  while entering show data..keydown.Tab while tab 
  removeRow(index: number) {
    alert("RemoveRow"+index);
    const getData = <FormArray>this.EditDeliveryForm.controls['brandDetails'];
    getData.removeAt(index);
    this.getSum();
    let removeVal = getData.value;
    if (removeVal == null || removeVal == '') {
      this.EditDeliveryForm.reset();
      this.ngOnInit();
    }
  }

  
  onSubmit(): any {
    this.returnValid = this.invoiceDatavalidation();
    if (this.returnValid == true) {
      this.appComponent.ngOnInit();
      this.EditDeliveryForm.get('clientcdate').setValue(AppComponent.date);
      this.invoiceService.getDeliveryChallan(JSON.stringify(this.EditDeliveryForm.value)).subscribe( 
        data => { 
         // alert(data);
          if (data == true) {
            const saveData = this.EditDeliveryForm.controls['brandDetails'];          
            this.invoiceService.getDeliveryChallanProduct(JSON.stringify(saveData.value)).subscribe(                    
            data => { 
              if(data==true){
                this.notificationsComponent.addToast({ title: 'SUCCESS MESSAGE', msg: 'DATA SAVED SUCCESSFULLY..', timeout: 5000, theme: 'success', position: 'top-right', type: 'success' });
                window.location.href = "/DeliveryChallan/ViewDeliveryReceipt";
              }
            },
            error => {
              console.log("Error createPurchaseOrderProduct");
            }
      );
      }
    } );
    }
    
  }

  invoiceDatavalidation(): Boolean {
    const getData = this.EditDeliveryForm.controls['brandDetails'];
    let setData = getData.value;
    if (this.EditDeliveryForm.get('tolocname').value == "opt1") {
      this.notificationsComponent.addToast({ title: 'ERROR MESSAGE', msg: 'PLS SELECT LOCATION TYPE', timeout: 5000, theme: 'default', position: 'bottom-right', type: 'error' });
      return false;
    } else if (this.EditDeliveryForm.get('tolocrefid').value == "opt1") {
      this.notificationsComponent.addToast({ title: 'ERROR MESSAGE', msg: 'PLS SELECT LOCATION NAME', timeout: 5000, theme: 'default', position: 'bottom-right', type: 'error' });
      return false;
    }else if (this.EditDeliveryForm.get('deliverydate').value == '' || this.EditDeliveryForm.get('deliverydate').value == null) {
      this.notificationsComponent.addToast({ title: 'ERROR MESSAGE', msg: 'PLS SELECT DELIVERY CHALLAN DATE', timeout: 5000, theme: 'default', position: 'bottom-right', type: 'error' });
      return false;
    }  
    else if (setData.length == '' || setData.length == null || setData.length == undefined) {
      this.notificationsComponent.addToast({ title: 'Error Message', msg: ' Your Table Data is Empty..', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      return false;
    }
    return true;
  }



  ngAfterViewInit() {
    $(document).ready(function () {
      var minlength = 2;
      var searchRequest = null;
      $("#brand").on("input", function () {
        var that = this,
          value = $(this).val();
        if (value.length >= minlength) {
          if (searchRequest != null)
            searchRequest.abort();
          searchRequest = $.ajax({
            type: "GET",
            url: '/api/getPibrandlist' + '/' + value,
            dataType: "json",
            success: function (data) {
              $("#brandlist").empty();
              for (var i = 0; i < data.length; i++) {
                $("#brandlist").append("<option value='" + data[i] + "'></option>");
              }
            },
            error: function (data) {
              $("#brandlist").val('');
              console.log("No Data Available");
            }

          });
        }
      });
    });
    //remove Row
    $(document).ready(function () {
      $(".removebutton").click(function () {
        $("table tbody").find('input[name="check"]').each(function () {
          if ($(this).is(":checked")) {
            if (confirm("Are you sure you want to delete..")) {
              $(this).closest("tr").remove();
            }
          }
        });

      });
    });
    //Search outer
    var elem = $('#searchorder')[0];
    $(document).on('click', function (e) {
      if ($(e.target).closest(elem).length === 0) {
        $(elem).hide();
      }
    });

    $(document).ready(function () {
      var inv = [];
      setInterval(function search() {
        var hos = $("#searchproduct").val();
        if (hos == 0 || hos == null) {
          $("#searchorder").hide();
        } else {
          $("#searchorder").show();
        }
        if (hos != 0 && hos != null) {
          $.ajax({
            type: "GET",
            contentType: "application/json",
            url: "/api/getTest",
            data: {
              'val': hos
            },
            success: function (data) {
              inv.push(data);
              $('#searchorder .form75').each(function () {
                $(this).val("");
              });
              var i = 0;
              $('#searchorder .form75').each(function () {
                $(this).val(data[i]);
                i++;
              });
            },
            error: function (e) {
              $('#searchorder .form75').each(function () {
                $(this).val("");
              });
            }
          });
        }
      }, 570);
    });
    //Panel Show and Hide 
    $(document).ready(function () {
      $("#flip").click(function () {
        $("#panel").slideToggle("slow");
      });
    });

    //Check Box in Table
    $(document).ready(function () {
      $('.checkAll').on('click', function () {
        $(this).closest('table').find('tbody :checkbox')
          .prop('checked', this.checked)
          .closest('tr').toggleClass('selected', this.checked);
      });

      $('tbody :checkbox').on('click', function () {
        $(this).closest('tr').toggleClass('selected', this.checked);

        $(this).closest('table').find('.checkAll').prop('checked',
          ($(this).closest('table').find('tbody :checkbox:checked').length == $(this).closest('table').find('tbody :checkbox').length));
      });
    });

  }
  //Search Box
  insertDrug(articleId: number) {
    var n = 56;
    var rt = $("#searchorder li:nth-child(" + articleId + ") .form75").val();
    $("#searchproduct").val(rt);
    $("#searchproduct").focus();
    $("#searchorder").hide();
  }

  upDown(event: KeyboardEvent, articleId: number) {
    var nr: number;
    var n = 74;
    if (event.keyCode == 13) {
      $(".dropdown-menu").hide();
      var rt = $("#searchorder li:nth-child(" + articleId + ") .form75").val();
      $("#searchproduct").val(rt);
      $("#searchproduct").focus();
      $("#searchorder").hide();
    }
    if (event.keyCode == 9) {
      if (articleId == 0) {
        $("#searchorder li:nth-child(" + articleId + ") input").focus();
      }
    }
    if (event.keyCode == 38) {
      var nr = articleId - 1;
      if (nr == 0) {
        $("#searchproduct").focus();
      } else {
        $("#searchorder li:nth-child(" + nr + ") input").focus();
      }
    }
    if (event.keyCode == 40) {
      var nr = articleId + 1;
      $("#searchorder li:nth-child(" + nr + ") input").focus();

    }
  }

  /**TO CONVERT PURCHASE ORDER TO PURCHASE INCOICE START**/
  getStockNumber(): any {     
    this.invoiceService.getStockTransferProduct(this.EditDeliveryForm.get('stockno').value).subscribe(data => { this.pushTableData(data) },
      error => {
        console.log('Error occured On getPotablelist()');
      });
  }



  pushTableData(data: any) {


    const getData = <FormArray>this.EditDeliveryForm.controls['brandDetails'];

getData.controls = [];


    if (data !== undefined || data !== null) {
      let flag: number = 0;
      const getData = <FormArray>this.EditDeliveryForm.controls['brandDetails'];
      let setData = getData.value;    
      for (this.i = 0; this.i < data.length; this.i++) {
        for (this.x = 0; this.x < setData.length; this.x++) {
          if (data[this.i][0] == setData[this.x].productid) {
            flag = 1;
          }
        }
        if (flag == 1) {
          this.notificationsComponent.addToast({ title: 'Error Message', msg: 'The  ' + data[this.i][1].toUpperCase() + '  Product Already Exist...', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
        }
        else {         
        /*  if (this.coltax[0] == 0) {
            this.setvatTax = true;
            $("#colvathide").show();
            $('.colvathide').show();
            $("#colhide").hide();
            $('.colhide').hide();
          }
          if (this.coltax[0] == 1) {
            this.setgstTax = true;
            $("#colvathide").hide();
            $('.colvathide').hide();
            $("#colhide").show();
            $('.colhide').show();
          }*/        
          getData.push(this.showPOdata(
            data[this.i][0],
            data[this.i][1],
            data[this.i][2],
            data[this.i][3],
            data[this.i][4],         
          ));
        }
      }
      this.EditDeliveryForm.get('brandcode').setValue("");
      this.EditDeliveryForm.get('productid').setValue("");
      this.getSum();
    }
  }

  showPOdata(pid: any, barandname: any, bqty: any, sqty: any, tabqty: any): any {   
    return this.formBuilder.group({
      drugproductrefid: [pid, []],
      dcrefid:['',[]],
      productname: [barandname, []],
      batchno:['',[]],
      boxqty: [bqty, [Validators.pattern(textnumbers)]],
      stripqty: [sqty, [Validators.pattern(textnumbers)]],
      tabqty: [tabqty, [Validators.pattern(textnumbers)]],    
      totalqty: ['', []]    
    });
  }







}