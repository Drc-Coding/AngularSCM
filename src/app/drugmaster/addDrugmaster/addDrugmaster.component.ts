import { Component, OnInit, Input, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray, FormBuilder } from "@angular/forms";
import { adddrugService } from './addDrugmaster.services';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient, HttpResponse, HttpEventType } from '@angular/common/http';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

import * as $ from 'jquery';
import swal from 'sweetalert2';
import { NotificationsComponent } from '../../notifications/notifications.component';
import { AppComponent } from '../../app.component';
import { Router } from '@angular/router';
import { dateFormatPipe } from 'app/notifications/notifications.datepipe';

@Component({
  selector: 'app-drugmaster',
  templateUrl: './addDrugmaster.component.html',
  providers: [adddrugService, NotificationsComponent]
})

export class adddrugComponent implements OnInit {

  @Input() multiple: boolean = false;
  @ViewChild('fileInput') inputEl: ElementRef;

  nod: boolean = false;

 currnot= "Currently Not Available....";

  closeResult: string;
  submitted = false;
  show = false;
  characters = [];
  chars = [];
  selectedCharacter: string = '3';
  countries = [];
  states = [];
  items = [];
  dropdownSettings = {};
  dropdownList = [];
  generic = [];
  fieldhide = [];
  gentype = [];
  maingroup = [];
  subgroup1 = [];
  subgroup2 = [];
  selobj;
  genericCombination = [];


  //dosage = [];
  //uom = [];
  therapeutic = [];
  subtherapeutic = [];
  formulation = [];
  ditributorchann = [];

  Manufacturername = [];
  manudivision = [];

  schedule = [];
  insurance = [];
  insurancetype = [];
  insu = [];
  vat = [];
  gst = [];
  sgst = [];
  cgst = [];
  igst = [];
  i;
  drugForm: FormGroup;
  textPattern = "[a-zA-Z][a-zA-Z ]+";
  textnumbers = '^[0-9]+(\.[0-9]{1,2})?$';
  deviceObj: any;
  
