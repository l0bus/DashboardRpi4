import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { TabsDashboardComponent } from './components/tabs-dashboard/tabs-dashboard.component';
import { GrillaEquiposComponent } from './components/grilla-equipos/grilla-equipos.component';
import { VistaEquipoComponent } from './components/vista-equipo/vista-equipo.component';
import { DetalleEquipoComponent } from './components/detalle-equipo/detalle-equipo.component';
import { MapaEquiposComponent } from './components/mapa-equipos/mapa-equipos.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    TabsDashboardComponent,
    GrillaEquiposComponent,
    VistaEquipoComponent,
    DetalleEquipoComponent,
    MapaEquiposComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
