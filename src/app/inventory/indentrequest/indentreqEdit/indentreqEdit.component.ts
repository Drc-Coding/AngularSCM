
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';


import { DxDataGridComponent } from "devextreme-angular";



import { indentreqEditService } from './indentreqEdit.service';


import { NgbDropdownConfig } from '@ng-bootstrap/ng-bootstrap';



import { NotificationsComponent } from '../../../notifications/notifications.component';




import { dateFormatPipe } from '../../../notifications/notifications.datepipe';


import { AppComponent } from '../../../app.component';




@Component({
  selector: 'app-patientedit',
  templateUrl: './indentreqEdit.component.html',
  providers: [indentreqEditService, NgbDropdownConfig, NotificationsComponent, dateFormatPipe]

})
export class indentreqEditComponent implements OnInit {



  registerForm: FormGroup;

  id: number;

  private sub: any;

  destination = [];


  indentrequests = [];

  indentrequest = [];

  indentrequestedit = [];

  autodata = [];

  i;


  autoincr;
  autoval = 0;

  autoinc = 0;
  selobj;

  editdata = [];


  constructor(private userService: indentreqEditService
    , private dateformat: dateFormatPipe, private notificationsComponent: NotificationsComponent, private formBuilder: FormBuilder, config: NgbDropdownConfig, private route: ActivatedRoute, private route1:Router) {

    config.autoClose = false;
  }

  ngOnInit() {



    this.selobj = {
      userid: AppComponent.userID, locrefid: AppComponent.locrefID1, locname: AppComponent.locRefName1, countryrefid: AppComponent.countryID, companyid: AppComponent.companyID
      , branchrefid: AppComponent.branchID, vatdispflag: AppComponent.vatDispFlag, boxdispflag: AppComponent.BoxDispFlag
      , stripdispflag: AppComponent.StripDispFlag, tabdispflag: AppComponent.TabDispFlag
    };

    this.sub = this.route.params.subscribe(params => {
      this.id = +params['id'];
    });

    this.registerForm = this.formBuilder.group({

      id: [, []],
      indentno: [, []],
      indentdate: [, []],
      pirority: [, []],

      fromlocrefid: [this.selobj.locrefid, []],
      fromlocname: [this.selobj.locname, []],
      tolocrefid: [, []],
      tolocname: [, []],

      totalqty: [, []],


      createdby: [this.selobj.userid, []],
      locrefid: [this.selobj.locrefid, []],
      locname: [this.selobj.locname, []],
      countryrefid: [this.selobj.countryrefid, []],
      companyrefid: [this.selobj.companyid, []],
      branchrefid: [this.selobj.branchrefid, []],

      autonamenew: [, []],


      indapprflag: [, []],
      clientcdate: [this.dateformat.transform04(), []],
      clientcdate1: [this.dateformat.transform04(), []],

      date: [, []],

      invdispflag: [, []],

      namefromlocname: [, []],
      namefromlocrefid: [, []],
      nametolocname: [, []],
      nametolocrefid: [, []],


      vatdispflag: [this.selobj.vatdispflag, []],
      boxdispflag: [this.selobj.boxdispflag, []],
      stripdispflag: [this.selobj.stripdispflag, []],
      tabdispflag: [this.selobj.tabdispflag, []],

       // stkminno: [, []],
      // stdate:[, []],


     stkminrefid: [0, []],



      indreq: this.formBuilder.array([

      ]),




      dummy: this.formBuilder.array([

      ]),


    });




    $(document).ready(function () {
      $('#autolist').hide();
    });



    var frmdata = { frmint1: '', frmstr1: '', createdby: '', locrefid: this.selobj.locrefid, locname: this.selobj.locname, companyid: this.selobj.companyid };
    this.userService.viewIndentRequests(JSON.stringify(frmdata)).subscribe(data => { this.indentrequests = data },
      errorCode => console.log(errorCode));

    this.userService.viewIndentRequestsAll(JSON.stringify(frmdata)).subscribe(data => { this.editdata = data },
      errorCode => console.log(errorCode));





      var indentreqid = { indentreqid: this.id };
      this.userService.businessName(JSON.stringify(indentreqid)).subscribe(data => this.destination = data,
        errorCode => console.log(errorCode));







    this.viewIndentRequest(this.id);
    this.viewIndentProduct(this.id);



    this.init();

    if (this.id) {
      this.registerForm.get('invdispflag').setValue(1);
    } else {
      this.registerForm.get('invdispflag').setValue(0);

    }




  }



