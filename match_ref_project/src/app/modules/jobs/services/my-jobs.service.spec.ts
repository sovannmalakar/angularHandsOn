import { TestBed } from '@angular/core/testing';

import { MyJobsService } from './my-jobs.service';

describe('MyJobsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MyJobsService = TestBed.get(MyJobsService);
    expect(service).toBeTruthy();
  });
});
