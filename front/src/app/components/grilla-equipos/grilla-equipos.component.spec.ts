import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GrillaEquiposComponent } from './grilla-equipos.component';

describe('GrillaEquiposComponent', () => {
  let component: GrillaEquiposComponent;
  let fixture: ComponentFixture<GrillaEquiposComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GrillaEquiposComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GrillaEquiposComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
