import { Component, OnInit } from '@angular/core';
import { AppUIUtilsService } from 'src/app/modules/AppUIUtils/services/app.ui.utils.service';
import { EquiposService } from '../../services/equipos.service';

import { APIResponse } from '../../models/APIResponse';
import { DashboardService } from '../../services/dashboard.service';

@Component({
  selector: 'app-grilla-equipos',
  templateUrl: './grilla-equipos.component.html',
  styleUrls: ['./grilla-equipos.component.css']
})
export class GrillaEquiposComponent implements OnInit {

  public listadoEquipos:any = [];

  constructor(
    private equiposService:    EquiposService,
    private appUIUtilsService: AppUIUtilsService,
    private dashboardService:  DashboardService
  ) { }

  ngOnInit(): void {
    this.setSubsEvents();
    this.appUIUtilsService.presentLoading();
    this.equiposService.getAll();
  }

  public GetAOKSubj:any = null;
  public GetAESubj:any  = null;
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
  }

  unSetRequestsSubscriptions():void {
    this.GetAOKSubj.unsubscribe();
    this.GetAESubj.unsubscribe();
  }

  ngOnDestroy(){
    this.unSetRequestsSubscriptions();
  }

  detalles( equipo ){
    this.dashboardService.ChangeLocation.next({ location: "ngb-nav-1", params:equipo });
  }

}
