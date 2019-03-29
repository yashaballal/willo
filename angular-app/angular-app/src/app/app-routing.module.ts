import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {DashboardComponent} from './dashboard/dashboard.component'
import {UseraccountComponent} from './useraccount/useraccount.component'
import {FinancialinfoComponent} from './financialinfo/financialinfo.component'
import {AddadminComponent} from './addadmin/addadmin.component'
import {CustomerfbComponent} from './customerfb/customerfb.component'
import { LoginComponent } from './login/login.component';


const routes: Routes = [{ path:'', redirectTo:'/login', pathMatch:'full'},
						{ path:'login', component: LoginComponent},
						{ path:'dashboard', component: DashboardComponent},
						{ path:'useraccount', component: UseraccountComponent},
						{ path:'financialinfo', component: FinancialinfoComponent},
						{ path:'addadmin', component: AddadminComponent},
						{ path:'customerfb', component: CustomerfbComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [LoginComponent, DashboardComponent, UseraccountComponent, FinancialinfoComponent, AddadminComponent, CustomerfbComponent]
