import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ConfigService {

  constructor(
  ) {}

  public getConfigData(){
    return {
      apiBaseUrl: "https://estadisticas1.api.greenborn.com.ar/",//"http://localhost:8000/"
      loginAction:"api-token-auth/",
      equiposAction:"equipo",
      logEquipoAction:"log_equipo",
      appName: "app_estadisticas1_dev_"
    };
  }

}
