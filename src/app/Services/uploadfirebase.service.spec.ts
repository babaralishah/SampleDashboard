import { TestBed } from '@angular/core/testing';

import { UploadfirebaseService } from './uploadfirebase.service';

describe('UploadfirebaseService', () => {
  let service: UploadfirebaseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UploadfirebaseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
