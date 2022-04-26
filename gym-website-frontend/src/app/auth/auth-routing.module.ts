import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LogRegComponent} from "./log-reg/log-reg.component";

const routes: Routes = [
  { path: 'log-reg', component: LogRegComponent},
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
