import { TestBed } from '@angular/core/testing';
import { UserService } from '../services/user.service';
import { RouterTestingModule } from '@angular/router/testing';

import { RoleGuard } from './role.guard';

describe('RoleGuard', () => {
  let guard: RoleGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserService],
      imports: [RouterTestingModule]
    });
    guard = TestBed.inject(RoleGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
