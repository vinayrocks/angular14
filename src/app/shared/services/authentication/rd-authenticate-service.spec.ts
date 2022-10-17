import { TestBed } from '@angular/core/testing';

import { RdAuthenticateService } from './rd-authenticate.service';

describe('RdAuthenticateServiceService', () => {
  let service: RdAuthenticateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RdAuthenticateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
