import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ConfigService {

  constructor(
  ) {}

  public getConfigData(){
    return {
      apiBaseUrl:"https://estadisticas1.api.greenborn.com.ar/",
      loginAction:"api-token-auth",
      appName: "app_estadisticas1_dev_"
    };
  }

}
