// petService.ts - API SIMPLES para pets
export interface Pet {
  id: number;
  nome: string;
  especie: string;
  raca: string;
  idade: number;
  peso: number;
  tutor: string;
  contato: string;
  createdAt: string;
  updatedAt: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

// Dados de exemplo
const mockPets: Pet[] = [
  { id: 1, nome: "Rex", especie: "Cachorro", raca: "Labrador", idade: 3, peso: 25, tutor: "João Silva", contato: "joao@email.com", createdAt: "2024-01-15", updatedAt: "2024-01-15" },
  { id: 2, nome: "Mimi", especie: "Gato", raca: "Siamês", idade: 2, peso: 4, tutor: "Maria Santos", contato: "maria@email.com", createdAt: "2024-01-16", updatedAt: "2024-01-16" }
];

// Funções da API
export const getPets = async (page = 1, limit = 10, nome?: string) => {
  console.log("getPets chamado", { page, limit, nome });
  await new Promise(resolve => setTimeout(resolve, 300));
  
  let filtered = mockPets;
  if (nome) {
    filtered = mockPets.filter(p => p.nome.toLowerCase().includes(nome.toLowerCase()));
  }
  
  const start = (page - 1) * limit;
  return {
    data: filtered.slice(start, start + limit),
    total: filtered.length,
    page,
    limit,
    totalPages: Math.ceil(filtered.length / limit)
  };
};

export const getPetById = async (id: number) => {
  console.log("getPetById chamado", id);
  await new Promise(resolve => setTimeout(resolve, 200));
  const pet = mockPets.find(p => p.id === id);
  if (!pet) throw new Error("Pet não encontrado");
  return { data: pet };
};

export const createPet = async (petData: any) => {
  console.log("createPet chamado", petData);
  await new Promise(resolve => setTimeout(resolve, 400));
  const newPet = {
    ...petData,
    id: mockPets.length + 1,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  mockPets.push(newPet);
  return { data: newPet };
};

export const updatePet = async (id: number, petData: any) => {
  console.log("updatePet chamado", { id, petData });
  await new Promise(resolve => setTimeout(resolve, 300));
  const index = mockPets.findIndex(p => p.id === id);
  if (index === -1) throw new Error("Pet não encontrado");
  const updatedPet = { ...mockPets[index], ...petData, updatedAt: new Date().toISOString() };
  mockPets[index] = updatedPet;
  return { data: updatedPet };
};

export const deletePet = async (id: number) => {
  console.log("deletePet chamado", id);
  await new Promise(resolve => setTimeout(resolve, 250));
  const index = mockPets.findIndex(p => p.id === id);
  if (index === -1) throw new Error("Pet não encontrado");
  mockPets.splice(index, 1);
  return { message: "Pet removido" };
};
