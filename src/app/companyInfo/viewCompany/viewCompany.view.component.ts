import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { providers } from 'ng2-toasty';
import { companyviewService } from './viewCompany.view.services';
import { Router } from '@angular/router';
import { NotificationsComponent } from '../../notifications/notifications.component';
@Component({
    /**@Author Ajith Kumar**/
    selector: 'app-viewCompany',
    templateUrl: './viewCompany.view.component.html',
    providers: [companyviewService, NotificationsComponent]
})

export class viewcompanyComponent implements OnInit {
    public data: any;
    public rowsOnPage: number = 20;
    public filterQuery: string = "";
    public sortBy: string = "";
    public sortOrder: string = "desc";
    gifFail: boolean=true;
    
    constructor(private viewCmp: companyviewService,private router: Router, private notificationsComponent: NotificationsComponent) { }

    ngOnInit() {

        setTimeout(() => {
        this.viewCmp.viewComp().subscribe(data => this.data = data,
            err => {
                console.log('Error get values from services in Company Component');
            });
            this.gifFail=false;
        },3000);

        setTimeout(() => {
        this.viewCmp.getCount().subscribe(data => { this.count = data },
            err => {
                console.log('Error get values from services in Company Component');
            });
            this.gifFail=false;
        },3000);
    }

    deleteCompany(id: number) {
        this.viewCmp.deleteComp(id).subscribe(data => console.log(JSON.stringify(data)),
            errorCode => console.log(errorCode));
        //window.location.href = 'Registration/ViewCompanyRegistration'; //selva
        this.notificationsComponent.addToast({title:'SUCESS MESSAGE', msg:'DATA DELETED SUCESSFULLY.', timeout: 5000, theme:'default', position:'bottom-right', type:'success'});
        setTimeout(() => {
            this.ngOnInit();
          //this.router.navigate(['Registration/ViewCompanyRegistration']);
        }, 2000);
    }
    type3;
    data3;
    options3;
    public show = false;
    count: any;
    showChart() {
        this.show = true;
        this.type3 = 'polarArea';
        this.data3 = {
            datasets: [{
                data: [
                    this.count,
                    5,
                ],
                backgroundColor: [
                    '#7E81CB',
                    '#1ABC9C'
                ],
                hoverBackgroundColor: [
                    '#a1a4ec',
                    '#2adab7',
                ],
                label: 'My dataset'
            }],
            legend: {
                display: false,
            },
            labels: [
                'Total Company',
                'Testing'
            ]
        };
        this.options3 = {
            elements: {
                arc: {
                    borderColor: ''
                },
                labels: {
                    display: false,
                }
            }
        };
    }
}


