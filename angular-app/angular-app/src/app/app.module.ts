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
import { FpwdComponent } from './fpwd/fpwd.component';
import { QuillModule } from 'ngx-quill';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {AgGridModule} from "ag-grid-angular";

import { HeaderComponent } from "./Common/Header/Header.component";
import { FooterComponent } from "./Common/Footer/Footer.component";
import { EditorComponent } from './editor/editor.component';

@NgModule({
  declarations: [
    AppComponent,
    routingComponents,
    UseraccountComponent,
    FinancialinfoComponent,
    AddadminComponent,
    CustomerfbComponent,
    LoginComponent,
    FpwdComponent,
    HeaderComponent,
    FooterComponent,
    EditorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ChartsModule,
    QuillModule,
    ReactiveFormsModule,
    FormsModule,
    AgGridModule.withComponents([])
    ],
  providers: [DashboardComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
