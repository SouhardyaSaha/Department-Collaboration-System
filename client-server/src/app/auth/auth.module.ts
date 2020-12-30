// import { SharedModule } from './../shared/shared.module';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material.module';

import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './auth.component';


@NgModule({
  declarations: [AuthComponent],
  imports: [
    AuthRoutingModule,
    CommonModule,
    ReactiveFormsModule,
    AuthRoutingModule,
    MaterialModule,
    // SharedModule,
  ],
})
export class AuthModule {}
