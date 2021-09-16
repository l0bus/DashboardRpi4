import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapaEquiposComponent } from './mapa-equipos.component';

describe('MapaEquiposComponent', () => {
  let component: MapaEquiposComponent;
  let fixture: ComponentFixture<MapaEquiposComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MapaEquiposComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MapaEquiposComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
