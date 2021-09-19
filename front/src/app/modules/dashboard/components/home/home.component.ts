import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbNav, NgbNavItem, NgbNavLink } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'src/app/modules/autentication/services/auth.service';
import { DashboardService } from '../../services/dashboard.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  
  public activeNav:string = "ngb-nav-0";
  
  constructor(
    private authService:      AuthService,
    private dashboardService: DashboardService
  ) { }

  private ChangeLocationSubj:any = null;
  ngOnInit(): void {
    this.ChangeLocationSubj = this.dashboardService.ChangeLocation.subscribe({  next: ( response: any ) => {
      this.activeNav                            = response.location;
      this.dashboardService.paramsDetalleEquipo = response.params;
    } });

  }

  ngOnDestroy(){
    this.ChangeLocationSubj.unsubscribe();
  }

  logout(){
    this.authService.toLogOut();
  }
}
