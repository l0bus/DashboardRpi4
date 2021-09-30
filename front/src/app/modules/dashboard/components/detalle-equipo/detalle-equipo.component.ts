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
import { NULL_EXPR } from '@angular/compiler/src/output/output_ast';

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
  public lastData:any = [];

  private keySelect:any = null;
  private applyFilters:any = null;
  private applyFiltersClick:any = null;
  private formIsValidated:any = null;
  private btnClick:boolean = false;
  
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
    ],
    xAxis: {
      type: 'datetime',
      labels: {
        format: '{value:%Y-%b-%e %l:%M %p }'
      },
    },
   
  }  as any);

  constructor(
    public dashboardService:     DashboardService,
    public logEquipoService:     LogEquipoService,
    private camposLogService:    CamposLogService,
    private appUIUtilsService:   AppUIUtilsService
  ) {
  }

  ngOnInit(): void {
    this.noData = this.dashboardService.listadoEquipos.length == 0;
    this.setFormConfig();
    this.setSubsEvents();
    this.initDataForEquipo();
    //Obtenciòn de las variables
    this.camposLogService.getAll('?limit=1000');
    //Obtensiòn de los ùltimos logs del equipo
    if(!this.noData){
      this.getUltimosDatos( this.filterParams.equipo_id );
    }
  }

  getUltimosDatos(idEquipo){
    let params = '?equipo='+idEquipo+'&ordering=-id&limit=1';
    this.logEquipoService.getAll(params,{ref:"toGrid"});
  }

  initDataForEquipo(){
    this.btnClick = false;
    this.equipoSelect.model = this.dashboardService.paramsDetalleEquipo.id;
    this.formConfig.model.equipo_id = this.dashboardService.paramsDetalleEquipo.id;
  }

  setFormConfig(){
    //CONFIGURACION INICIAL DEL FORMULARIO
    this.formConfig.clearFields();
    this.formConfig.setTitle( '' );
    this.formConfig.model = this.filterParams;

    this.equipoSelect = new FieldBootstrapFormConfig(
      { title:'Equipo:', field: 'equipo_id', type: 'select',
        validator: new BootstrapFormRequired(), 'extraClass':'col-auto',
        smallHelpText:'Luego de seleccionar un Equipo, seleccione una variable.',
        originDataSubject:this.dashboardService.dataForSelectEquipos, provider: this.dashboardService, getDataFunction:'getEquiposSelect'
      } );
    this.formConfig.AddElement( this.equipoSelect );

    this.keySelect = new FieldBootstrapFormConfig(
      { title:'Variable:', field: 'key_id', type: 'select',
          validator: new BootstrapFormRequired(),'extraClass':'col-auto',
          smallHelpText:'Al seleccionar una variable, debe especificar el lapso de tiempo',
          originDataSubject:this.dashboardService.dataForSelectKeys, provider: this.dashboardService, getDataFunction:'getListadoKeysSelect'
      } );
    this.formConfig.AddElement( this.keySelect );

    this.formConfig.AddElement( new FieldBootstrapFormConfig(
        { title:'Fecha Inicial:', field: 'date_start', type: 'date','extraClass':'col-auto',
          validator: new BootstrapFormRequired( { extraValidator: new BootstrapFormDate({ max: new Date() }) } )
        } ) );
      
    this.formConfig.AddElement( new FieldBootstrapFormConfig(
        { title:'Fecha Final:', field: 'date_end', type: 'date','extraClass':'col-auto',
          validator: new BootstrapFormRequired()
        } ) );

    this.applyFilters = new ButtonBootstrapFormConfig( { title:'Aplicar', type: 'button' } );
    this.formConfig.AddElement( this.applyFilters );

    //EVENTOS DEL FORMULARIO

    this.equipoSelectChange = this.equipoSelect.onChange.subscribe({  next: ( params: any ) => {
      this.getUltimosDatos( this.filterParams.equipo_id );
    } });

    //BOTON APLICAR
    this.applyFiltersClick = this.applyFilters.onClick.subscribe({  next: ( params: any ) => {
      this.btnClick = true;
      this.formConfig.validateForm.next();
    } });

    //subscripción a subject de validación de formulario
    this.formIsValidated = this.formConfig.isValidated.subscribe({  next: ( params: any ) => {
      if ( params.success == true ){
        //Esta todo OK, se puede hacer peticiòn para consultar datos
        let url_p = '?equipo='+this.formConfig.model.equipo_id+
                    '&fecha_registro__gte='+this.formConfig.model.date_start+' 00:00:00.000000'+
                    '&fecha_registro__lte='+this.formConfig.model.date_end+' 00:00:00.000000'+
                    '&log_equipo_data__key__id='+this.formConfig.model.key_id;
        this.logEquipoService.getAll(url_p,{ref:"toGraph"});
        this.appUIUtilsService.presentLoading();
      } else {
        this.appUIUtilsService.showMessage( this.appUIUtilsService.getMessageFErrors( params.errors ) );
      }
  } });
  }

  updateChart(response:any){
    if (response.length > 0){
      this.chart.removeSeries(0);
      let serieName = '';
      let serie:any = [];

      //se recorren los datos del registro para obtrener los valores pa el grafico
      for (let c=0; c < response.length; c++){
        for(let i=0; i < response[c].log_equipo_data.length; i++){
          if (response[c].log_equipo_data[i].key.id == this.filterParams.key_id){
            serie.push([new Date(response[c].fecha_registro).getTime(), this.formatValue(response[c].log_equipo_data[i].value)]);
            serieName = response[c].log_equipo_data[i].key.cod;
            break;
          }
        }
      }

      this.chart.addSeries({
        name: serieName,
        data: serie
      } as any,true,true);
    } else {
      //if (this.btnClick)
      //this.appUIUtilsService.showMessage('No se obtuvieron datos, en el intervalo de tiempo especificado.');
    }
  }

  formatValue(v:any){
    if (v=="True") return 1;
    if (v=="False") return 0;
    return Number(v);
  }

  private GetACOKSubj:any = null;
  private GetACESubj:any = null;
  private GetALOKSubj:any = null;
  private GetALESubj:any = null;

  setSubsEvents():void {
    //CAMPOS
    this.GetACOKSubj = this.camposLogService.GetAllOK.subscribe({  next: ( response: APIResponse ) => {
        this.appUIUtilsService.dismissLoading();
        this.dashboardService.listadoKeys = response.results;
        this.formConfig.loadData.next(true); //Se le indica al componente de formularios que actualize sus respectivos campos
    } });

    this.GetACESubj = this.camposLogService.GetAllE.subscribe({  next: ( params: any ) => {
        this.appUIUtilsService.dismissLoading();
        this.appUIUtilsService.showMessage('Ocurrió un error, no se pudo obtener el listado de variables.');
    } });

    //LOGS
    this.GetALOKSubj = this.logEquipoService.GetAllOK.subscribe({  next: ( response: any ) => {
      this.appUIUtilsService.dismissLoading();
      if (response.attrAdded.ref == "toGraph"){
        this.updateChart(response.data);
      } else {
        if (response.data.results.length > 0){
          this.lastData = response.data.results[0].log_equipo_data;
        }
      }
    } });

    this.GetALESubj = this.logEquipoService.GetAllE.subscribe({  next: ( params: any ) => {
        this.appUIUtilsService.dismissLoading();
        this.appUIUtilsService.showMessage('Ocurrió un error, no se pudo obtener el listado de logs.');
    } });
  }

  ngOnDestroy(){
    if (this.equipoSelectChange != null){ this.equipoSelectChange.unsubscribe(); }
    this.applyFiltersClick.unsubscribe();
    this.GetACOKSubj.unsubscribe();
    this.GetACESubj.unsubscribe();
    this.formIsValidated.unsubscribe();
    this.GetALOKSubj.unsubscribe();
    this.GetALESubj.unsubscribe();
    this.btnClick = false;
  }

}


