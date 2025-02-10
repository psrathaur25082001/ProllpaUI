import { TestBed } from '@angular/core/testing';

import { RolloutServiceService } from './rollout-service.service';

describe('RolloutServiceService', () => {
  let service: RolloutServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RolloutServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
