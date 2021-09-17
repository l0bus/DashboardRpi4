import { BrowserModule } from '@angular/platform-browser';
import { NgModule }      from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent }     from './app.component';
import { NgbModule, NgbNavModule }        from '@ng-bootstrap/ng-bootstrap';

import { AutenticationModule } from './modules/autentication/autentication.module';
import { DashboardModule }     from './modules/dashboard/dashboard.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AutenticationModule,
    DashboardModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule, 
    NgbNavModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
