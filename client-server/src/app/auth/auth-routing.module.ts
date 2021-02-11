import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthComponent } from './auth.component';
import { AuthGuard } from './auth.guard';
import { EmailComponent } from './email/email.component';
import { ForgotpasswordComponent } from './forgotpassword/forgotpassword.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  {
    path: '',
    component: AuthComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: '/auth/login',
      },
      {
        path: 'forgotpassword',
        component: EmailComponent,
      },
      {
        path: 'reset/:token',
        component: ForgotpasswordComponent,
      },
      {
        path: 'login',
        component: LoginComponent,
      },
      {
        path: 'register/:token/:role',
        component: RegisterComponent,
      },
      {
        path: '**',
        redirectTo: '/auth/login',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
