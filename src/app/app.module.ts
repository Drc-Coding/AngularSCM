import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { Ng2DeviceDetectorModule } from 'ng2-device-detector';
import { AppRoutes } from './app.routing';
import { AppComponent } from './app.component';
import { AdminLayoutComponent } from './layouts/admin/admin-layout.component';
import { AuthLayoutComponent } from './layouts/auth/auth-layout.component';
import { SharedModule } from './shared/shared.module';
import { BreadcrumbsComponent } from './layouts/admin/breadcrumbs/breadcrumbs.component';
import { TitleComponent } from './layouts/admin/title/title.component';
import {ScrollModule} from './scroll/scroll.module';
import {LocationStrategy, PathLocationStrategy} from '@angular/common';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    AuthLayoutComponent,
    BreadcrumbsComponent,
    TitleComponent,
   
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    SharedModule,
    RouterModule.forRoot(AppRoutes),
    Ng2DeviceDetectorModule.forRoot(),
    FormsModule,
    HttpModule,
    ScrollModule,
    HttpClientModule
  ],
  exports: [ScrollModule],
  providers: [
      { provide: LocationStrategy, useClass: PathLocationStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
