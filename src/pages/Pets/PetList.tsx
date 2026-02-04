import { Link } from "react-router-dom"
import { PawPrint, Search, Plus } from "lucide-react"
import { useState } from "react"

export default function PetList() {
  const [search, setSearch] = useState("")

  const pets = [
    { id: 1, name: "Rex", species: "Cachorro", age: 3, breed: "Labrador" },
    { id: 2, name: "Luna", species: "Gato", age: 2, breed: "Siames" },
    { id: 3, name: "Thor", species: "Cachorro", age: 5, breed: "Golden Retriever" },
    { id: 4, name: "Mel", species: "Gato", age: 1, breed: "Persa" },
  ]

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Pets</h1>
          <p className="text-gray-600">Gerencie todos os pets do sistema</p>
        </div>
        <Link
          to="/pets/new"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center"
        >
          <Plus className="w-5 h-5 mr-2" />
          Novo Pet
        </Link>
      </div>

      {/* Busca */}
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10 w-full px-4 py-3 border rounded-lg"
            placeholder="Buscar pet por nome..."
          />
        </div>
      </div>

      {/* Lista de Pets */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {pets.map((pet) => (
          <div key={pet.id} className="bg-white rounded-xl shadow p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                <PawPrint className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h3 className="font-bold text-lg">{pet.name}</h3>
                <p className="text-sm text-gray-600">{pet.species} • {pet.age} anos</p>
              </div>
            </div>
            <div className="mb-4">
              <p className="text-sm"><span className="font-medium">Raça:</span> {pet.breed}</p>
            </div>
            <div className="flex justify-between">
              <Link to={`/pets/${pet.id}`} className="text-blue-600 hover:text-blue-800">
                Ver detalhes
              </Link>
              <Link to={`/pets/edit/${pet.id}`} className="text-gray-600 hover:text-gray-800">
                Editar
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
