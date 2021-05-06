import { TestBed } from '@angular/core/testing';

import { IsLoginAuthGuard } from './is-login-auth.guard';

describe('IsLoginAuthGuard', () => {
  let guard: IsLoginAuthGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(IsLoginAuthGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