  autofocusin() {



    this.autoincr = setInterval(() => {

      if (this.registerForm.get('autonamenew').value) {


        $('#autolist').show();


        if (this.autoval == this.registerForm.get('autonamenew').value) {


          this.autoinc += 1;


        } else {

          this.autoinc = 0;
        }


        this.autoval = this.registerForm.get('autonamenew').value;

        if (this.autoinc < 1) {
          var frmdata = { frmint1: '', frmstr1: this.registerForm.get('autonamenew').value, createdby: '', locrefid: this.selobj.locrefid, locname: this.selobj.locname, companyid: this.selobj.companyid };
          this.userService.viewServCustProducts(JSON.stringify(frmdata)).subscribe(data => { this.autodata = data },
            errorCode => console.log(errorCode));

        }


      }

    }, 610);


  }






  autofocusout() {


    if (this.registerForm.get('autonamenew').value) {


    } else {

      $('#autolist').hide();
    }


    clearInterval(this.autoincr);


  }


  autokeyselect(event: KeyboardEvent, articleId: number) {


    var autoincrflag: number;


    if (event.keyCode == 38) {

      var autoincrflag = articleId - 1;

      if (autoincrflag == 0) {
        $("#autoname").focus();
      } else {
        $("#autolist li:nth-child(" + autoincrflag + ") input").focus();
      }
    }

    if (event.keyCode == 40) {


      var autoincrflag = articleId + 1;

      $("#autolist li:nth-child(" + autoincrflag + ") input").focus();
    }

    if (event.keyCode == 13) {

      var drg = this.autodata[articleId - 1][0];


      var frmdata = { frmint1: drg, frmstr1: '', createdby: '', locrefid: this.selobj.locrefid, locname: this.selobj.locname, companyid: this.selobj.companyid };

      this.userService.viewIrqCustProduct(JSON.stringify(frmdata)).subscribe(data => { this.viewServCustProduct(data) },
        errorCode => console.log(errorCode));


      $("#autoname").focus();


      this.registerForm.get('autonamenew').setValue('');

      this.autodata = [];
    }



  }



  onSubmit() {

    var valflag = 0;

    const control = <FormArray>this.registerForm.controls['indreq'];

  

    var answer = confirm("Save data?");


    //  if (answer &&  valflag==0 && parseInt( this.registerForm.get("indapprflag").value )==0)

    if (answer) {
     


  this.selobj = { userid: AppComponent.userID, locrefid: AppComponent.locrefID1, locname: AppComponent.locRefName1, 
   countryrefid: AppComponent.countryID, companyid: AppComponent.companyID, branchrefid: AppComponent.branchID };

 
   this.viewDestination();
        
  

      this.userService.saveIndentRequest(JSON.stringify(this.registerForm.value)).subscribe(data => { this.saveIndentProducts(data),  
        this.route1.navigate(['RequisitionForm/ViewRequisitionForm']); },
        errorCode => console.log(errorCode));

          }
    this.viewLocationId(AppComponent.locRefName1, AppComponent.locrefID1);

  } //onsubmit end






  



  saveIndentProducts(data: any) {



    const control = <FormArray>this.registerForm.controls['indreq'];
    if (data == 1) {
      this.userService.saveIndentProducts(JSON.stringify(control.value)).subscribe(data => { this.savevalid(data) },
        errorCode => console.log(errorCode));
    }


  }


  savevalid(data: any) {
    if (data == 1) {


      this.notificationsComponent.addToast({ title: 'Success', msg: 'Data  Saved  ', timeout: 5000, theme: 'default', position: 'top-right', type: 'success' });

      this.clear();
    } else {

      this.notificationsComponent.addToast({ title: 'Error', msg: 'Data Not  saved  ', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });

    }
  }

