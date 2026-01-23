import { Pet } from '../types/pet';

export const mockPets: Pet[] = [
  {
    id: 1,
    name: 'Rex',
    type: 'cachorro',
    breed: 'Pastor Alemão',
    age: 3,
    owner: 'João Silva',
    status: 'ativo',
    createdAt: '2023-01-15',
    notes: 'Muito brincalhão e obediente'
  },
  {
    id: 2,
    name: 'Mimi',
    type: 'gato',
    breed: 'Siamês',
    age: 2,
    owner: 'Maria Santos',
    status: 'adotado',
    createdAt: '2023-03-20',
    notes: 'Calma e carinhosa'
  },
  {
    id: 3,
    name: 'Piu Piu',
    type: 'pássaro',
    breed: 'Calopsita',
    age: 1,
    owner: 'Carlos Oliveira',
    status: 'ativo',
    createdAt: '2023-05-10',
    notes: 'Canta muito pela manhã'
  },
  {
    id: 4,
    name: 'Thor',
    type: 'cachorro',
    breed: 'Labrador',
    age: 4,
    owner: 'Ana Costa',
    status: 'em tratamento',
    createdAt: '2023-02-28',
    notes: 'Em tratamento para dermatite'
  },
  {
    id: 5,
    name: 'Luna',
    type: 'gato',
    breed: 'Persa',
    age: 5,
    owner: 'Pedro Alves',
    status: 'ativo',
    createdAt: '2023-04-05',
    notes: 'Gosta muito de dormir'
  },
  {
    id: 6,
    name: 'Bolt',
    type: 'cachorro',
    breed: 'Vira-lata',
    age: 2,
    owner: 'Fernanda Lima',
    status: 'perdido',
    createdAt: '2023-06-12',
    notes: 'Desapareceu no dia 10/06'
  }
];