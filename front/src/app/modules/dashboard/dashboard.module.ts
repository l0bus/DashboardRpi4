import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './components/home/home.component';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationGuard } from '../autentication/services/auth.guard';
import { NgbModule, NgbNav, NgbNavModule } from '@ng-bootstrap/ng-bootstrap';

import { GrillaEquiposComponent } from './components/grilla-equipos/grilla-equipos.component';
import { DetalleEquipoComponent } from './components/detalle-equipo/detalle-equipo.component';
import { MapaEquiposComponent } from './components/mapa-equipos/mapa-equipos.component';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthenticationGuard]
  }
];

@NgModule({
  declarations: [
    HomeComponent,
    GrillaEquiposComponent,
    DetalleEquipoComponent,
    MapaEquiposComponent,
  ],
  imports: [
    CommonModule,
    NgbModule,
    NgbNavModule,
    RouterModule.forChild(routes)
  ]
})
export class DashboardModule { }
