import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UnitOfMeasure } from './unit-of-measure';

@Injectable({
  providedIn: 'root'
})
export class UnitsOfMeasureService {

  constructor(private http: HttpClient) {
  }

  getUnits(): Observable<UnitOfMeasure[]> {
    return this.http.get<UnitOfMeasure[]>(`${environment.productionServiceUrl}/unitsOfMeasure`);
  }

  getUnit(id): Observable<UnitOfMeasure> {
    return this.http.get<UnitOfMeasure>(`${environment.productionServiceUrl}/unitsOfMeasure/${id}`);
  }

}