  constructor(private drugservice: adddrugService, private sanitizer: DomSanitizer, private fb: FormBuilder, 
  private notificationsComponent: NotificationsComponent, private router: Router, private modalService: NgbModal,
  private appComponent: AppComponent, private dateformat: dateFormatPipe ) {

    let brandname = new FormControl();
    let selectedCountry = new FormControl();
    let genericid = new FormControl();

    let maingroupid = new FormControl();
    let subgroupid1 = new FormControl();
    let subgroupid2 = new FormControl();




    let genericname = new FormControl();


    let groupname = new FormControl();
    let subgroupname1 = new FormControl();
    let subgroupname2 = new FormControl();


    let genericcombinationid = new FormControl();
    let genericnamedosage = new FormControl();
    let uom = new FormControl('mg', []);
    let vat = new FormControl();
    let gst = new FormControl();
    let sgst = new FormControl();
    let cgst = new FormControl();
    let igst = new FormControl();
    let formulationid = new FormControl();
    let Manufacturernameid = new FormControl();
    let manufacturerdivisionid = new FormControl();
    let schudletype = new FormControl();
    let mrp = new FormControl('', [Validators.required,Validators.pattern(this.textnumbers)]);
    let minqty = new FormControl('', Validators.pattern(this.textnumbers));
    let maxqty = new FormControl('', Validators.pattern(this.textnumbers));
    let insuranceid = new FormControl();
    let boxpercartoon = new FormControl('', Validators.pattern(this.textnumbers));
    let stripperbox = new FormControl('', Validators.pattern(this.textnumbers));
    let quantityperstrip = new FormControl('', Validators.pattern(this.textnumbers));
    let banneddrug = new FormControl();
    let banneddrugreason = new FormControl();
    let selectedCharacter = new FormControl();
    let choosephotos = new FormControl();
    let barcode = new FormControl();
    let productregno = new FormControl();
    let distimporterid = new FormControl();
    let custflag = new FormControl();
    let companyid = new FormControl();
    let branchid = new FormControl();
    let locname = new FormControl();
    let locrefid = new FormControl();
    this.drugForm = new FormGroup({

      genericname: genericname,
      groupname: groupname,
      subgroupname1: subgroupname1,
      subgroupname2: subgroupname2,
      brandname: brandname,
      genericid: genericid,

      maingroupid: maingroupid,
      subgroupid1: subgroupid1,
      subgroupid2: subgroupid2,



      genericcombinationid: genericcombinationid,
      genericnamedosage: genericnamedosage,
      uom: uom,
      vat: vat,
      gst: gst,
      sgst: sgst,
      cgst: cgst,
      igst: igst,
      formulationid: formulationid,
      Manufacturernameid: Manufacturernameid,
      manufacturerdivisionid: manufacturerdivisionid,
      schudletype: schudletype,
      mrp: mrp,
      minqty: minqty,
      maxqty: maxqty,
      insuranceid: insuranceid,
      boxpercartoon: boxpercartoon,
      stripperbox: stripperbox,
      quantityperstrip: quantityperstrip,
      banneddrug: banneddrug,
      choosephotos: choosephotos,
      barcode: barcode,
      productregno: productregno,
      distimporterid: distimporterid,
      banneddrugreason: banneddrugreason,
      custflag: custflag,
      companyid: companyid,
      branchid: branchid,
      locname: locname,
      locrefid: locrefid,
      FormArrayOne: this.fb.array([
      ])
    });

  }
  private addmanuf = "";
  ngOnInit() {

    this.drugForm.get('maingroupid').setValue("0");
    this.drugForm.get('subgroupid1').setValue("0");
    this.drugForm.get('subgroupid2').setValue("opt9");


    //Here to Set Default Values For DropDownBoxes        
    this.drugForm.get('vat').setValue("0");
    this.drugForm.get('gst').setValue("0");
    this.drugForm.get('sgst').setValue("0");
    this.drugForm.get('cgst').setValue("0");
    this.drugForm.get('igst').setValue("0");
    this.drugForm.get('formulationid').setValue("0");
    this.drugForm.get('Manufacturernameid').setValue("0");
    this.drugForm.get('manufacturerdivisionid').setValue("0");
    this.drugForm.get('schudletype').setValue("0");
    this.drugForm.get('distimporterid').setValue("0");
    this.drugForm.get('boxpercartoon').setValue("0");
    this.drugForm.get('stripperbox').setValue("0");
    this.drugForm.get('quantityperstrip').setValue("0");
    this.drugForm.get('custflag').setValue("1");
    this.drugForm.get('banneddrug').setValue("0");
    this.drugForm.get('companyid').setValue(AppComponent.companyID);
    this.drugForm.get('branchid').setValue(AppComponent.branchID);
    this.drugForm.get('locname').setValue(AppComponent.locRefName1);
    this.drugForm.get('locrefid').setValue(AppComponent.locrefID1);





    this.drugservice.mainGroup().subscribe(data => this.maingroup = data,
      err => {
        console.log('Error Occured MainGroup');
      });



    this.drugservice.getFieldhide(AppComponent.companyID, AppComponent.branchID,
      AppComponent.shopID, AppComponent.locrefID)
      .subscribe(data => { this.fieldhide = data; },
        error => {


          console.log('Error Occured On getFieldhide()');
        });




    //Get Formulation
    this.drugservice.getFormulation().subscribe(data => this.formulation = data,
      err => {
        console.log('Error Occured getFormulation');
      });



    //Get Distributor Channel

    this.drugservice.getdistributorchannel().subscribe(data => this.ditributorchann = data,
      err => {
        console.log('Error occured getdistributorchannel()');
      });

    //Get Manufacturer Name

    // this.drugservice.getPharmacompany().subscribe(data => this.pharmacompany = data,

    //   err => {

    //     console.log('Error Occured getPharmaCompany()');
    //   });



    //Get Schedule
    this.drugservice.getSchedule().subscribe(data => this.schedule = data,
      err => {
        console.log('Error Occured getSchedule');
      });

    //Get Insurance
    this.drugservice.getInsurance().subscribe(data => { this.insurance = data, this.getInsurance() },
      err => {
        console.log('Error Occured getInsurance');
      });

    //Get Vat
    this.drugservice.getVat().subscribe(data => this.vat = data,
      err => {
        console.log('Error Occured Vat');
      });
    //Get Gst
    this.drugservice.getGst().subscribe(data => this.gst = data,
      err => {
        console.log('Error Occured Gst');
      });
    //Get sgst
    this.drugservice.getSgst().subscribe(data => this.sgst = data,
      err => {
        console.log('Error Occured Sgst');
      });
    //Get cgst
    this.drugservice.getCgst().subscribe(data => this.cgst = data,
      err => {
        console.log('Error Occured Cgst');
      });
    //Get igst
    this.drugservice.getIgst().subscribe(data => this.igst = data,
      err => {
        console.log('Error Occured Igst');
      });

    //Drug Search 
    this.drugservice.getval().subscribe(data => {
      this.characters = data.map(obj => ({ value: obj.id, label: obj.companyname }));
    });

    this.dropdownSettings = {
      maxHeight: 400,
      singleSelection: false,
      text: "---Select InsuranceType---",
      badgeShowLimit: 1,
      classes: "myclass custom-class"
    };

  }

