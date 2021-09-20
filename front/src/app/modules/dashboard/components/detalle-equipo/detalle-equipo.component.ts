import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../../services/dashboard.service';

import { Chart } from 'angular-highcharts';
import { LogEquipoService } from '../../services/log-equipo.service';

@Component({
  selector: 'app-detalle-equipo',
  templateUrl: './detalle-equipo.component.html',
  styleUrls: ['./detalle-equipo.component.css']
})
export class DetalleEquipoComponent implements OnInit {

  public noData:boolean = true;
  
  public chart: Chart = new Chart({
    chart: {
      type: 'line'
    },
    title: {
      text: 'Linechart'
    },
    credits: {
      enabled: false
    },
    series: [
      {
        name: 'Line 1',
        data: [1, 2, 3]
      }
    ]
  }  as any);

  constructor(
    public dashboardService: DashboardService,
    public logEquipoService: LogEquipoService
  ) {
  }

  ngOnInit(): void {
    this.noData = this.dashboardService.listadoEquipos.length == 0;
    this.initDataForEquipo();
    this.chart.addPoint(4);

  }

  initDataForEquipo(){
    console.log(this.dashboardService.paramsDetalleEquipo);
  }

  ngOnDestroy(){
  }

}


