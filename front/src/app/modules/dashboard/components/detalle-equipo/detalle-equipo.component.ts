import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../../services/dashboard.service';

@Component({
  selector: 'app-detalle-equipo',
  templateUrl: './detalle-equipo.component.html',
  styleUrls: ['./detalle-equipo.component.css']
})
export class DetalleEquipoComponent implements OnInit {

  constructor(
    public dashboardService: DashboardService
  ) { }

  ngOnInit(): void {
    console.log(this.dashboardService.paramsDetalleEquipo);
  }

  ngOnDestroy(){
  }

}