  //Get Manufacturer Division



  // getmanufactuereDiv() {

  //   this.drugservice.getmanufactuereDivision(this.drugForm.get('Manufacturernameid').value).subscribe(data => this.manudivision = data,
  //     err => {
  //       console.log('Error Occured getmanufactuereDivision()');
  //     });
  // }


  getSubgroup1() {

    this.drugservice.subGroup1(this.drugForm.get('maingroupid').value).subscribe(data => this.subgroup1 = data,
      err => {
        console.log('Error Occured Get subgroup 1');
      });

    // this.drugservice.getCountrycode(this.drugForm.get('maingroupid').value).subscribe(data => {
    //   this.countrycode = data,
    //     this.drugForm.get('countrycode').setValue(data.toString());
    // },
    //   err => {
    //     console.log('Error Occured Country Code');
    //   });

  }

  getSubgroup2() {

    this.drugservice.subGroup2(this.drugForm.get('subgroupid1').value).subscribe(data => { this.subgroup2 = data },
      err => {
        console.log('Error Occured Get subgroup 2');
      });
  }

  saveGeneric(c) {

    //debugger;
    c('Close click')

    // var frmdata = { frmint1: '', frmstr1: this.drugForm.get('addgeneric').value, createdby: '', 
    // locrefid: this.selobj.locrefid, locname: this.selobj.locname };



    var frmdata = { genericname: this.drugForm.get('genericname').value };



    var answer = confirm("Save data?");

    if (answer) {

      this.drugservice.saveGenericname(JSON.stringify(frmdata)).subscribe(data => { c('Close click') },
        errorCode => console.log(errorCode));

      // this.drugservice.saveGenericname(this.drugForm.get('addgeneric').value).subscribe(data => { c('Close click') },
      //   errorCode => console.log(errorCode));


    }
  }

  // saveManufacturer(c) {

  //   c('Close click')


  //   var answer = confirm("Save data?");

  //   if (answer) {

  //     this.drugservice.saveManufacturername(this.drugForm.get('addmanufacturerid').value).
  //       subscribe(data => { c('Close click') },

  //         error => console.log(error));
  //   }
  // }



  saveMaingroup(c) {


    // c('Close click')
    var frmdata = { groupname: this.drugForm.get('groupname').value };
    var answer = confirm("Save data?");

    if (answer) {

      //alert(JSON.stringify(this.drugForm.value));
      this.drugservice.saveMaingroup(JSON.stringify(frmdata)).
        subscribe(data => { c('Close click') },

          err => console.log(err));


    }

    this.drugservice.mainGroup().subscribe(data => this.maingroup = data,
      err => {
        console.log('Error Occured MainGroup');
      });



  }

  saveSubgroup1(c) {

    var frmdata1 = { grouprefid: this.drugForm.get('maingroupid').value, subgroupname1: this.drugForm.get('subgroupname1').value };

    //  c('Close click')
    var answer = confirm("Save data?");

    if (answer) {
      this.drugservice.saveSubgroup1(JSON.stringify(frmdata1)).
        subscribe(data => { c('Close click') },

          err => console.log(err)
        );

    }

    this.drugservice.subGroup1(this.drugForm.get('maingroupid').value).subscribe(data => this.subgroup1 = data,
      err => {
        console.log('Error Occured Get subgroup 1');
      });




  }

  saveSubgroup2(c) {

    var frmdata2 = { subgrouprefid1: this.drugForm.get('subgroupid1').value, subgroupname2: this.drugForm.get('subgroupname2').value };
    //c('Close click')

    var answer = confirm("Save data?");

    if (answer) {
      this.drugservice.saveSubgroup2(JSON.stringify(frmdata2)).
        subscribe(data => { c('Close click') },

          err => console.log(err));

    }

    this.drugservice.subGroup2(this.drugForm.get('subgroupid1').value).subscribe(data => { this.subgroup2 = data },
      err => {
        console.log('Error Occured Get subgroup 2');
      });
  }



