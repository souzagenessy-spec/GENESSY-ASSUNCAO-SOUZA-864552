export interface Pet {
  id: number;
  name: string;
  type: string;
  breed: string;
  age: number;
  owner?: string;
  status: string;
  createdAt: string;
  notes?: string;
}

export type PetFormData = Omit<Pet, 'id' | 'createdAt'>;
