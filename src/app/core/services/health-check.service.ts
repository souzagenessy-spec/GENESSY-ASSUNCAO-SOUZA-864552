import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class HealthCheckService {
  private isHealthy = new BehaviorSubject<boolean>(false);
  healthStatus$ = this.isHealthy.asObservable();
  
  constructor(private http: HttpClient) {}
  
  checkHealth(): Promise<boolean> {
    return this.http.get('/health', { responseType: 'text', observe: 'response' })
      .toPromise()
      .then(response => {
        const healthy = response?.status === 200;
        this.isHealthy.next(healthy);
        return healthy;
      })
      .catch(() => {
        this.isHealthy.next(false);
        return false;
      });
  }
}
