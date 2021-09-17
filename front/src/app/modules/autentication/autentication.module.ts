import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { LoginViewComponent } from './componentes/login-view/login-view.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginViewComponent
  }
];

@NgModule({
  declarations: [
    LoginViewComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class AutenticationModule { }
