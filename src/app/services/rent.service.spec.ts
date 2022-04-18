import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';

import { RentService } from './rent.service';
import { UserService } from './user.service';
import { of } from 'rxjs';

describe('RentService', () => {
  let service: RentService;
  let BOOKS : any;
  let mockHttp : any;


  beforeEach(() => {    
    BOOKS = [0,1,2];
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ UserService ]
    });
    service = TestBed.inject(RentService);

    mockHttp = jasmine.createSpyObj(['post', 'get']);
  });

  /*it('should be created', () => {
    expect(service).toBeTruthy();
  });*/

  /*it('test posting rents', () => {
    mockHttp.post.and.returnValue(of(true))

    expect(service.postRents(BOOKS)).toBe(true);


  })*/
});
