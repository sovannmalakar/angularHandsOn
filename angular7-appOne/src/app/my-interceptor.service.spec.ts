import { TestBed } from '@angular/core/testing';

import { MyInterceptorService } from './my-interceptor.service';

describe('MyInterceptorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MyInterceptorService = TestBed.get(MyInterceptorService);
    expect(service).toBeTruthy();
  });
});
