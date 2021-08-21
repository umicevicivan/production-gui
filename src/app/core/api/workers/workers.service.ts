import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WorkersService {

  constructor(private http: HttpClient) {
  }

  getWorkers(): Observable<Worker[]> {
    return this.http.get<Worker[]>(`${environment.productionServiceUrl}/worker`);
  }

  getWorker(id): Observable<Worker> {
    return this.http.get<Worker>(`${environment.productionServiceUrl}/worker/${id}`);
  }
}
