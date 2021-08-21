import { TestBed } from '@angular/core/testing';

import { PlanItemService } from './plan-item.service';

describe('PlanItemService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PlanItemService = TestBed.get(PlanItemService);
    expect(service).toBeTruthy();
  });
});
