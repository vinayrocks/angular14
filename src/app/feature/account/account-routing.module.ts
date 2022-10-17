import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RdSignupComponent } from './components/rd-signup/rd-signup.component';
import { RdAccountLayoutComponent } from './layout/rd-account-layout/rd-account-layout.component';


const routes: Routes = [
  {
    path:'',
    component: RdAccountLayoutComponent,
    children: [
     {path: '', redirectTo: 'signup'},
     {path:'signup',component:RdSignupComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountRoutingModule { }
