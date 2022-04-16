import { TestBed } from '@angular/core/testing';

import { RentDetailsService } from './rent-details.service';

describe('RentDetailsService', () => {
  let service: RentDetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RentDetailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
