import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor() { }

  public ChangeLocation:Subject<any> = new Subject();
  
  public paramsDetalleEquipo:any = null;
  public listadoEquipos:any      = [];
  public listadoKeys:any         = [];

  getDataFBootstrapForm( params:any ){
    let out:any = [];
    for (let c = 0; c < params.length; c++){
      out.push({ value: params[c].id, text:params[c].cod });
    }
    return out;
  }

  public dataForSelectEquipos:Subject<any> = new Subject();
  public dataForSelectKeys:Subject<any> = new Subject();

  getEquiposSelect(){
    this.dataForSelectEquipos.next(this.listadoEquipos);
  }

  getListadoKeysSelect(){
    this.dataForSelectKeys.next(this.listadoKeys);
  }
}
