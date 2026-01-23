import { TestBed } from '@angular/core/testing';
import { HealthCheckService } from './health-check.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('HealthCheckService', () => {
  let service: HealthCheckService;
  
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [HealthCheckService]
    });
    
    service = TestBed.inject(HealthCheckService);
  });
  
  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  
  it('should have healthStatus$ observable', () => {
    expect(service.healthStatus$).toBeDefined();
  });
});
