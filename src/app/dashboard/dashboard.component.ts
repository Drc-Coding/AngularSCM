import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { AppComponent } from './../app.component';
import { DashboardService } from './dashboard.service';
import { Router } from '@angular/router';
import * as c3 from 'c3';
import { bisectRight } from 'd3';
import { dateFormatPipe } from './..//notifications/notifications.datepipe';
declare var $: any;
declare var Morris: any;
@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css',
        '../../assets/icon/SVG-animated/svg-weather.css'
    ],
    providers: [DashboardService],
    encapsulation: ViewEncapsulation.None
})

export class DashboardComponent implements OnInit {
    dashboard: FormGroup;
    // sales: FormGroup;
    branchid;
    companyrefid;
    locname;
    locrefid;
    clientcdate;
    purchasesale;
    totalpurchase;
    totalsale;
    weeklysale = [];
    saleschart = [];
    salesorder = [];
    purchasechart = [];
    comboChartData: any;
    sales: any;
    purchase: any;
    todypurchase: any;
    todysales: any;
    minstock:any;
    lastsale:any;
    // comboChartData =  {
    //     chartType: 'ComboChart',
    //     dataTable: [
    //         ['Month', 'Bolivia', 'Ecuador', 'Madagascar', 'Papua New Guinea', 'Rwanda', 'Average'],
    //         ['2004/05', 165, 938, 522, 998, 450, 614.6],
    //         ['2005/06', 135, 1120, 599, 1268, 288, 782],
    //         ['2006/07', 157, 1167, 587, 807, 397, 323],
    //         ['2007/08', 139, 1110, 615, 968, 215, 509.4],
    //         ['2008/09', 136, 691, 629, 1026, 366, 269.6]
    //     ],
    //     options: {
    //         height: 320,
    //         title: 'Monthly Coffee Production by Country',
    //         vAxis: { title: 'Cups' },
    //         hAxis: { title: 'Month' },
    //         seriesType: 'bars',
    //         bar: {groupWidth: '90%'},
    //         series: { 5: { type: 'line' } },
    //         colors: ['#e74c3c', '#2ecc71', '#5faee3', '#0073aa', '#f1c40f', '#e74c3c']
    //     },
    // };
    /*Polar chart*/
    type3 = 'polarArea';
    data3 = {
        datasets: [{
            data: [
                2000,
                4500,
                8000,
                500
            ],
            backgroundColor: [
                '#7E81CB',
                '#1ABC9C',
                '#B8EDF0',
                '#01C0C8'
            ],
            hoverBackgroundColor: [
                '#a1a4ec',
                '#2adab7',
                '#a7e7ea',
                '#10e6ef'
            ],
            label: 'My dataset' // for legend
        }],
        legend: {
            display: false,
        },
        labels: [
            'Palayan',
            'Metro Manila',
            'Manila',
            'Sagayam'
        ]
    };
    options3 = {
        elements: {
            arc: {
                borderColor: ''
          
            },
            // labels: {
            //     display: false,
            // }
        }
    };
    constructor(private purchaseservice: DashboardService, private router: Router, private dateformat: dateFormatPipe) {
        const totalsale = new FormControl;
        const totalpurchase = new FormControl;
        const weeklysale = new FormControl;
        this.dashboard = new FormGroup({
            totalpurchase: totalpurchase,
            totalsale: totalsale
        });
    }
    ngOnInit() {
        setTimeout(() => {
            /* visitors pie chart*/
            $('.visitor-chart').sparkline([1, 2], {
                type: 'pie',
                width: '100px',
                height: '65px',
                sliceColors: ['#ccc', '#0073aa'],
                tooltipClassname: 'chart-sparkline'
            });
            /* visitor total sale line chart */
            $('.sale-chart').sparkline([this.purchasechart,12], {
                type: 'line',
                width: '100%',
                height: '65px',
                tooltipClassname: 'chart-sparkline',
                chartRangeMax: '50',
                lineColor: '#ccc',
                fillColor: '#ccc'
            });
            this.branchid = AppComponent.branchID;
            this.locname = AppComponent.locRefName1;
            this.locrefid = AppComponent.locrefID1;
            this.companyrefid = AppComponent.companyID;
            this.clientcdate = AppComponent.date;
            this.clientcdate =  [this.dateformat.transform05(Date.now()), []];
            /*Overall purchase */
            this.purchaseservice.getPurchaseValue(this.companyrefid, this.branchid,
                this.locname, this.locrefid).subscribe(data => { this.purchase= data[0] });
            /*Overall Sales */
            this.purchaseservice.getsalesValue(this.companyrefid, this.branchid,
                this.locname, this.locrefid).subscribe(data => { this.sales = data[0] });
            /*Weekly sales */
            this.purchaseservice.getWeeklySales(this.companyrefid, this.branchid,
                this.locname, this.locrefid, this.clientcdate).subscribe(data => { this.saleschart = data, this.method1() });
            /*Weekly Purchase */
            this.purchaseservice.getWeeklyPurchase(this.companyrefid, this.branchid,
                this.locname, this.locrefid, this.clientcdate).subscribe(data => { this.purchasechart = data, this.method1() });
            this.purchaseservice.todaypurchase(this.companyrefid, this.branchid,
                this.locname, this.locrefid, this.clientcdate).subscribe(data => { this.todypurchase = data[0], this.method2() });
            this.purchaseservice.todaysales(this.companyrefid, this.branchid,
            this.locname, this.locrefid, this.clientcdate).subscribe(data => { this.todysales = data[0], this.method2() });
            this.purchaseservice.salesordertype(this.companyrefid, this.branchid,
                this.locname, this.locrefid).subscribe(data => { this.salesorder = data, this.method3() });
               
            this.purchaseservice.getMinimumQuantity(this.companyrefid, this.branchid,
                    this.locname, this.locrefid).subscribe(data => {this.minstock = data});

                    this.purchaseservice.getLastSale(this.companyrefid, this.branchid,
                        this.locname, this.locrefid).subscribe(data => {this.lastsale = data});
            /* visitor total revenue chart */
            $('.resource-barchart').sparkline([5, 6, 2, 4, 9, 8, 3, 6, 4, 2], {
                type: 'bar',
                barWidth: '8px',
                height: '50px',
                barColor: '#239a55',
                tooltipClassname: 'abc'
            });
            /*custom line chart*/
            $('.customchart').sparkline([15, 30, 27, 35, 50, 71, 60], {
                type: 'line',
                width: 300,
                height: 300,
                tooltipClassname: 'chart-sparkline',
                chartRangeMax: '50',
                lineColor: '#0073aa',
                fillColor: 'rgba(0, 115, 170, 0.5)'
            });
            $('.customchart').sparkline([0, 25, 10, 7, 25, 35, 30], {
                type: 'line',
                width: 300,
                height: 300,
                composite: '!0',
                tooltipClassname: 'chart-sparkline',
                chartRangeMax: '40',
                lineColor: '#239a55',
                fillColor: 'rgba(35, 154, 85, .5)'
            });
        
        }, 1);
    }
    viewpurchaseorder() {
        this.router.navigate(['PurchaseOrder/ViewPurchaseOrder']);
    }
    viewsales() {
        this.router.navigate(['SalesInvoice/SalesMaintenance']);
    }
    method1() {
        this.comboChartData = {
            chartType: 'ComboChart',
            datatype: 'double',
            dataTable: [
                ['days', 'Sales', 'Purchase'],
                [this.saleschart[0][0], this.saleschart[0][1], this.purchasechart[0]],
                [this.saleschart[1][0], this.saleschart[1][1], this.purchasechart[1]],
                [this.saleschart[2][0], this.saleschart[2][1], this.purchasechart[2]],
                [this.saleschart[3][0], this.saleschart[3][1], this.purchasechart[3]],
                [this.saleschart[4][0], this.saleschart[4][1], this.purchasechart[4]],
                [this.saleschart[5][0], this.saleschart[5][1], this.purchasechart[5]],
                [this.saleschart[6][0], this.saleschart[6][1], this.purchasechart[6]]
            ],
            options: {
                height: 320,
                title: 'Weekly sales by Shop',
                vAxis: { title: 'Sales' },
                hAxis: { title: 'Days' },
                seriesType: 'bars',
                bar: { groupWidth: '90%' },
                series: { 7: { type: 'line' } },
                colors: ['#005ac1', '#5aa02c', '#5faee3', '#0073aa', '#e74c3c', '#e74c3c']
            },
        };
    }
    method2() {
        const chart = c3.generate({
            bindto: '#chart',
            color: {
                pattern: ['#0073aa', '#f1c40f']
            },
            data: {
                columns: [
                    
                    ['Purchases',this.todypurchase],
                    ['Sales',this.todysales ],
                ],
                type: 'donut',
                onclick: function (d, i) { console.log('onclick', d, i); },
                onmouseover: function (d, i) { console.log('onmouseover', d, i); },
                onmouseout: function (d, i) { console.log('onmouseout', d, i); }
            },
            donut: {
                title: 'Today Result'
            }
        });
    }

    method3(){
        Morris.Donut({
            element: 'donut-example',
            redraw: true,
            data: [
                { label: 'SMS', value: this.salesorder[0][0] },
                { label: 'E-mail', value: this.salesorder[0][1] },
                { label: 'Whatsapp', value: this.salesorder[0][2] },
                {label: 'Telephone', value: this.salesorder[0][3]},
                {label: 'Online Pharmacy', value:this.salesorder[0][4]}
            ],
            colors: ['#5FBEAA', '#34495E', '#FF9F55','#56a0ef','#0f8dbf']
        });

    }
}