  viewServCustProduct(data: any) {


    const control = <FormArray>this.registerForm.controls['indreq'];



    control.insert(0, this.formBuilder.group({

      id: [, []],
      indentrefid: [this.registerForm.get('id').value, []],
      drugprdrefid: [data[0][1], []],

      batchno: [, []],
      boxqty: [, []],
      stripqty: [, []],
      tabqty: [, []],
      qty: [, []],

      drugname: [data[0][0], []],

      boxconvdrg: [data[0][2], []],
      stripconvdrg: [data[0][3], []],
      minqty: [data[0][4], []],
      maxqty: [data[0][5], []],


      createdby: [this.selobj.userid, []],
      locrefid: [this.selobj.locrefid, []],
      locname: [this.selobj.locname, []],
      countryrefid: [this.selobj.countryrefid, []],
      companyrefid: [this.selobj.companyid, []],
      branchrefid: [this.selobj.branchrefid, []],
      clientcdate: [this.dateformat.transform04(), []],
      clientcdate1: [this.dateformat.transform04(), []],


      delflag: [false, []],
      calcflag: [0, []],

    }));



  }





  viewLocationId(id1: any, id2: any) {

    if (id1 == 1) {
      this.registerForm.get('namefromlocname').setValue('Shop');

    } else if (id1 == 2) {
      this.registerForm.get('namefromlocname').setValue('warehouse');
    } else if (id1 == 3) {
      this.registerForm.get('namefromlocname').setValue('hospital');

    }

    this.registerForm.get('namefromlocrefid').setValue('');



    var frmdata1 = { frmint1: id1, frmint2: id2, frmstr1: '', createdby: '', locrefid: this.selobj.locrefid, locname: this.selobj.locname, companyid: this.selobj.companyid };

    this.userService.viewLocName(JSON.stringify(frmdata1)).subscribe(data => { this.registerForm.get('namefromlocrefid').setValue(data[0][1]) },
      errorCode => console.log(errorCode));


  }




  viewLocationId2() {



    var frmdata1 = { frmint1: this.registerForm.get('tolocname').value, frmint2: this.registerForm.get('tolocrefid').value, frmstr1: '', createdby: '', locrefid: this.selobj.locrefid, locname: this.selobj.locname, companyid: this.selobj.companyid };

    this.userService.viewLocName(JSON.stringify(frmdata1)).subscribe(data => { this.registerForm.get('nametolocrefid').setValue(data[0][1]) },
      errorCode => console.log(errorCode));


  }










  // viewDestination() {

  //   var destid = 0;



  //   destid = this.registerForm.get('tolocname').value;

  //   if (destid == 2) {
  //     var frmdata = { frmint1: '', frmstr1: '', createdby: '', locrefid: this.selobj.locrefid, locname: this.selobj.locname, companyid: this.selobj.companyid };
  //     this.userService.viewWareHouse(JSON.stringify(frmdata)).subscribe(data => { this.destination = data },
  //       errorCode => console.log(errorCode));

  //   } else if (destid == 1) {
  //     var frmdata = { frmint1: '', frmstr1: '', createdby: '', locrefid: this.selobj.locrefid, locname: this.selobj.locname, companyid: this.selobj.companyid };
  //     this.userService.viewshopinformation(JSON.stringify(frmdata)).subscribe(data => { this.destination = data },
  //       errorCode => console.log(errorCode));


  //   } else if (destid == 3) {
  //     var frmdata = { frmint1: '', frmstr1: '', createdby: '', locrefid: this.selobj.locrefid, locname: this.selobj.locname, companyid: this.selobj.companyid };
  //     this.userService.viewHospital(JSON.stringify(frmdata)).subscribe(data => { this.destination = data },
  //       errorCode => console.log(errorCode));


  //   }


//  }

viewDestination(){

  var destid=0  ;

  destid =this.registerForm.get('tolocname').value  ;

  if(destid==2){

     this.registerForm.get('nametolocname').setValue('warehouse')

var   frmdata={ frmint1 : '' ,  frmstr1  :'', createdby  :'' , locrefid  :this.selobj.locrefid , locname  :this.selobj.locname   , companyid  :this.selobj.companyid   } ;
   this.userService.viewWareHouse(JSON.stringify(frmdata)).subscribe(data => {this.destination=data},
   errorCode => console.log(errorCode));

  }else if(destid==1){

     this.registerForm.get('nametolocname').setValue('Shop')  ;

   var   frmdata={ frmint1 : '' ,  frmstr1  :'', createdby  :'' , locrefid  :this.selobj.locrefid , locname  :this.selobj.locname   , companyid  :this.selobj.companyid  } ;
   this.userService.viewshopinformation(JSON.stringify(frmdata)).subscribe(data => {this.destination=data},
     errorCode => console.log(errorCode));


  }else if(destid==3){

     this.registerForm.get('nametolocname').setValue('hospital')

   var   frmdata={ frmint1 : '' ,  frmstr1  :'', createdby  :'' , locrefid  :this.selobj.locrefid , locname  :this.selobj.locname   , companyid  :this.selobj.companyid  } ;
   this.userService.viewHospital(JSON.stringify(frmdata)).subscribe(data => {this.destination=data},
     errorCode => console.log(errorCode));
   }



  }


