import { useState, useEffect } from 'react';
import { Pet, CreatePetDto } from '../types/pet';

const API_URL = 'http://localhost:3001/api'; // URL do backend

const mockPets: Pet[] = [
  {
    id: '1',
    name: 'Rex',
    type: 'dog',
    breed: 'Labrador Retriever',
    age: 3,
    weight: 28.5,
    birthDate: new Date('2020-05-15'),
    color: 'Dourado',
    microchipNumber: '123456789012345',
    medicalNotes: 'Alergia a certos grãos',
    dietNotes: 'Ração premium, 2x ao dia',
    behaviorNotes: 'Muito brincalhão, adora crianças',
    ownerId: 'user1',
    vetId: 'vet1',
    createdAt: new Date('2022-01-15'),
    updatedAt: new Date('2023-10-20'),
    lastVetVisit: new Date('2023-10-15'),
    nextVetVisit: new Date('2024-04-15'),
    vaccinationStatus: 'up-to-date',
    spayedNeutered: true,
    profileImageUrl: 'https://images.unsplash.com/photo-1552053831-71594a27632d?w=400&h=400&fit=crop',
  },
  {
    id: '2',
    name: 'Mimi',
    type: 'cat',
    breed: 'Siamês',
    age: 2,
    weight: 4.2,
    birthDate: new Date('2021-08-20'),
    color: 'Branco com pontos marrons',
    microchipNumber: '987654321098765',
    medicalNotes: 'Saudável, check-ups anuais',
    dietNotes: 'Ração úmida específica para gatos',
    behaviorNotes: 'Independente, gosta de carinho no seu tempo',
    ownerId: 'user1',
    vetId: 'vet2',
    createdAt: new Date('2022-03-10'),
    updatedAt: new Date('2023-11-05'),
    lastVetVisit: new Date('2023-11-01'),
    nextVetVisit: new Date('2024-05-01'),
    vaccinationStatus: 'pending',
    spayedNeutered: true,
    profileImageUrl: 'https://images.unsplash.com/photo-1514888286974-6d03bde4ba4?w=400&h=400&fit=crop',
  },
  {
    id: '3',
    name: 'Piu Piu',
    type: 'bird',
    breed: 'Calopsita',
    age: 1,
    weight: 0.3,
    birthDate: new Date('2022-11-10'),
    color: 'Amarelo com bochechas laranja',
    medicalNotes: 'Necessita de suplemento de cálcio',
    dietNotes: 'Mistura de sementes, frutas e vegetais',
    behaviorNotes: 'Canta muito de manhã, sociável',
    ownerId: 'user1',
    createdAt: new Date('2023-01-05'),
    updatedAt: new Date('2023-09-15'),
    lastVetVisit: new Date('2023-09-10'),
    nextVetVisit: new Date('2024-03-10'),
    vaccinationStatus: 'up-to-date',
    spayedNeutered: false,
    profileImageUrl: 'https://images.unsplash.com/photo-1552728089-57bdde30beb3?w=400&h=400&fit=crop',
  },
];

export const usePets = () => {
  const [pets, setPets] = useState<Pet[]>(mockPets);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchPets = async () => {
    setLoading(true);
    try {
      // Simulação de API call
      await new Promise(resolve => setTimeout(resolve, 500));
      setPets(mockPets);
      setError(null);
    } catch (err) {
      setError('Erro ao carregar pets');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const addPet = async (petData: CreatePetDto): Promise<Pet> => {
    setLoading(true);
    try {
      // Simulação de API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newPet: Pet = {
        id: Math.random().toString(36).substr(2, 9),
        ...petData,
        ownerId: 'user1',
        vetId: undefined,
        createdAt: new Date(),
        updatedAt: new Date(),
        lastVetVisit: undefined,
        nextVetVisit: undefined,
        vaccinationStatus: 'pending',
        profileImageUrl: petData.profileImage 
          ? URL.createObjectURL(petData.profileImage)
          : undefined,
      };

      setPets(prev => [...prev, newPet]);
      setError(null);
      return newPet;
    } catch (err) {
      setError('Erro ao adicionar pet');
      console.error(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updatePet = async (id: string, petData: Partial<CreatePetDto>): Promise<Pet> => {
    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const updatedPets = pets.map(pet => 
        pet.id === id 
          ? { 
              ...pet, 
              ...petData, 
              updatedAt: new Date(),
              age: petData.birthDate ? 
                new Date().getFullYear() - new Date(petData.birthDate).getFullYear() 
                : pet.age
            }
          : pet
      );
      
      setPets(updatedPets);
      const updatedPet = updatedPets.find(pet => pet.id === id)!;
      return updatedPet;
    } catch (err) {
      setError('Erro ao atualizar pet');
      console.error(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const deletePet = async (id: string): Promise<void> => {
    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 600));
      setPets(prev => prev.filter(pet => pet.id !== id));
      setError(null);
    } catch (err) {
      setError('Erro ao remover pet');
      console.error(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const getPetById = (id: string): Pet | undefined => {
    return pets.find(pet => pet.id === id);
  };

  useEffect(() => {
    fetchPets();
  }, []);

  return {
    pets,
    loading,
    error,
    addPet,
    updatePet,
    deletePet,
    getPetById,
    refetch: fetchPets,
  };
};
