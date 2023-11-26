import { TestBed } from '@angular/core/testing';

import { AxRequestServiceService } from './ax-request-service.service';

describe('AxRequestServiceService', () => {
  let service: AxRequestServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AxRequestServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
