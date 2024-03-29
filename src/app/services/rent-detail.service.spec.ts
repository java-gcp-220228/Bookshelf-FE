import { TestBed } from '@angular/core/testing';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { RentDetailService } from './rent-detail.service';

describe('RentDetailService', () => {
  let service: RentDetailService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(RentDetailService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
