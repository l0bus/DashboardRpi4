import { Component, OnInit } from '@angular/core';
import { AppUIUtilsService } from 'src/app/modules/AppUIUtils/services/app.ui.utils.service';
import { APIResponse } from '../../models/APIResponse';
import { DashboardService } from '../../services/dashboard.service';
import { EquiposService } from '../../services/equipos.service';
import { LogEquipoService } from '../../services/log-equipo.service';
import { NgbPopover } from '@ng-bootstrap/ng-bootstrap';
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
    private logEquipoService:    LogEquipoService
  ) { }

  private GetAOKSubj:any = null;
  private GetAESubj:any  = null;
  private GetALOKSubj:any = null;
  private getALESubj:any = null;
    
  private listadoEquipos:any;
  private cc_regs:any = [];

  private cc_esquinaSuperiorDer = { lat:-16.488679, lng: -71.521014 }
  public tamanio_map = { ancho:1536, alto: 1024, alto_lng: 0.131461, ancho_lat: 0.084078 };
  private marquer_size = {x:50,y:65};

  public map_points:any = []

  ngOnInit(): void {
    this.setSubsEvents();
    this.appUIUtilsService.presentLoading();
    //se piden el listado de equipos
    this.equiposService.getAll('?limit=200');
  }

  addMapPoint(params){
    if (params == undefined) return;
    this.cc_regs.push(params);
    let latitud:any  = this.getCCLatValueOfString(this.getValueOf(params.log_equipo_data,'LATITUD'));
    let longitud:any = this.getCCLngValueOfString(this.getValueOf(params.log_equipo_data,'LONGITUD'));

    let point:any = {
      py: (this.cc_esquinaSuperiorDer.lng - longitud) / (this.tamanio_map.alto_lng / this.tamanio_map.alto)-40, 
      px: (this.cc_esquinaSuperiorDer.lat - latitud) / (this.tamanio_map.ancho_lat / this.tamanio_map.ancho) - this.marquer_size.x*1.5+24,
      equipo: this.getValueOf(params.log_equipo_data,'ID'),
      data: params
    };
    this.map_points.push(point);
    console.log(point);
  }

  getCCLatValueOfString(s:string){
    let grados:number = Number(s.substr(0,2));
    let minutos:number = Number(s.substr(2))/60;

    grados = grados+minutos;
    return -grados;
  }

  getCCLngValueOfString(s:string){
    let grados:number = Number(s.substr(0,3));
    let minutos:number = Number(s.substr(3))/60;

    grados = grados+minutos;
    return -grados;
  }

  getValueOf( registro:any, key:string){
    for (let c=0; c < registro.length; c++){
      if (registro[c].key.cod == key){
        return registro[c].value;
      }
    }
    return '';
  }

  requestLastLog(){
    this.appUIUtilsService.presentLoading();
    for (let c=0; c < this.listadoEquipos.length;c++){
      let params = '?equipo='+this.listadoEquipos[c].id+'&ordering=-id&limit=1';
      this.logEquipoService.getAll(params);
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
    this.GetALOKSubj = this.logEquipoService.GetAllOK.subscribe({  next: ( response: any ) => {
      this.appUIUtilsService.dismissLoading();
      this.addMapPoint(response.data.results[0]);
    } });

    this.getALESubj = this.logEquipoService.GetAllE.subscribe({  next: ( params: any ) => {
      this.appUIUtilsService.dismissLoading();
      this.appUIUtilsService.showMessage('Ocurrió un error, reintente más tarde.');
    } });
  }

  unSetRequestsSubscriptions():void {
    this.GetAOKSubj.unsubscribe();
    this.GetAESubj.unsubscribe();
    this.GetALOKSubj.unsubscribe();
    this.getALESubj.unsubscribe();
  }

  ngOnDestroy(){
    this.unSetRequestsSubscriptions();
  }
}
