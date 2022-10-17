import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RdEventListComponent } from './components/rd-event-list/rd-event-list.component';
import { RdEventAddComponent } from './components/rd-event-add/rd-event-add.component';
import { RdEventEditComponent } from './components/rd-event-edit/rd-event-edit.component';


const routes: Routes = [
  {
    path:"",
    redirectTo: 'view'
  },
  {
    path:'view',
    component:RdEventListComponent
  },
  {
    path:'add',
    component:RdEventAddComponent
  },
  {
    path:'edit/:id',
    component:RdEventEditComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EventRoutingModule { }
