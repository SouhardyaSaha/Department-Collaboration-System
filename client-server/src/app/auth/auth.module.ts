// import { SharedModule } from './../shared/shared.module';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material.module';

import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './auth.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ForgotpasswordComponent } from './forgotpassword/forgotpassword.component';
import { EmailComponent } from './email/email.component';


@NgModule({
  declarations: [AuthComponent, LoginComponent, RegisterComponent, ForgotpasswordComponent, EmailComponent],
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
