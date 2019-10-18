import {Routes} from '@angular/router';
import {addSubTherapeuticComponent} from './addSubTherapeutic.component';

export const addSubTherapeuticRoutes: Routes = [{
  path: '',
  component: addSubTherapeuticComponent,
  data: {
    breadcrumb: 'Sub Therapeutic Information'
  }
}];
