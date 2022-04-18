import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';

import { RentDetailsService } from './rent-details.service';

describe('RentDetailsService', () => {
  let service: RentDetailsService;

  beforeEach(() => {
    
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(RentDetailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
