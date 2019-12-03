import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../../app.component';
import { FolderrankService } from './folderranking.service';
import { FormBuilder, FormArray, FormGroup } from '@angular/forms';
import { NotificationsComponent } from 'app/notifications/notifications.component';

@Component({
  selector: 'app-folderranking',
  templateUrl: './folderranking.component.html',
  styleUrls: ['./folderranking.component.css'],
  providers: [FolderrankService]
})
export class FolderrankingComponent implements OnInit {

  data = [];
  selobj;
  userid: any;
  folderrankForm: FormGroup;
  duplicatereturn: boolean;
  basicreturn: boolean;

  constructor(private formBuilder: FormBuilder, private folderrank: FolderrankService,
  private notificationsComponent: NotificationsComponent) {

    this.folderrankForm = this.formBuilder.group({

      folderDetails: this.formBuilder.array([
      ]),
    });

  }

  ngOnInit() {

    this.userid = AppComponent.userID;
    this.saverank();

  }

  saverank() {


    const getData = <FormArray>this.folderrankForm.controls['folderDetails'];
    getData.controls = [];

    this.folderrank.savefolderrank(this.userid).subscribe(data => { (this.pushTableData(data)) },
      errorCode => console.log(errorCode));

  }


  pushTableData(data: any) {

    const getData = <FormArray>this.folderrankForm.controls['folderDetails'];
    let setData = getData.value;

    for (let i = 0; i < data.length ; i++) {
      for (var x = 0; x <= setData.length; x++) {

        getData.push(this.showPOdata(
          data[i][0],
          data[i][1],
        ));

      }

    }

  }

  showPOdata(foldername: any, uid: any) {
  
    return this.formBuilder.group({
      suserrefid: uid,
      label: foldername,
      ranking: ''
    });
  }

  onSubmit() {

    this.basicreturn = this.basicValidation();

    if (this.basicreturn == false) {
     
      this.notificationsComponent.addToast({ title: 'Warning', msg: 'Check Listed Basic Validation...', timeout: 5000, theme: 'default', position: 'top-right', type: 'warning' });
    }

    else {

      this.dupicateValidation();

    }

  }


  basicValidation(): boolean {

    var basicbool: boolean = true;

    const saveData = <FormArray>this.folderrankForm.controls['folderDetails'];

    let getData = saveData.value;

    for (var i = 0; i < getData.length; i++) {

      if (getData[i].ranking == ''||null) {

        basicbool = false;
        this.notificationsComponent.addToast({ title: 'Error', msg: 'Ranking Value Not to be Empty ...', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });

      }

      else if (getData[i].ranking == 0) {
       

        basicbool = false;
        this.notificationsComponent.addToast({ title: 'Error', msg: 'Ranking Value Not to be Zero ... Start Count 1', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      }

      else if (getData[i].ranking > getData.length) {

       
        basicbool = false;
        this.notificationsComponent.addToast({ title: 'Error', msg: 'Ranking Value Not More Your Module Count ...', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });

      }

    }

    return basicbool;

  }


  dupicateValidation() {

    var duplicatebool: boolean = true;

    const saveData = <FormArray>this.folderrankForm.controls['folderDetails'];
    let getData = saveData.value;

    let length = getData.length;

    for (var i = 0; i < length; i++) {

      for (var k = i + 1; k < length; k++) {

        if (getData[i].ranking == getData[k].ranking) {

          duplicatebool = false;
          this.notificationsComponent.addToast({ title: 'Error', msg: 'Duplicate Ranking Value Occur ...', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });

        }

    }

  }

    if (duplicatebool == true) {

      const saveData = <FormArray>this.folderrankForm.controls['folderDetails'];

      this.folderrank.saverank(JSON.stringify(saveData.value)).subscribe(data => { 

        if(data==true){
          this.notificationsComponent.addToast({ title: 'Success', msg: 'Data Saved Successfully...', timeout: 5000, theme: 'default', position: 'top-right', type: 'success' });
        }
       },
        error => {
          console.log("Error createPurchaseOrderProduct");
        });

    }

  }
//duplicate validation end


}

