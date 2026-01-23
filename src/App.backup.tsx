import React, { useState, useEffect } from 'react';
import { Plus, Filter, Download, BarChart3, Calendar, Bell, Search, Menu, X } from 'lucide-react';
import PetCard from './components/pets/PetCard';
import AddPetModal from './components/pets/AddPetModal';
import Button from './components/common/Button';
import { usePets } from './hooks/usePets';
import { Pet, CreatePetDto } from './types/pet';
import { formatDate } from './utils/formatDate';

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPet, setEditingPet] = useState<Pet | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  const { 
    pets, 
    loading, 
    error, 
    addPet, 
    updatePet, 
    deletePet,
    getPetById 
  } = usePets();

  const handleAddPet = async (petData: CreatePetDto) => {
    try {
      await addPet(petData);
      setIsModalOpen(false);
      alert('✅ Pet adicionado com sucesso!');
    } catch (err) {
      alert('❌ Erro ao adicionar pet. Tente novamente.');
    }
  };

  const handleEditPet = async (petData: CreatePetDto) => {
    if (!editingPet) return;
    
    try {
      await updatePet(editingPet.id, petData);
      setIsModalOpen(false);
      setEditingPet(null);
      alert('✨ Pet atualizado com sucesso!');
    } catch (err) {
      alert('❌ Erro ao atualizar pet. Tente novamente.');
    }
  };

  const handleEditClick = (pet: Pet) => {
    setEditingPet(pet);
    setIsModalOpen(true);
  };

  const handleDeletePet = async (id: string) => {
    try {
      await deletePet(id);
      alert('🗑️ Pet removido com sucesso.');
    } catch (err) {
      alert('❌ Erro ao remover pet. Tente novamente.');
    }
  };

  const handleViewDetails = (id: string) => {
    const pet = getPetById(id);
    if (pet) {
      alert(`🐾 **Detalhes de ${pet.name}**\n\n` +
            `**Tipo:** ${pet.type === 'dog' ? 'Cachorro' : pet.type === 'cat' ? 'Gato' : pet.type === 'bird' ? 'Pássaro' : pet.type === 'rabbit' ? 'Coelho' : 'Outro'}\n` +
            `**Raça:** ${pet.breed}\n` +
            `**Idade:** ${new Date().getFullYear() - new Date(pet.birthDate).getFullYear()} anos\n` +
            `**Peso:** ${pet.weight} kg\n` +
            `**Cor:** ${pet.color}\n` +
            `**Status de Vacinação:** ${pet.vaccinationStatus === 'up-to-date' ? 'Em dia ✓' : pet.vaccinationStatus === 'pending' ? 'Pendente ⚠️' : 'Atrasado ❌'}\n` +
            `**Castrado/Estéril:** ${pet.spayedNeutered ? 'Sim ✓' : 'Não'}\n` +
            `**Data de Nascimento:** ${formatDate(pet.birthDate)}\n` +
            `**Microchip:** ${pet.microchipNumber || 'Não cadastrado'}`);
    }
  };

  const filteredPets = pets.filter(pet => {
    const matchesType = selectedType === 'all' || pet.type === selectedType;
    const matchesSearch = searchTerm === '' || 
      pet.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pet.breed.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pet.color.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesType && matchesSearch;
  });

  const stats = {
    total: pets.length,
    dogs: pets.filter(p => p.type === 'dog').length,
    cats: pets.filter(p => p.type === 'cat').length,
    birds: pets.filter(p => p.type === 'bird').length,
    rabbits: pets.filter(p => p.type === 'rabbit').length,
    others: pets.filter(p => !['dog', 'cat', 'bird', 'rabbit'].includes(p.type)).length,
    vaccinated: pets.filter(p => p.vaccinationStatus === 'up-to-date').length,
    pending: pets.filter(p => p.vaccinationStatus === 'pending').length,
    overdue: pets.filter(p => p.vaccinationStatus === 'overdue').length,
  };

  const petTypes = [
    { value: 'all', label: 'Todos', emoji: '🐾', count: stats.total },
    { value: 'dog', label: 'Cachorros', emoji: '🐶', count: stats.dogs },
    { value: 'cat', label: 'Gatos', emoji: '🐱', count: stats.cats },
    { value: 'bird', label: 'Pássaros', emoji: '🐦', count: stats.birds },
    { value: 'rabbit', label: 'Coelhos', emoji: '🐰', count: stats.rabbits },
    { value: 'other', label: 'Outros', emoji: '🐾', count: stats.others },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header/Navbar */}
      <header className="bg-white shadow-lg border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo e título */}
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="p-2 rounded-lg hover:bg-gray-100 lg:hidden"
              >
                {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
              
              <div className="flex items-center space-x-2">
                <div className="h-10 w-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                  <span className="text-white font-bold text-lg">🐾</span>
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-900">Pet Manager</h1>
                  <p className="text-xs text-gray-500">Sistema Profissional</p>
                </div>
              </div>
            </div>

            {/* Barra de pesquisa */}
            <div className="hidden md:flex flex-1 max-w-xl mx-8">
              <div className="relative w-full">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Buscar pets por nome, raça ou cor..."
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            {/* Botão adicionar pet */}
            <div className="flex items-center space-x-3">
              <div className="hidden md:block text-right">
                <p className="text-sm font-semibold text-gray-900">SEU NOME</p>
                <p className="text-xs text-gray-500">ID: SEU ID</p>
              </div>
              <Button
                variant="primary"
                leftIcon={<Plus className="h-4 w-4" />}
                onClick={() => {
                  setEditingPet(null);
                  setIsModalOpen(true);
                }}
              >
                Adicionar Pet
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Sidebar Mobile */}
      {sidebarOpen && (
        <div className="lg:hidden fixed inset-0 z-40">
          <div className="fixed inset-0 bg-black bg-opacity-25" onClick={() => setSidebarOpen(false)} />
          <div className="fixed inset-y-0 left-0 w-64 bg-white shadow-xl">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="h-10 w-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                    <span className="text-white font-bold text-lg">🐾</span>
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-gray-900">Pet Manager</h2>
                    <p className="text-xs text-gray-500">Professional</p>
                  </div>
                </div>
                <button onClick={() => setSidebarOpen(false)} className="p-2">
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>
            
            <div className="p-4">
              <div className="mb-6">
                <div className="flex items-center space-x-3 p-3 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
                  <div className="h-10 w-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                    GS
                  </div>
                  <div>
                    <p className="text-sm font-semibold">SEU NOME</p>
                    <p className="text-xs text-gray-600">ID: SEU ID</p>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <button className="w-full text-left px-4 py-3 rounded-lg bg-blue-50 text-blue-700 font-medium">
                  🏠 Dashboard
                </button>
                <button className="w-full text-left px-4 py-3 rounded-lg hover:bg-gray-100 text-gray-700">
                  🐶 Meus Pets
                </button>
                <button className="w-full text-left px-4 py-3 rounded-lg hover:bg-gray-100 text-gray-700">
                  📅 Agenda
                </button>
                <button className="w-full text-left px-4 py-3 rounded-lg hover:bg-gray-100 text-gray-700">
                  💊 Saúde
                </button>
                <button className="w-full text-left px-4 py-3 rounded-lg hover:bg-gray-100 text-gray-700">
                  ⚙️ Configurações
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Conteúdo principal */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-2xl p-6 shadow-lg">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm font-medium text-blue-100">Total de Pets</p>
                <p className="text-3xl font-bold mt-2">{stats.total}</p>
              </div>
              <div className="h-12 w-12 bg-white/20 rounded-xl flex items-center justify-center">
                <BarChart3 className="h-6 w-6" />
              </div>
            </div>
            <div className="mt-4 text-sm text-blue-100">
              {stats.dogs} 🐶 • {stats.cats} 🐱 • {stats.birds} 🐦
            </div>
          </div>

          <div className="bg-gradient-to-br from-green-500 to-green-600 text-white rounded-2xl p-6 shadow-lg">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm font-medium text-green-100">Vacinas em Dia</p>
                <p className="text-3xl font-bold mt-2">{stats.vaccinated}</p>
              </div>
              <div className="h-12 w-12 bg-white/20 rounded-xl flex items-center justify-center">
                <Calendar className="h-6 w-6" />
              </div>
            </div>
            <div className="mt-4 text-sm text-green-100">
              {stats.pending} pendentes • {stats.overdue} atrasadas
            </div>
          </div>

          <div className="bg-gradient-to-br from-amber-500 to-amber-600 text-white rounded-2xl p-6 shadow-lg">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm font-medium text-amber-100">Lembretes</p>
                <p className="text-3xl font-bold mt-2">{stats.pending + stats.overdue}</p>
              </div>
              <div className="h-12 w-12 bg-white/20 rounded-xl flex items-center justify-center">
                <Bell className="h-6 w-6" />
              </div>
            </div>
            <div className="mt-4 text-sm text-amber-100">
              Ações necessárias para seus pets
            </div>
          </div>

          <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white rounded-2xl p-6 shadow-lg">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm font-medium text-purple-100">Saúde Geral</p>
                <p className="text-3xl font-bold mt-2">{
                  stats.total > 0 ? Math.round((stats.vaccinated / stats.total) * 100) : 0
                }%</p>
              </div>
              <div className="h-12 w-12 bg-white/20 rounded-xl flex items-center justify-center">
                <span className="text-xl">❤️</span>
              </div>
            </div>
            <div className="mt-4 text-sm text-purple-100">
              {stats.vaccinated} de {stats.total} pets saudáveis
            </div>
          </div>
        </div>

        {/* Filtros */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Meus Pets</h2>
              <p className="text-gray-600">Gerencie todos os seus animais de estimação</p>
            </div>
            
            <div className="flex items-center space-x-3">
              <div className="hidden sm:block">
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-600">Visualização:</span>
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 rounded-lg ${viewMode === 'grid' ? 'bg-blue-100 text-blue-600' : 'text-gray-500 hover:bg-gray-100'}`}
                  >
                    ▦
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 rounded-lg ${viewMode === 'list' ? 'bg-blue-100 text-blue-600' : 'text-gray-500 hover:bg-gray-100'}`}
                  >
                    ☰
                  </button>
                </div>
              </div>
              
              <Button
                variant="outline"
                leftIcon={<Filter className="h-4 w-4" />}
              >
                Filtrar
              </Button>
              
              <Button
                variant="outline"
                leftIcon={<Download className="h-4 w-4" />}
              >
                Exportar
              </Button>
            </div>
          </div>

          {/* Filtros por tipo */}
          <div className="flex flex-wrap gap-2 mb-6">
            {petTypes.map((type) => (
              <button
                key={type.value}
                className={`flex items-center space-x-2 px-4 py-2 rounded-full font-medium transition-all ${
                  selectedType === type.value
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md'
                    : 'bg-white text-gray-700 hover:bg-gray-100 shadow-sm'
                }`}
                onClick={() => setSelectedType(type.value)}
              >
                <span>{type.emoji}</span>
                <span>{type.label}</span>
                <span className={`text-xs px-2 py-1 rounded-full ${
                  selectedType === type.value
                    ? 'bg-white/30'
                    : 'bg-gray-100'
                }`}>
                  {type.count}
                </span>
              </button>
            ))}
          </div>

          {/* Barra de pesquisa mobile */}
          <div className="md:hidden mb-6">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Buscar pets..."
                className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Lista de Pets */}
        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
            <p className="mt-4 text-gray-600">Carregando pets...</p>
          </div>
        ) : error ? (
          <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
            <p className="text-red-600 font-medium">{error}</p>
            <button 
              className="mt-4 px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200"
              onClick={() => window.location.reload()}
            >
              Tentar novamente
            </button>
          </div>
        ) : filteredPets.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-12 text-center">
            <div className="mx-auto w-24 h-24 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mb-6">
              <span className="text-3xl">🐾</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              {searchTerm || selectedType !== 'all' ? 'Nenhum pet encontrado' : 'Nenhum pet cadastrado'}
            </h3>
            <p className="text-gray-600 mb-6 max-w-md mx-auto">
              {searchTerm 
                ? `Nenhum pet encontrado para "${searchTerm}". Tente buscar por nome, raça ou tipo.`
                : selectedType !== 'all'
                ? `Você ainda não tem pets do tipo ${selectedType === 'dog' ? 'cachorro' : selectedType === 'cat' ? 'gato' : selectedType === 'bird' ? 'pássaro' : selectedType === 'rabbit' ? 'coelho' : 'outro'}.`
                : 'Comece adicionando seu primeiro pet ao sistema.'}
            </p>
            <Button
              variant="primary"
              leftIcon={<Plus className="h-4 w-4" />}
              onClick={() => {
                setEditingPet(null);
                setIsModalOpen(true);
              }}
              size="lg"
            >
              Adicionar Primeiro Pet
            </Button>
          </div>
        ) : (
          <div className={`grid gap-6 ${
            viewMode === 'grid' 
              ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' 
              : 'grid-cols-1'
          }`}>
            {filteredPets.map((pet) => (
              <PetCard
                key={pet.id}
                pet={pet}
                onEdit={handleEditClick}
                onDelete={handleDeletePet}
                onViewDetails={handleViewDetails}
              />
            ))}
          </div>
        )}

        {/* Info footer */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8 text-center">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              🚀 Sistema Pet Manager Funcionando!
            </h3>
            <p className="text-gray-600 mb-4">
              React + TypeScript + Vite + Tailwind CSS
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-500">
              <span>⚡ Performance Otimizada</span>
              <span>•</span>
              <span>🔒 Dados Seguros</span>
              <span>•</span>
              <span>📱 Responsivo</span>
              <span>•</span>
              <span>🎨 UI Moderna</span>
            </div>
            <p className="mt-6 text-sm text-gray-400">
              Desenvolvido por <strong>SEU NOME-864552</strong> • Esp. em Computação em Nuvem (CLOUD COMPUTING)
            </p>
          </div>
        </div>
      </main>

      {/* Modal Add/Edit Pet */}
      <AddPetModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingPet(null);
        }}
        onSubmit={editingPet ? handleEditPet : handleAddPet}
        isLoading={loading}
        pet={editingPet}
      />
    </div>
  );
}

export default App;


