import { Addsubmodulevalues } from '../submodules';
import { DataSubmodules } from '../submodules.service';
import { Component, OnInit } from '@angular/core';

import { Router  } from '@angular/router';

@Component({
  selector: 'app-viewsubmodule',
  templateUrl: './viewsubmodule.component.html'
})
export class ViewsubmoduleComponent implements OnInit {
  subviewmodules: Addsubmodulevalues[];
  public data: any; 
  public rowsOnPage: number =20;
  public filterQuery: string = ""; 
  public sortBy: string = "";
  public sortOrder: string = "desc";
  selectedmodules: Addsubmodulevalues;
  
  constructor(private datamodelService: DataSubmodules, private router: Router) { }

  ngOnInit() {
    this.datamodelService.getviewModules().then(data => this.data = data);
  //  this.getviewModules();
  }
   onSelect(cust: Addsubmodulevalues): void {
    this.selectedmodules = cust;
  }

  view(): void {
    this.router.navigate(['SubModule/AddSubModule']);
   }
}
