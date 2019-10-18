import {Routes} from '@angular/router';
import {ViewSubTherapeuticComponent} from './viewSubTherapeutic.component';
export const ViewSubTherapeuticRoutes: Routes = [{
  path: '',
  component:ViewSubTherapeuticComponent,
  data: {
    breadcrumb: 'TherapeuticDelete View Information'
  }
}];
