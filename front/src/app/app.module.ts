import { BrowserModule } from '@angular/platform-browser';
import { NgModule }      from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent }     from './app.component';
import { NgbModule }        from '@ng-bootstrap/ng-bootstrap';

import { TabsDashboardComponent } from './components/tabs-dashboard/tabs-dashboard.component';
import { GrillaEquiposComponent } from './components/grilla-equipos/grilla-equipos.component';
import { DetalleEquipoComponent } from './components/detalle-equipo/detalle-equipo.component';
import { MapaEquiposComponent }   from './components/mapa-equipos/mapa-equipos.component';

import { AutenticationModule } from './modules/autentication/autentication.module';
import { DashboardModule }     from './modules/dashboard/dashboard.module';

@NgModule({
  declarations: [
    AppComponent,
    TabsDashboardComponent,
    GrillaEquiposComponent,
    DetalleEquipoComponent,
    MapaEquiposComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AutenticationModule,
    DashboardModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
