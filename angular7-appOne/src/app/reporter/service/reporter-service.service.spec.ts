import { TestBed } from '@angular/core/testing';

import { ReporterServiceService } from './reporter-service.service';

describe('ReporterServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ReporterServiceService = TestBed.get(ReporterServiceService);
    expect(service).toBeTruthy();
  });
});
