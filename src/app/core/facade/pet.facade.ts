import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

export interface Pet {
  id: number;
  nome: string;
  especie: string;
  idade: number;
  raca?: string;
}

@Injectable({ providedIn: 'root' })
export class PetFacade {
  private petsSubject = new BehaviorSubject<Pet[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);
  
  pets$: Observable<Pet[]> = this.petsSubject.asObservable();
  loading$: Observable<boolean> = this.loadingSubject.asObservable();
  
  constructor() {}
  
  // Simulação - você vai conectar com PetService depois
  loadPets(): void {
    this.loadingSubject.next(true);
    
    // Dados mock para demonstração
    const mockPets: Pet[] = [
      { id: 1, nome: 'Rex', especie: 'Cachorro', idade: 3, raca: 'Pastor Alemão' },
      { id: 2, nome: 'Mimi', especie: 'Gato', idade: 2, raca: 'Siamês' }
    ];
    
    setTimeout(() => {
      this.petsSubject.next(mockPets);
      this.loadingSubject.next(false);
    }, 1000);
  }
}
