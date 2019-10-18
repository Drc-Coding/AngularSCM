import {Routes} from '@angular/router';
import {editSubTherapeuticComponent} from './editSubTherapeutic.component';

export const editSubTherapeuticRoutes: Routes = [{
  path: '',
  component: editSubTherapeuticComponent,
  data: {
    breadcrumb: 'Employee  Edit  Information'
    
  }
}];
