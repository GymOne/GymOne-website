import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { ReactiveFormsModule } from '@angular/forms'
import {LogRegComponent} from "./log-reg/log-reg.component";
import {AppModule} from "../app.module";


@NgModule({
  declarations: [
    LogRegComponent,
  ],
    imports: [
        CommonModule,
        AuthRoutingModule,
        ReactiveFormsModule
    ],
})
export class AuthModule { }
