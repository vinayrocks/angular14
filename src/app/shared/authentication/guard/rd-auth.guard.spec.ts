import { TestBed } from '@angular/core/testing';

import { RdAuthGuard } from './rd-auth.guard';

describe('RdAuthGuard', () => {
  let guard: RdAuthGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(RdAuthGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
