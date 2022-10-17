import { TestBed } from '@angular/core/testing';

import { RdUserService } from './rd-user-service';

describe('RdUserServiceService', () => {
  let service: RdUserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RdUserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
