import { SharedModule } from '../shared/shared.module';
import { CreateCustomerComponent } from './create-customer/create-customer.component';
import { CustomerDetailsComponent } from './customer-details/customer-details.component';
import { CustomerComponent } from './customer.component';
import { CustomerRoutes } from './customer.routing';
import { CustomersComponent } from './customers/customers.component';
import { DataService } from './data.service';
import { SearchCustomersComponent } from './search-customers/search-customers.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(CustomerRoutes),
    SharedModule
  ],
  declarations: [CustomerComponent, CreateCustomerComponent, CustomerDetailsComponent, CustomersComponent, SearchCustomersComponent],
  providers: [DataService]
})
export class CustomerModule { }
