import { TestBed } from '@angular/core/testing';

import { SubmitReplyService } from './submit-reply.service';

describe('SubmitReplyService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SubmitReplyService = TestBed.get(SubmitReplyService);
    expect(service).toBeTruthy();
  });
});
