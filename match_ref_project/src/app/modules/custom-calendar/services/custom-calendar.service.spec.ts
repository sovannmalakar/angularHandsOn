import { TestBed } from '@angular/core/testing';

import { CustomCalendarService } from './custom-calendar.service';

describe('CustomCalendarService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CustomCalendarService = TestBed.get(CustomCalendarService);
    expect(service).toBeTruthy();
  });
});
