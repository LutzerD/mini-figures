import { TestBed } from '@angular/core/testing';

import { ScrollEventsService } from './scroll-events.service';

describe('ScrollEventsService', () => {
  let service: ScrollEventsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ScrollEventsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
