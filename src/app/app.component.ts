import { Component } from '@angular/core';
import { PetFacade } from './core/facade/pet.facade';
import { HealthCheckService } from './core/services/health-check.service';

@Component({
  selector: 'app-root',
  template: \`
    <div style="padding: 20px; font-family: Arial;">
      <h1>🐾 Pet Manager - Sistema Frontend</h1>
      <p>Projeto para Processo Seletivo 001/2026</p>
      
      <div style="margin: 20px 0; padding: 15px; background: #f0f8ff; border-radius: 5px;">
        <h3>✅ Requisitos Implementados:</h3>
        <ul>
          <li>Health Check e Liveness/Readiness</li>
          <li>Facade Pattern com BehaviorSubject</li>
          <li>Testes Unitários</li>
          <li>Containerização Docker</li>
          <li>TypeScript com boas práticas</li>
        </ul>
      </div>
      
      <div style="margin: 20px 0;">
        <button (click)="loadPets()" style="padding: 10px 20px; background: #007bff; color: white; border: none; border-radius: 4px;">
          Carregar Pets (Facade Pattern)
        </button>
        
        <button (click)="checkHealth()" style="margin-left: 10px; padding: 10px 20px; background: #28a745; color: white; border: none; border-radius: 4px;">
          Testar Health Check
        </button>
      </div>
      
      <div *ngIf="loading" style="margin: 20px 0; color: #666;">
        Carregando pets...
      </div>
      
      <div *ngIf="pets.length > 0" style="margin: 20px 0;">
        <h3>Pets Carregados:</h3>
        <ul>
          <li *ngFor="let pet of pets">
            {{ pet.nome }} - {{ pet.especie }} ({{ pet.idade }} anos)
          </li>
        </ul>
      </div>
      
      <div *ngIf="healthStatus !== null" style="margin: 20px 0; padding: 10px; background: #e9ecef; border-radius: 4px;">
        <strong>Status Health Check:</strong> 
        <span [style.color]="healthStatus ? 'green' : 'red'">
          {{ healthStatus ? '✅ ONLINE' : '❌ OFFLINE' }}
        </span>
      </div>
      
      <div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #ccc; font-size: 12px; color: #666;">
        <p><strong>Candidato:</strong> [SEU NOME COMPLETO]</p>
        <p><strong>CPF:</strong> [PRIMEIROS 6 DÍGITOS]</p>
        <p><strong>Repositório GitHub:</strong> https://github.com/[usuario]/[repositorio]</p>
      </div>
    </div>
  \`
})
export class AppComponent {
  pets: any[] = [];
  loading = false;
  healthStatus: boolean | null = null;
  
  constructor(
    private petFacade: PetFacade,
    private healthService: HealthCheckService
  ) {
    // Observar pets do facade
    this.petFacade.pets$.subscribe(pets => {
      this.pets = pets;
      this.loading = false;
    });
    
    // Observar loading do facade
    this.petFacade.loading$.subscribe(loading => {
      this.loading = loading;
    });
    
    // Observar health status
    this.healthService.healthStatus$.subscribe(status => {
      this.healthStatus = status;
    });
  }
  
  loadPets(): void {
    this.petFacade.loadPets();
  }
  
  checkHealth(): void {
    this.healthService.checkHealth().then(status => {
      this.healthStatus = status;
    });
  }
}
