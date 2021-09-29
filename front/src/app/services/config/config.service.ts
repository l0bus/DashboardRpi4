import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ConfigService {

  constructor(
  ) {}

  public getConfigData(){
    return {
      apiBaseUrl: "http://localhost:8000/",//"https://estadisticas1.api.greenborn.com.ar/",//"http://localhost:8000/"
      loginAction:"api-token-auth/",
      equiposAction:"equipo",
      logEquipoAction:"log_equipo",
      tipoEquipoAction:"tipo_equipo",
      logEquipoRegAction:"log_equipo_data",
      camposLogAction:"campos_log",
      appName: "app_estadisticas1_dev_"
    };
  }

}