  viewEdit() {

    var indid = this.registerForm.get('id').value;


    this.viewIndentRequest(indid);

    this.viewIndentProduct(indid);


  }



  viewIndentRequest(id: number) {


    this.indentrequest = [];
    var frmdata = { frmint1: id, frmstr1: '', createdby: '', locrefid: this.selobj.locrefid, locname: this.selobj.locname, companyid: this.selobj.companyid };
    this.userService.viewIndentRequest(JSON.stringify(frmdata)).subscribe(data => { this.indentrequest = data, this.viewServIndentRequest(data) },

      errorCode => console.log(errorCode));



  }


  viewServIndentRequest(data: any) {


    var i = 0;

    this.registerForm.patchValue({


      id: data[0][i++],
      indentno: data[0][i++],
      date: data[0][i++],

      tolocrefid: data[0][i++],
      tolocname: data[0][i++],

      clientcdate: data[0][i],
      clientcdate1: data[0][i++],

      createdby: this.selobj.userid,
      locrefid: this.selobj.locrefid,
      locname: this.selobj.locname,

      countryrefid: this.selobj.countryrefid,
      companyrefid: this.selobj.companyid,
      branchrefid: this.selobj.branchrefid,
      indapprflag: data[0][i++],
      fromlocname: data[0][i++],
      fromlocrefid: data[0][i++], 

      namefromlocname: data[0][i++],
      namefromlocrefid:data[0][i++],
      nametolocname:data[0][i++],
      nametolocrefid:data[0][i++],


      stkminrefid:data[0][i++],  //14/15






      // stkminno: data[0][i++],

      // stdate: data[0][i++]










    });






  }


  viewIndentProduct(id: number) {


    var frmdata = { frmint1: id, frmstr1: '', createdby: '', locrefid: this.selobj.locrefid, locname: this.selobj.locname, companyid: this.selobj.companyid };
    this.userService.viewIndentProduct(JSON.stringify(frmdata)).subscribe(data => { this.viewServIndentProduct(data) },
      errorCode => console.log(errorCode));


  }




  viewServIndentProduct(data: any) {



    var i = 0;

    const control = <FormArray>this.registerForm.controls['indreq'];


    while (control.length !== 0) {
      control.removeAt(0);
    }

    this.init();


    for (this.i = 0; this.i < data.length; this.i++) {

      i = 0;

      control.insert(0, this.formBuilder.group({
        id: [data[this.i][i++], []],
        indentrefid: [data[this.i][i++], []],
        drugprdrefid: [data[this.i][i++], []],
        boxqty: [data[this.i][i++], []],
        stripqty: [data[this.i][i++], []],


        tabqty: [data[this.i][i++], []],
        qty: [data[this.i][i++], []],
        boxconvdrg: [data[this.i][i++], []],
        stripconvdrg: [data[this.i][i++], []],
        minqty: [data[this.i][i++], []],



        maxqty: [data[this.i][i++], []],
        createdby: [this.selobj.userid, []],
        locrefid: [this.selobj.locrefid, []],
        locname: [this.selobj.locname, []],

        countryrefid: [this.selobj.countryrefid, []],
        companyrefid: [this.selobj.companyid, []],
        branchrefid: [this.selobj.branchrefid, []],


        drugname: [data[this.i][i++], []],

        dbflag: [1, []],
        delflag: [false, []],
        clientcdate: [data[this.i][i], []],
        clientcdate1: [data[this.i][i++], []],
        remarks: [data[this.i][i++], []],
        calcflag: [0, []],
      }));


    }


  }



  calc(e) {



    this.calcIndentProd();
  }






