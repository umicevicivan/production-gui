import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AnnualPlan } from './annual-plan';

@Injectable({
  providedIn: 'root',
})
export class AnnualPlansService {

  constructor(private http: HttpClient) {
  }

  getPlans(): Observable<AnnualPlan[]> {
    return this.http.get<AnnualPlan[]>(`${environment.productionServiceUrl}/annualPlan`);
  }

  getPlan(id): Observable<AnnualPlan> {
    return this.http.get<AnnualPlan>(`${environment.productionServiceUrl}/annualPlan/${id}`);
  }

  updatePlan(id: number, plan: AnnualPlan) {
    return this.http.put(`${environment.productionServiceUrl}/annualPlan/${id}`, plan);
  }

  addPlan(plan: AnnualPlan) {
    return this.http.post(`${environment.productionServiceUrl}/annualPlan`, plan);
  }

  deletePlan(id: number) {
    return this.http.delete(`${environment.productionServiceUrl}/annualPlan/${id}`);
  }
}
