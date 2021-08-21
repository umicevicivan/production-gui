import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PlanItemService {

  constructor(private http: HttpClient) {
  }

  deletePlan(id: number) {
    return this.http.delete(`${environment.productionServiceUrl}/planItem/${id}`);
  }
}
