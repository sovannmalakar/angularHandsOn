import { TestBed } from '@angular/core/testing';

import { SearchReportersService } from './search-reporters.service';

describe('SearchReportersService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SearchReportersService = TestBed.get(SearchReportersService);
    expect(service).toBeTruthy();
  });
});
