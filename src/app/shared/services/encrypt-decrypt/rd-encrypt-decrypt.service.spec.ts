import { TestBed } from '@angular/core/testing';

import { RdEncryptDecryptService } from './rd-encrypt-decrypt.service';

describe('RdEncryptDecryptService', () => {
  let service: RdEncryptDecryptService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RdEncryptDecryptService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
