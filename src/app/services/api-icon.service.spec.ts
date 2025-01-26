import { TestBed } from '@angular/core/testing';

import { ApiIconService } from './api-icon.service';

describe('ApiIconService', () => {
  let service: ApiIconService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiIconService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
