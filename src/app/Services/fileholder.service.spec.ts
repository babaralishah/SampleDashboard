import { TestBed } from '@angular/core/testing';

import { FileholderService } from './fileholder.service';

describe('FileholderService', () => {
  let service: FileholderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FileholderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
