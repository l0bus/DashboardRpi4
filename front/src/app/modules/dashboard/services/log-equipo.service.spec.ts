import { TestBed } from '@angular/core/testing';

import { LogEquipoService } from './log-equipo.service';

describe('LogEquipoService', () => {
  let service: LogEquipoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LogEquipoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
