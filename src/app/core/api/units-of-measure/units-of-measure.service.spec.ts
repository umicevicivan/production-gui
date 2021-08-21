/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { UnitsOfMeasureService } from './units-of-measure.service';

describe('Service: UnitsOfMeasure', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UnitsOfMeasureService]
    });
  });

  it('should ...', inject([UnitsOfMeasureService], (service: UnitsOfMeasureService) => {
    expect(service).toBeTruthy();
  }));
});
