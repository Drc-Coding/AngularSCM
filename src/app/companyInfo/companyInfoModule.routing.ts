import {Routes} from '@angular/router';
import {CompanyComponent} from "./companyInfoModule.component";
import {AddcompanyComponent} from './addCompany/addCompany.component';
import {viewcompanyComponent} from './viewCompany/viewCompany.view.component';
import {companyeditComponent} from './editCompany/editCompany.component';
export const CompanyRoutes: Routes = [
  { 
    path: 'editCompany/:id',
    component: companyeditComponent,
    data: {
      breadcrumb: 'Edit Company Information'
    }
     },
  {
    path: 'viewCompany',
    component: viewcompanyComponent,
    data: {
      breadcrumb: 'Company Information'
    }
    },
  {
  path: '',
  children: [
    {
      path: 'CompanyRegistration',
      component: AddcompanyComponent,
      data: {
        breadcrumb: 'Company Information'
      }
    }, {
      path: 'ViewCompanyRegistration',
      component: viewcompanyComponent,
      data: {
        breadcrumb: 'Company Information'        
      }
    }
  ]   
}];
