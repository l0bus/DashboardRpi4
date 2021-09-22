import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { AppUIUtilsService } from 'src/app/modules/AppUIUtils/services/app.ui.utils.service';
import { APIResponse } from '../../models/APIResponse';
import { DashboardService } from '../../services/dashboard.service';
import { EquiposService } from '../../services/equipos.service';
import { LogEquipoRegService } from '../../services/log-equipo-reg.service';
import { LogEquipoService } from '../../services/log-equipo.service';

@Component({
  selector: 'app-mapa-equipos',
  templateUrl: './mapa-equipos.component.html',
  styleUrls: ['./mapa-equipos.component.css']
})
export class MapaEquiposComponent implements OnInit {

  constructor(
    private equiposService:      EquiposService,
    private appUIUtilsService:   AppUIUtilsService,
    private dashboardService:    DashboardService,
    private logEquipoService:    LogEquipoService,
    private logEquipoRegService: LogEquipoRegService
  ) { }

  private GetAOKSubj:any = null;
  private GetAESubj:any  = null;
  private GetALOKSubj:any = null;
  private getALESubj:any = null;
  private getALDOKSubj:any = null;
  private getALDESubj:any = null;
  
  private listadoEquipos:any;
  private last_logs:any = [];
  private cc_regs:any = [];

  public map_points:any = []

  ngOnInit(): void {
    this.setSubsEvents();
    this.appUIUtilsService.presentLoading();
    //se piden el listado de equipos
    this.equiposService.getAll('?limit=200');
  }

  addMapPoint(params){
    this.cc_regs.push(params);
    console.log(this.cc_regs);
  }

  requestLastLog(){
    this.appUIUtilsService.presentLoading();
    for (let c=0; c < this.listadoEquipos.length;c++){
      let params = '?id_equipo='+this.listadoEquipos[c].id+'&ordering=-id&limit=1';
      this.logEquipoService.getAll(params);
    }
  }

  processLastLog(log){
    //se agrega al arreglo info de los ultimos registros de logs de los equipos
    this.last_logs.push(log);
    //ahora se deberá consultar la posiciòn geografica
    if (log.length == 1){
      let params = '?id_log_reg='+log[0].id;
      this.logEquipoRegService.getAll(params);
    }
   
  }

  setSubsEvents():void {
    //EQUIPOS
    this.GetAOKSubj = this.equiposService.GetAllOK.subscribe({  next: ( response: APIResponse ) => {
        this.appUIUtilsService.dismissLoading();
        this.dashboardService.listadoEquipos = response.results;
        this.listadoEquipos                  = response.results;
        //se piden los ultimos registros de log de cada uno de ellos
        this.requestLastLog();
    } });

    this.GetAESubj = this.equiposService.GetAllE.subscribe({  next: ( params: any ) => {
        this.appUIUtilsService.dismissLoading();
        this.appUIUtilsService.showMessage('Ocurrió un error, reintente más tarde.');
    } });

    //LOGS_EQUIPOS
    this.GetALOKSubj = this.logEquipoService.GetAllOK.subscribe({  next: ( response: APIResponse ) => {
      this.appUIUtilsService.dismissLoading();
      this.processLastLog(response.results);
    } });

    this.getALESubj = this.logEquipoService.GetAllE.subscribe({  next: ( params: any ) => {
      this.appUIUtilsService.dismissLoading();
      this.appUIUtilsService.showMessage('Ocurrió un error, reintente más tarde.');
    } });

    //LOGS_EQUIPOS_DATA
    this.getALDOKSubj = this.logEquipoRegService.GetAllOK.subscribe({  next: ( response: any ) => {
      this.appUIUtilsService.dismissLoading();
      this.addMapPoint(response);
    } });

    this.getALDESubj = this.logEquipoRegService.GetAllE.subscribe({  next: ( params: any ) => {
      this.appUIUtilsService.dismissLoading();
      this.appUIUtilsService.showMessage('Ocurrió un error, reintente más tarde.');
    } });
  }

  unSetRequestsSubscriptions():void {
    this.GetAOKSubj.unsubscribe();
    this.GetAESubj.unsubscribe();
    this.GetALOKSubj.unsubscribe();
    this.getALESubj.unsubscribe();
    this.getALDOKSubj.unsubscribe();
    this.getALDESubj.unsubscribe();
  }

  ngOnDestroy(){
    this.unSetRequestsSubscriptions();
  }
}
