import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../../services/dashboard.service';

import { Chart } from 'angular-highcharts';
import { LogEquipoService } from '../../services/log-equipo.service';
import { BootstrapFormConfig, ButtonBootstrapFormConfig, FieldBootstrapFormConfig } from 'src/app/modules/AppUIUtils/components/bootstrap-form/model/bootstrap-form-config';
import { BootstrapFormDate, BootstrapFormRequired } from 'src/app/modules/AppUIUtils/components/bootstrap-form/bootstrap-form-validators';
import { FiltroEstadisticaForm } from '../../models/FiltroEstadisticaForm';
import { CamposLogService } from '../../services/campos.log.service';
import { AppUIUtilsService } from 'src/app/modules/AppUIUtils/services/app.ui.utils.service';
import { APIResponse } from '../../models/APIResponse';

@Component({
  selector: 'app-detalle-equipo',
  templateUrl: './detalle-equipo.component.html',
  styleUrls: ['./detalle-equipo.component.css']
})
export class DetalleEquipoComponent implements OnInit {

  public noData:boolean = true;

  public formConfig:BootstrapFormConfig = new BootstrapFormConfig();
  public filterParams:FiltroEstadisticaForm = new FiltroEstadisticaForm();

  private equipoSelect:any = null;
  private equipoSelectChange:any = null;

  private keySelect:any = null;
  private applyFilters:any = null;
  private applyFiltersClick:any = null;
  
  public chart: Chart = new Chart({
    chart: {
      type: 'line'
    },
    title: {
      text: 'Variación a lo largo del tiempo'
    },
    credits: {
      enabled: false
    },
    series: [
      {
        name: 'Sin datos, complete el formulario y presione "Aplicar".',
        data: [0,0,0]
      }
    ]
  }  as any);

  constructor(
    public dashboardService:  DashboardService,
    public logEquipoService:  LogEquipoService,
    private camposLogService: CamposLogService,
    private appUIUtilsService: AppUIUtilsService
  ) {
  }

  ngOnInit(): void {
    this.noData = this.dashboardService.listadoEquipos.length == 0;
    this.setFormConfig();
    this.setSubsEvents();
    this.initDataForEquipo();
    this.camposLogService.getAll('?limit=1000');
  }

  initDataForEquipo(){
    this.equipoSelect.model = this.dashboardService.paramsDetalleEquipo.id;
    console.log(this.equipoSelect.model);
  }

  setFormConfig(){
    //CONFIGURACION INICIAL DEL FORMULARIO
    this.formConfig.clearFields();
    this.formConfig.setTitle( '' );
    this.formConfig.model = this.filterParams;

    this.equipoSelect = new FieldBootstrapFormConfig(
      { title:'Equipo:', field: 'equipo_id', type: 'select',
        validator: new BootstrapFormRequired(),
        smallHelpText:'Luego de seleccionar un Equipo, seleccione una variable.',
        originDataSubject:this.dashboardService.dataForSelectEquipos, provider: this.dashboardService, getDataFunction:'getEquiposSelect'
      } );
    this.formConfig.AddElement( this.equipoSelect );

    this.keySelect = new FieldBootstrapFormConfig(
      { title:'Variable:', field: 'key_id', type: 'select',
          validator: new BootstrapFormRequired(),
          smallHelpText:'Al seleccionar una variable, debe especificar el lapso de tiempo',
          originDataSubject:this.dashboardService.dataForSelectKeys, provider: this.dashboardService, getDataFunction:'getListadoKeysSelect'
      } );
    this.formConfig.AddElement( this.keySelect );

    this.formConfig.AddElement( new FieldBootstrapFormConfig(
        { title:'Fecha Inicial:', field: 'date_start', type: 'date',
          validator: new BootstrapFormRequired( { extraValidator: new BootstrapFormDate({ max: new Date() }) } )
        } ) );
      
    this.formConfig.AddElement( new FieldBootstrapFormConfig(
        { title:'Fecha Final:', field: 'date_end', type: 'date',
          validator: new BootstrapFormRequired( { extraValidator: new BootstrapFormDate({ max: new Date() }) } )
        } ) );

    this.applyFilters = new ButtonBootstrapFormConfig( { title:'Aplicar', type: 'button' } );
    this.formConfig.AddElement( this.applyFilters );

    //EVENTOS DEL FORMULARIO
    this.equipoSelectChange = this.equipoSelect.onChange.subscribe({  next: ( params: any ) => {
      if (this.formConfig.model.equipo_id != ''){
        console.log(this.formConfig.model);
      }
    } });

    this.applyFiltersClick = this.applyFilters.onClick.subscribe({  next: ( params: any ) => {
      this.formConfig.validateForm.next();
      
    } });
  }

  private GetACOKSubj:any = null;
  private GetACESubj:any = null;

  setSubsEvents():void {
    //CAMPOS
    this.GetACOKSubj = this.camposLogService.GetAllOK.subscribe({  next: ( response: APIResponse ) => {
        this.appUIUtilsService.dismissLoading();
        this.dashboardService.listadoKeys = response.results;
        this.formConfig.loadData.next(true); //Se le indica al componente de formularios que actualize sus respectivos campos
        console.log(this.dashboardService.listadoKeys);
    } });

    this.GetACESubj = this.camposLogService.GetAllE.subscribe({  next: ( params: any ) => {
        this.appUIUtilsService.dismissLoading();
        this.appUIUtilsService.showMessage('Ocurrió un error, no se pudo obtener el listado de variables.');
    } });
  }

  ngOnDestroy(){
    this.equipoSelectChange.unsubscribe();
    this.applyFiltersClick.unsubscribe();
    this.GetACOKSubj.unsubscribe();
    this.GetACESubj.unsubscribe();
  }

}


