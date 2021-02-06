import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthComponent } from './auth.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: AuthComponent,
    canActivate: [AuthGuard],
    data: {
      isRegisterMode: false,
    },
  },
  {
    path: 'register/:token/:role',
    component: AuthComponent,
    data: {
      isRegisterMode: true,
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
