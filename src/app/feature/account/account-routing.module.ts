import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RdSignupComponent } from './components/rd-signup/rd-signup.component';
import { RdAccountLayoutComponent } from './layout/rd-account-layout/rd-account-layout.component';


const routes: Routes = [
  {
    path:'',
    component: RdAccountLayoutComponent,
    children: [
     {path: '', redirectTo: 'signup'},
     {path: 'login', component:LoginComponent},
     {path:'signup',component:RdSignupComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountRoutingModule { }
