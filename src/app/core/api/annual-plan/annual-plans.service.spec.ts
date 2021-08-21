/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { AnnualPlansService } from './annual-plans.service';

describe('Service: AnnualPlans', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AnnualPlansService]
    });
  });

  it('should ...', inject([AnnualPlansService], (service: AnnualPlansService) => {
    expect(service).toBeTruthy();
  }));
});
