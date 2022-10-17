import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RdRadianListComponent } from './components/rd-radian-list/rd-radian-list.component';
import { RdRadianAddComponent } from './components/rd-radian-add/rd-radian-add.component';
import { RdRadianEditComponent } from './components/rd-radian-edit/rd-radian-edit.component';
import { RadianLayoutComponent } from './radian-layout/radian-layout.component';


const routes: Routes = [
  {
    path:'',
    redirectTo: 'view',
    component: RadianLayoutComponent,
    children: [
    {path:'view', component:RdRadianListComponent},
    {path:'add', component:RdRadianAddComponent},
    {path:'edit/:id', component:RdRadianEditComponent}
    ]
  }
  
  // {
  //   path:'',
  //   redirectTo: 'view'
  // },
  // {
  //   path:'view',
  //   component:RdRadianListComponent
  // },
  // {
  //   path:'add',
  //   component:RdRadianAddComponent
  // },
  // {
  //   path:'edit/:id',
  //   component:RdRadianEditComponent
  // }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RadianRoutingModule { }