  //Get generic 
  getGeneric(value: string) {

   
    this.generic = [];
    this.drugservice.getGeneric(value).subscribe(data => {
      this.generic = [];
      for (let i = 0; i < data.length; i++) {
        this.generic.push({ value: data[i][0], label: data[i][1] });
       


      }
    },
      err => {
        console.log('Error Occured Get generic');
      });
  }


  //Get manufacturer name 
  getmanufacturer(value: string) {
    this.Manufacturername = [];
    this.drugservice.getManufacturer(value).subscribe(data => {
      this.Manufacturername = [];
      for (let i = 0; i < data.length; i++) {
        this.Manufacturername.push({ value: data[i][0], label: data[i][1] });
      }
    },
      err => {
        console.log('Error Occured Get manufacturer');
      });

  }




  //Get genericCombination 
  getGenericComb(value: string) {
    this.drugservice.getgenericCombination(value).subscribe(data => {
      this.genericCombination = [];
      for (let i = 0; i < data.length; i++) {
        this.genericCombination.push({ value: data[i][0], label: data[i][1] });
      }
    },
      err => {
        console.log('Error Occured Get genericCombination');
      });
  }
  getInsurance() {
    for (this.i = 0; this.i < this.insurance.length; this.i++) {
      this.insurancetype.push({ id: this.insurance[this.i][0], itemName: this.insurance[this.i][1] });
    }

  }

  getSubthera() {
    //Get Subtherabeutic
    this.drugservice.getSubthera(this.drugForm.get('therapeuticid').value).subscribe(data => this.subtherapeutic = data,
      err => {
        console.log('Error Occured Subtherabeutic');
      });
  }


  isValid: boolean = false;

  changeValue(valid: boolean) {
    this.isValid = valid;
  }

  //QR Code Here
  elementType: 'url' | 'canvas' | 'img' = 'url';
  value: string = 'paracetamal';


  selectedFiles: FileList
  currentFileUpload: File
  progress: { percentage: number } = { percentage: 0 }


  selectFile(event) {
    this.selectedFiles = event.target.files;
    this.photoValidation(this.selectedFiles);
  }

  onChange(event: any, input: any) {//(change)="onChange($event,showFileNames)" 
    let files = [].slice.call(event.target.files);
    input.value = files.map(f => f.name).join(', ');

  }



  uploads() {
    const inputEl: HTMLInputElement = this.inputEl.nativeElement;
    const newCount: number = inputEl.files.length;
    if (newCount != 0) {
      for (let i = 0; i < newCount; i++) {
        this.progress.percentage = 0;
        this.currentFileUpload = this.selectedFiles.item(i);
        this.drugservice.pushFileToStorage(this.currentFileUpload).subscribe(event => {
          if (event.type === HttpEventType.UploadProgress) {
            this.progress.percentage = Math.round(100 * event.loaded / event.total);
          } else if (event instanceof HttpResponse) {
            console.log('File is completely uploaded!');
          }
        })
      }
    }
    else {
      this.selectedFiles = undefined
    }
  }

  reset() {
    this.drugForm.get('choosephotos').setValue("");
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

  private formSubmitAttempt: boolean;
  public reFlag: boolean = false;
  onSubmit() {
    this.submitted = true;
    this.reFlag = this.drugInputValidation();
    if (this.reFlag == true) {
      this.createRecord();
    }
  }

  drugInputValidation(): boolean {


    if (this.drugForm.get('brandname').value == '' || this.drugForm.get('brandname').value == null) {
      this.notificationsComponent.addToast({ title: 'Error Message', msg: 'ProductName must Not be Empty', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      return false;
    }
    if (this.drugForm.get('genericid').value == null && this.drugForm.get('genericcombinationid').value == null) {
      this.notificationsComponent.addToast({ title: 'Error Message', msg: 'Generic Or Generic-Combination  must Not be Empty', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      return false;
    }
    if (this.drugForm.get('genericnamedosage').value == '' || this.drugForm.get('genericnamedosage').value == null) {
      this.notificationsComponent.addToast({ title: 'Error Message', msg: 'Dosage Value must Not be Empty', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      return false;
    }
    if (this.drugForm.get('uom').value == '' || this.drugForm.get('uom').value == null) {
      this.notificationsComponent.addToast({ title: 'Error Message', msg: 'UOM must Not be Empty', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      return false;
    }

    if (this.drugForm.get('vat').value == '0' || this.drugForm.get('vat').value == null) {
      this.notificationsComponent.addToast({ title: 'Error Message', msg: 'VAT must Not be Empty', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      return false;
    }


    // if (this.drugForm.get('gst').value == '0' || this.drugForm.get('gst').value == null) {
    //   this.notificationsComponent.addToast({ title: 'Error Message', msg: 'GST must Not be Empty', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
    //   return false;
    // }
    if (this.drugForm.get('formulationid').value == '0' || this.drugForm.get('formulationid').value == null) {
      this.notificationsComponent.addToast({ title: 'Error Message', msg: 'Formulation must Not be Empty', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      return false;
    }

    if (this.drugForm.get('Manufacturernameid').value == '0' || this.drugForm.get('Manufacturernameid').value == null) {
      this.notificationsComponent.addToast({ title: 'Error Message', msg: 'Manufacturer Name must not be Empty', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      return false;
    }

    // if (this.drugForm.get('manufacturerdivisionid').value == '0' || this.drugForm.get('manufacturerdivisionid').value == null) {
    //   this.notificationsComponent.addToast({ title: 'Error Message', msg: 'Manufacturer Division Must not be Empty', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });

    //   return false;
    // }

    if (this.drugForm.get('mrp').value == '' || this.drugForm.get('mrp').value == null) {
      this.notificationsComponent.addToast({ title: 'Error Message', msg: 'SRP must Not be Empty', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      return false;
    }
    if (this.drugForm.get('boxpercartoon').value == '' || this.drugForm.get('boxpercartoon').value == null) {
      this.notificationsComponent.addToast({ title: 'Error Message', msg: 'Box Quantity must Not be Empty', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      return false;
    }
    if (this.drugForm.get('stripperbox').value == '' || this.drugForm.get('stripperbox').value == null) {
      this.notificationsComponent.addToast({ title: 'Error Message', msg: 'StripPerBox must Not be Empty', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      return false;
    }
    if (this.drugForm.get('quantityperstrip').value == '' || this.drugForm.get('quantityperstrip').value == null) {
      this.notificationsComponent.addToast({ title: 'Error Message', msg: 'Quantity must Not be Empty', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      return false;
    }

    return true;
    // if (this.drugForm.get('maingroupid').value == '0' || this.drugForm.get('maingroupid').value == null) {
    //   this.notificationsComponent.addToast({ title: 'Error', msg: 'Main Group must not be empty', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
    //   return false;
    // }
    // if (this.drugForm.get('subgroupid1').value == '0' || this.drugForm.get('subgroupid1').value == null) {
    //   this.notificationsComponent.addToast({ title: 'Error', msg: 'Sub Group1 must not be empty', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
    //   return false;
    // }
    // if (this.drugForm.get('subgroupid2').value == '0' || this.drugForm.get('subgroupid2').value == null) {
    //   this.notificationsComponent.addToast({ title: 'Error', msg: 'Sub Group2 must not be empty', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
    //   return false;
    // }

    
  }


  private createRecord() {

    this.insu = this.drugForm.get('insuranceid').value;

    this.drugservice.createDrug(JSON.stringify(this.drugForm.value)).subscribe(data => {
      if (data == true) {

        this.devicedetails();           
        this.deviceObj.apiname="api/drugcreateRecord";
        this.deviceObj.description="Save Drug Details";
       
        this.drugservice.devicedetails(JSON.stringify(this.deviceObj)).subscribe(data => {});
        
        const inputEl: HTMLInputElement = this.inputEl.nativeElement;
        const newCount: number = inputEl.files.length;
        if (newCount != 0) {

          this.notificationsComponent.addToast({ title: 'Info Message', msg: 'Please Wait your Files are Uploading...', timeout: 7000, theme: 'default', position: 'top-right', type: 'info' });
          setTimeout(() => {
            this.drugservice.insuranceSave(JSON.stringify(this.insu));
            for (let k = 0; k < 2; k++) {
              this.progress.percentage = 0;
              this.currentFileUpload = this.selectedFiles.item(k);
              this.drugservice.pushFileToStorage(this.currentFileUpload).subscribe(event => {
                if (event.type === HttpEventType.UploadProgress) {
                  this.progress.percentage = Math.round(100 * event.loaded / event.total);
                } else if (event instanceof HttpResponse) {
                  console.log('File is completely uploaded!');
                }
              })
            }
            this.openSuccessSwal();
            this.router.navigate(['ProductMaster/ViewProductList']);
          }, 10000);
        }
        else {
          setTimeout(() => {
            this.drugservice.insuranceSave(JSON.stringify(this.insu));
            this.openSuccessSwal();
            this.router.navigate(['ProductMaster/ViewProductList']);
          }, 1000);
          this.selectedFiles = undefined
        }
      }
    });
  }

  sanitizedImageData: any;
  sid: number = 1;
  public image: any = [];
  private readonly imageType: any = 'data:image/*;base64,';
  showInfo() {
    this.drugservice.getImage(this.sid)
      .subscribe(data =>
        this.image = this.sanitizer.bypassSecurityTrustUrl(this.imageType + data.content), error => {
          console.log('Error Occured on getImages  : ' + this.image)
        });
  }

  //Photo validation  
  errors: Array<string> = [];
  @Input() fileExt: string = "JPG, GIF, PNG";
  @Input() maxFiles: number = 6;
  @Input() maxSize: number = 0.99; // 5MB
  
  photoValidation(files) {
    this.errors = [];
    // Validate file size and allowed extensions
    if (files.length > 0 && (!this.isValidFiles(files))) {
      return;
    }
  }
  
  private isValidFiles(files) {
    // Check Number of files
    if (files.length > this.maxFiles) {
      this.errors.push("Error: At a time you can upload only " + this.maxFiles + " files");
      return;
    }
    this.isValidFileExtension(files);
    return this.errors.length === 0;
  }


  private isValidFileExtension(files) {
    // Make array of file extensions
    var extensions = (this.fileExt.split(','))
      .map(function (x) { return x.toLocaleUpperCase().trim() });
    for (var i = 0; i < files.length; i++) {
      // Get file extension
      var ext = files[i].name.toUpperCase().split('.').pop() || files[i].name;
      // Check the extension exists
      var exists = extensions.includes(ext);
      if (!exists) {
        this.errors.push("Error (Extension): " + files[i].name);
      }
      // Check file size
      this.isValidFileSize(files[i]);
    }
  }
  private isValidFileSize(file) {
    var fileSizeinMB = file.size / (1024 * 1000);
    var size = Math.round(fileSizeinMB * 100) / 100;
    if (size > this.maxSize)
      this.errors.push("Error (File Size): " + file.name + ": exceed file size limit of " + this.maxSize + "MB ( " + size + "MB )");
  }
  
  openSuccessSwal() {
    swal({
      title: 'Good job!',
      text: 'Data Saved Sucessfully',
      type: 'success'
    }).catch(swal.noop);
  }





  open(content) {

    // debugger;

    this.modalService.open(content).result.then(

      (result) => {
        this.closeResult = `Closed with: ${result}`;
      },

      (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      });
  }


  open1(contenet) {

    // debugger;

    this.modalService.open(contenet).result.then(
      (result) => {
        this.closeResult = `Closed with: ${result}`;
      }, (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      });
  }




  openmain(contenetmain) {



    this.modalService.open(contenetmain).result.then(
      (result) => {
        this.closeResult = `Closed with: ${result}`;
      }, (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      });
  }




  opensub1(contenetsub1) {

    this.modalService.open(contenetsub1).result.then(

      (result) => {
        this.closeResult = `Closed with: ${result}`;
      }, (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      });


  }


  opensub2(contenetsub2) {

    this.modalService.open(contenetsub2).result.then(

      (result) => {
        this.closeResult = `Closed with: ${result}`;
      }, (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      });


  }





  searchwithcode(event, contenet) {

    if (event == 'none') {
      this.open1(contenet);
    }
    else {
      return;
    }
  }


  searchwithcodeformain(event, contenetmain) {

    if (event == 'nonemain') {
      this.openmain(contenetmain);
    }
    else {
      return;
    }

  }



  searchwithcodeforsub1(event, contenetsub1) {

    if (event == 'nonesub1') {
      this.opensub1(contenetsub1);
    }
    else {
      return;
    }
  }


  searchwithcodeforsub2(event, contenetsub2) {

    if (event == 'nonesub2') {
      this.opensub2(contenetsub2);
    }
    else {
      return;
    }
  }







  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }


  //******************************************************************** */




  data = [];
  public rowsOnPage: number = 7;
  public filterQuery: string = "";
  public sortBy: string = "";
  public sortOrder: string = "desc";
  genCounts: number = 2;
  gendata = [];
  public showButton: boolean = false;


  public initFormArrayTwo() {
    return this.fb.group({
      genericid: ['', []],
      dosage: ['', []],
      uom1: ['', []]
    });
  }


  getOtherGeneric() {
    this.initFormArrayTwo();
    const control = <FormArray>this.drugForm.get('FormArrayOne');
    control.push(this.initFormArrayTwo());
    this.showButton = true;
    // this.drugForm.get('genericid').value;

    // this.drugForm.get('dosage').value;
    // this.drugForm.get('uom1').value;
    // control.controls[0].get('genericid1').setValue(this.drugForm.get('genericcombinationid').value);
  }



  getPop(index: any) {
    const Control = <FormArray>this.drugForm.get('FormArrayOne');
    Control.removeAt(index);
    let setData = Control.value;
    if (setData.length <= 0) {
      this.showButton = false;
    } else {
    }
  }
  showData1() {//checking purpose only
    const Control = <FormArray>this.drugForm.get('FormArrayOne');
    let setData = Control.value;
    this.data = [];
    for (let k = 0; k < setData.length; k++) {
      this.drugservice.getATC(setData[k].genericid).subscribe(data => { this.gendata = data, this.getATCdata(data) }, err => {
        console.log('Error Occured On getATC()');
      });
    }
  }

  getATCdata(ATCvalue: any) {
    this.nod = true;

    if (ATCvalue != null || ATCvalue != undefined) {
      for (let i = 0; i < ATCvalue.length; i++) {
        this.data.push(this.pushATCdata(
          ATCvalue[i][0],
          ATCvalue[i][1],
          ATCvalue[i][2],
          ATCvalue[i][3],
          ATCvalue[i][4],
          ATCvalue[i][5]
        ));
      }
    }
    else {

    }
  }

  pushATCdata(t1: any, t2: any, t3: any, t4: any, t5: any, t6: any) {
    return {
      disc1: t1,
      disc2: t2,
      disc3: t3,
      disc4: t4,
      disc5: t5,
      genericname: t6
    }
  }
  public flag: number = 0;

  showData() {
    //const saveData = this.drugForm.controls['FormArrayOne'];
    //alert(JSON.stringify(saveData.value));

    const Control = <FormArray>this.drugForm.get('FormArrayOne');
    let setData = Control.value;
    //alert(setData[0].genericid);
    //alert(JSON.stringify(setData[0].value));
    // alert(JSON.stringify(setData));
    this.data = [];
    for (let p = 0; p < setData.length; p++) {
      if (setData[p].genericid == '' || setData[p].genericid == null) {
        this.notificationsComponent.addToast({ title: 'Error Message', msg: 'Some Generic Is Empty', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      } else {
        this.drugservice.getATC(setData[p].genericid).subscribe(data => { this.gendata = data, this.getATCdata(data) }, err => {
          console.log('Error Occured On getATC()');
        });
      }
    }
    this.drugservice.saveGenCobination(JSON.stringify(setData)).subscribe(data => {
      if (data != null || data != '') {
        this.drugForm.get('genericcombinationid').setValue(data);
        this.notificationsComponent.addToast({ title: 'Sucess', msg: 'Data Saved Sucessfully..', timeout: 5000, theme: 'default', position: 'top-right', type: 'success' });
        setTimeout(() => {
          this.showButton = false;
          Control.controls = [];
        }, 2000);
      } else {
        this.notificationsComponent.addToast({ title: 'Error Message', msg: 'Data not Saved', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      }
    },
      err => {
        console.log('Error Occured On saveGenCobination()');
      });
  }

  showData2() {
    this.data = [];
    this.drugservice.getATC(this.drugForm.get('genericid').value).subscribe(data => { this.gendata = data, this.getATCdata(data) }, err => {
      console.log('Error Occured On getATC()');
    });


  }


  showData4() {
    this.showData2();
    this.showData();
  }









  showData3() {

    this.showData2();

    this.showData();

  }

  cancel(index) {
    const Control = <FormArray>this.drugForm.get('FormArrayOne');


    Control.controls.splice(index,1);



  //   Control.removeAt(0);
  //  // this.showButton = false;
  //   Control.controls = [];
  }

  /*
  <button type="button" class="btn btn-success btn-s" (click)="uploads()">
						<span></span> Upload
					</button>
  */
}










