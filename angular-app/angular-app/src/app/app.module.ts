import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ChartsModule } from 'ng2-charts';
import { AppRoutingModule, routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component'; 
import { UseraccountComponent } from './useraccount/useraccount.component';
import { FinancialinfoComponent } from './financialinfo/financialinfo.component';
import { AddadminComponent } from './addadmin/addadmin.component';
import { CustomerfbComponent } from './customerfb/customerfb.component';
import { LoginComponent } from './login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    routingComponents,
    UseraccountComponent,
    FinancialinfoComponent,
    AddadminComponent,
    CustomerfbComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ChartsModule
  ],
  providers: [DashboardComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
