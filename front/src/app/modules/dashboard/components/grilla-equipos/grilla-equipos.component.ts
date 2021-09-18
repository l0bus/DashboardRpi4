import { Component, OnInit } from '@angular/core';
import { AppUIUtilsService } from 'src/app/modules/AppUIUtils/services/app.ui.utils.service';
import { EquiposService } from '../../services/equipos.service';

import { APIResponse } from '../../models/APIResponse';

@Component({
  selector: 'app-grilla-equipos',
  templateUrl: './grilla-equipos.component.html',
  styleUrls: ['./grilla-equipos.component.css']
})
export class GrillaEquiposComponent implements OnInit {

  public listadoEquipos:any = [];

  constructor(
    private equiposService:    EquiposService,
    private appUIUtilsService: AppUIUtilsService
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
        this.listadoEquipos = response.results;
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

  detalles(){
    
  }

}
