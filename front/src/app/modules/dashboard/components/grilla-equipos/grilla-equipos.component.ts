import { Component, OnInit } from '@angular/core';
import { AppUIUtilsService } from 'src/app/modules/AppUIUtils/services/app.ui.utils.service';
import { EquiposService } from '../../services/equipos.service';

import { APIResponse } from '../../models/APIResponse';
import { DashboardService } from '../../services/dashboard.service';
import { TipoEquiposService } from '../../services/tipo.equipos.service';

@Component({
  selector: 'app-grilla-equipos',
  templateUrl: './grilla-equipos.component.html',
  styleUrls: ['./grilla-equipos.component.css']
})
export class GrillaEquiposComponent implements OnInit {

  public listadoEquipos:any = [];
  public listadoTipoEquipos:any = [];

  constructor(
    private equiposService:    EquiposService,
    private appUIUtilsService: AppUIUtilsService,
    private dashboardService:  DashboardService,
    private tipoEquipoService: TipoEquiposService
  ) { }

  ngOnInit(): void {
    this.setSubsEvents();
    this.appUIUtilsService.presentLoading();
    this.tipoEquipoService.getAll();
    this.equiposService.getAll('?limit=200');
  }

  public GetAOKSubj:any = null;
  public GetAESubj:any  = null;

  public GetATEOKSubj:any = null;
  public GetATEESubj:any  = null;
  setSubsEvents():void {
    this.GetAOKSubj = this.equiposService.GetAllOK.subscribe({  next: ( response: APIResponse ) => {
        this.appUIUtilsService.dismissLoading();
        this.dashboardService.listadoEquipos = response.results;
        this.listadoEquipos                  = response.results;
        if (response.results.length > 0){
          this.dashboardService.paramsDetalleEquipo = response.results[0];
        }
    } });

    this.GetAESubj = this.equiposService.GetAllE.subscribe({  next: ( params: any ) => {
        this.appUIUtilsService.dismissLoading();
        this.appUIUtilsService.showMessage('Ocurrió un error, reintente más tarde.');
    } });

    this.GetATEOKSubj = this.tipoEquipoService.GetAllOK.subscribe({  next: ( response: any ) => {
      this.appUIUtilsService.dismissLoading();
      this.listadoTipoEquipos = response;
    } });

    this.GetATEESubj = this.tipoEquipoService.GetAllE.subscribe({  next: ( params: any ) => {
        this.appUIUtilsService.dismissLoading();
        this.appUIUtilsService.showMessage('Ocurrió un error, reintente más tarde.');
    } });
  }

  unSetRequestsSubscriptions():void {
    this.GetAOKSubj.unsubscribe();
    this.GetAESubj.unsubscribe();
    this.GetATEOKSubj.unsubscribe();
    this.GetATEESubj.unsubscribe();
  }

  ngOnDestroy(){
    this.unSetRequestsSubscriptions();
  }

  detalles( equipo ){
    this.dashboardService.ChangeLocation.next({ location: "ngb-nav-1", params:equipo });
  }

}
