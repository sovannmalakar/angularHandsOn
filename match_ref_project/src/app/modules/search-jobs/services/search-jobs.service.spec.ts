import { TestBed } from '@angular/core/testing';

import { SearchJobsService } from './search-jobs.service';

describe('SearchJobsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SearchJobsService = TestBed.get(SearchJobsService);
    expect(service).toBeTruthy();
  });
});
