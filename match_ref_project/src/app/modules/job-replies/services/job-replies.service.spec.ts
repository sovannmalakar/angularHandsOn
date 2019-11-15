import { TestBed } from '@angular/core/testing';

import { JobRepliesService } from './job-replies.service';

describe('JobRepliesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: JobRepliesService = TestBed.get(JobRepliesService);
    expect(service).toBeTruthy();
  });
});
