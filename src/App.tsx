import React, { useState, useEffect } from "react";
import { Plus, Search } from "lucide-react";
import { Toaster, toast } from "react-hot-toast";
import PetCard from "./components/PetCard";
import PetModal from "./components/PetModal";
import Filters from "./components/Filters";
import { Pet } from "./types/pet";
import { mockPets } from "./data/mockPets";

function App() {
  const [pets, setPets] = useState<Pet[]>(mockPets);
  const [filteredPets, setFilteredPets] = useState<Pet[]>(mockPets);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPet, setEditingPet] = useState<Pet | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({ type: "", status: "" });
  const [sortBy, setSortBy] = useState("");

  const handleAddPet = (petData: any) => {
    const newPet: Pet = {
      id: Date.now(),
      name: petData.name,
      type: petData.type,
      breed: petData.breed,
      age: parseInt(petData.age) || 0,
      owner: petData.owner || "",
      status: petData.status || "ativo",
      createdAt: new Date().toISOString(),
      notes: petData.notes || "",
    };

    setPets((prev) => [newPet, ...prev]);
    setIsModalOpen(false);
    setEditingPet(null);
    toast.success("Pet adicionado com sucesso!");
  };

  const handleEditPet = (petData: any) => {
    setPets((prev) =>
      prev.map((pet) => (pet.id === petData.id ? { ...pet, ...petData } : pet))
    );
    setIsModalOpen(false);
    setEditingPet(null);
    toast.success("Pet atualizado com sucesso!");
  };

  const handleDeletePet = (id: number) => {
    if (window.confirm("Tem certeza que deseja excluir este pet?")) {
      setPets((prev) => prev.filter((pet) => pet.id !== id));
      toast.success("Pet excluído com sucesso!");
    }
  };

  const handleFilterChange = (type: string, value: string) => {
    setFilters((prev) => ({ ...prev, [type]: value }));
  };

  const handleSortChange = (sortValue: string) => {
    setSortBy(sortValue);
  };

  useEffect(() => {
    let result = [...pets];

    if (searchTerm) {
      result = result.filter(
        (pet) =>
          pet.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          pet.breed.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (filters.type) {
      result = result.filter((pet) => pet.type === filters.type);
    }
    if (filters.status) {
      result = result.filter((pet) => pet.status === filters.status);
    }

    if (sortBy) {
      switch (sortBy) {
        case "newest":
          result.sort(
            (a, b) =>
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
          break;
        case "oldest":
          result.sort(
            (a, b) =>
              new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
          );
          break;
        case "name_asc":
          result.sort((a, b) => a.name.localeCompare(b.name));
          break;
        case "name_desc":
          result.sort((a, b) => b.name.localeCompare(a.name));
          break;
        case "age_asc":
          result.sort((a, b) => a.age - b.age);
          break;
        case "age_desc":
          result.sort((a, b) => b.age - a.age);
          break;
      }
    }

    setFilteredPets(result);
  }, [pets, searchTerm, filters, sortBy]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Toaster position="top-right" />

      {/* Header SIMPLES - SEM MENU LATERAL */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">?? Pet Manager</h1>
              <p className="text-gray-600 mt-1">
                Sistema de gerenciamento de pets
              </p>
            </div>

            <button
              onClick={() => {
                setEditingPet(null);
                setIsModalOpen(true);
              }}
              className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              <Plus size={20} />
              Adicionar Pet
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Barra de busca */}
        <div className="mb-6">
          <div className="relative">
            <Search
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              type="text"
              placeholder="Buscar por nome, raça ou dono..."
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Filtros */}
        <Filters
          onFilterChange={handleFilterChange}
          onSortChange={handleSortChange}
        />

        {/* Estatísticas */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-4 rounded-lg shadow-sm border">
            <p className="text-gray-600 text-sm">Total de Pets</p>
            <p className="text-2xl font-bold">{pets.length}</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm border">
            <p className="text-gray-600 text-sm">Ativos</p>
            <p className="text-2xl font-bold text-green-600">
              {pets.filter((p) => p.status === "ativo").length}
            </p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm border">
            <p className="text-gray-600 text-sm">Adotados</p>
            <p className="text-2xl font-bold text-blue-600">
              {pets.filter((p) => p.status === "adotado").length}
            </p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm border">
            <p className="text-gray-600 text-sm">Cachorros</p>
            <p className="text-2xl font-bold text-orange-600">
              {pets.filter((p) => p.type === "cachorro").length}
            </p>
          </div>
        </div>

        {/* Lista de Pets */}
        {filteredPets.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">Nenhum pet encontrado.</p>
            <button
              onClick={() => {
                setSearchTerm("");
                setFilters({ type: "", status: "" });
                setSortBy("");
              }}
              className="mt-4 text-blue-600 hover:text-blue-800"
            >
              Limpar filtros
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPets.map((pet) => (
              <PetCard
                key={pet.id}
                pet={pet}
                onEdit={() => {
                  setEditingPet(pet);
                  setIsModalOpen(true);
                }}
                onDelete={() => handleDeletePet(pet.id)}
              />
            ))}
          </div>
        )}
      </main>

      {/* Modal */}
      {isModalOpen && (
        <PetModal
          pet={editingPet}
          onClose={() => {
            setIsModalOpen(false);
            setEditingPet(null);
          }}
          onSubmit={editingPet ? handleEditPet : handleAddPet}
        />
      )}
    </div>
  );
}

export default App;
