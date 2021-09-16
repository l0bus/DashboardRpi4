import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabsDashboardComponent } from './tabs-dashboard.component';

describe('TabsDashboardComponent', () => {
  let component: TabsDashboardComponent;
  let fixture: ComponentFixture<TabsDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TabsDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TabsDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