  calcIndentProd() {


    const control = <FormArray>this.registerForm.controls['indreq'];

    var ind = control.value;

    control.patchValue(ind);

    var boxqty: number = 0;
    var stripqty: number = 0;
    var tabqty: number = 0;
    var qty: number = 0;

    var boxconvdrg: number = 0;
    var stripconvdrg: number = 0;


    for (this.i = 0; this.i < ind.length; this.i++) {



      if (parseInt(ind[this.i].calcflag) != 1) {

        if (parseInt(ind[this.i].boxqty)) {
          boxqty = parseInt(ind[this.i].boxqty);
        } else {
          boxqty = 0;
        }

        if (parseInt(ind[this.i].stripqty)) {
          stripqty = parseInt(ind[this.i].stripqty);
        } else {
          stripqty = 0;
        }


        if (parseInt(ind[this.i].tabqty)) {
          tabqty = parseInt(ind[this.i].tabqty);
        } else {
          tabqty = 0;
        }


        if (parseInt(ind[this.i].boxconvdrg)) {
          boxconvdrg = parseInt(ind[this.i].boxconvdrg);

        } else {
          boxconvdrg = 0;
        }


        if (parseInt(ind[this.i].stripconvdrg)) {
          stripconvdrg = parseInt(ind[this.i].stripconvdrg);

        } else {

          stripconvdrg = 0;
        }


        ind[this.i].qty = boxqty * boxconvdrg + stripqty * stripconvdrg + tabqty;

        this.indentrequestedit = ind;

      }
    }



    control.patchValue(ind);


  }



  deleteIndReq() {


    var frmdata = { frmint1: this.registerForm.get('id').value, frmstr1: '', createdby: '', locrefid: this.selobj.locrefid, locname: this.selobj.locname, companyid: this.selobj.companyid };

    var answer = confirm("Delete data?");

    if (answer) {
      this.userService.deleteIndReq(JSON.stringify(frmdata)).subscribe(data => { this.route1.navigate(['/RequisitionForm/ViewRequisitionForm']) },
        errorCode => console.log(errorCode));
    }

  }










  remove() {
    const control = <FormArray>this.registerForm.controls['indreq'];


    const controlrem = <FormArray>this.registerForm.controls['dummy'];

    var valorg = control.value;


    for (this.i = 0; this.i < valorg.length; this.i++) {

      if (((parseInt(valorg[this.i].calcflag) != 1) && (valorg[this.i].delflag != true)) || (valorg[this.i].dbflag == 1)) {


        controlrem.insert(0, control.at(this.i));

      }

    }

    while (control.length !== 0) {
      control.removeAt(0);
    }


    for (this.i = 0; this.i < controlrem.value.length; this.i++) {

      control.insert(0, controlrem.at(this.i));


    }

    while (controlrem.length !== 0) {
      controlrem.removeAt(0);
    }


    this.init();




  }









  validnew(): Number {
    var valflag = 0;


    /*      if(this.indentrequestedit[0].indapprflag==1){
      
            valflag=1 ;

            
      this.notificationsComponent.addToast({title:'Error', msg:'Approved Request  Cannot  Be  Changed', timeout: 5000, theme:'default', position:'top-right',type:'error'});      
      
     }    */


    return valflag;

  }





  init() {
    const control = <FormArray>this.registerForm.controls['indreq'];
    var data = [ [],[] ];



    for (this.i = 0; this.i < data.length; this.i++) {

      control.push(this.formBuilder.group({



        indentprdid: [, []],
        indentrefid: [, []],
        drugprdrefid: [, []],
        batchno: [, []],
        boxqty: [, []],
        stripqty: [, []],
        tabqty: [, []],
        qty: [, []],
        drugname: [, []],
        boxconvdrg: [, []],
        stripconvdrg: [, []],
        minqty: [, []],
        maxqty: [, []],
        createdby: [, []],
        locrefid: [, []],
        locname: [, []],

        countryrefid: [this.selobj.countryrefid, []],
        companyrefid: [this.selobj.companyid, []],
        branchrefid: [this.selobj.branchrefid, []],


        clientcdate: [, []],
        clientcdate1: [, []],
        remarks: [, []],

        calcflag: [1, []],

        delflag: [false, []],


      }));


    }

  }














  clear() {

    this.ngOnInit();
  }


}