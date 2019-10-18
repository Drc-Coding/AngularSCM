import { Service, Employee } from '../demo.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-demosample',
  templateUrl: './demosample.component.html',
  styleUrls: ['./demosample.component.css']
})
export class DemosampleComponent  {

  dataSource: Employee[];
    pattern: any = /^\(\d{3}\)\ \d{3}-\d{4}$/i;

    constructor(service: Service) {
        this.dataSource = service.getEmployees();
    }

}
