import {Routes} from '@angular/router';
import {companyeditComponent} from "./editCompany.component";

export const companyeditRoutes: Routes = [{
  path: '',
  component: companyeditComponent,
  data: {
    breadcrumb: "Company Information"
  } 
}];
