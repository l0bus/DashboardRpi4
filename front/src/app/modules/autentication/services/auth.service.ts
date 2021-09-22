import { Injectable }              from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router }                  from '@angular/router';
import { Subject }                 from 'rxjs';

import { Login }           from '../models/login';
import { ResetPassword }   from '../models/reset-password';
import { Usuario }         from '../models/usuario';

import { AppUIUtilsService }   from 'src/app/modules/AppUIUtils/services/app.ui.utils.service';
import { ConfigService }   from 'src/app/services/config/config.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private confGral:any = {};
  private LastElement:any = {};

  constructor(
    private  router:      Router,
    private  http:        HttpClient,
    private  config:      ConfigService,
    private  gral:        AppUIUtilsService
  ) {
    this.confGral = this.config.getConfigData();
  }

  login( model:Login ){
    this.gral.presentLoading();
    this.http.post(this.confGral['apiBaseUrl'] + this.confGral['loginAction'], model,
      { headers: new HttpHeaders({ 'Content-Type':  'application/json' }) }).subscribe(
        data => {
          this.gral.dismissLoading();

          if ( (data as any).hasOwnProperty("token") ){
            localStorage.setItem( this.confGral['appName']+'token', (data as any).token );
            localStorage.setItem( this.confGral['appName']+'logedIn', JSON.stringify( true ) );
            this.router.navigate(['/home']);
          } else {
            this.gral.showMessage( 'Usuario o contraseña incorrecta.' );
          }
        },
        err =>  {
          this.gral.dismissLoading();
          localStorage.setItem( this.confGral['appName']+'logedIn',      JSON.stringify( false ) );
          localStorage.setItem( this.confGral['appName']+'token',        JSON.stringify( '' ) );
          this.gral.showMessage( 'Usuario o contraseña incorrecta.' );
        }
      );
  }

  toLoginIfNL(){
    if ( !this.logedIn() ){
      this.router.navigate(['/login']);
    } 
  }

  toLogOut(){
    localStorage.setItem( this.confGral['appName']+'logedIn',  JSON.stringify( false ) );
    localStorage.setItem( this.confGral['appName']+'token',    '' );
    this.router.navigate(['/login']);
  }

  logedIn(){
    let lgIn:any = localStorage.getItem( this.confGral['appName']+'logedIn' );
    if ( lgIn === undefined || lgIn === null ){
      return false;
    }
    return (lgIn === "true");
  }

  getToken(){
    return localStorage.getItem( this.confGral['appName']+'token' );
  }

  getUserName(){
    let out:any = localStorage.getItem( this.confGral['appName']+'userName' );
    //se eliminan las dos comillas
    out = out.replace('"','');
    out = out.replace('"','');
    out = out.replace(/\w\S*/g, (w:any) => (w.replace(/^\w/, (c:any) => c.toUpperCase())));
    return out;
  }

}
