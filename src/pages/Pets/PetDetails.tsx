import { useParams, Link } from "react-router-dom"
import { PawPrint, ArrowLeft, Edit, Calendar } from "lucide-react"

export default function PetDetails() {
  const { id } = useParams()

  // Mock data
  const pet = {
    id: 1,
    name: "Rex",
    species: "Cachorro",
    age: 3,
    breed: "Labrador",
    weight: "25kg",
    birthDate: "15/03/2023",
    tutor: { id: 1, name: "João Silva" }
  }

  return (
    <div>
      <div className="mb-6">
        <Link to="/pets" className="flex items-center text-blue-600 hover:text-blue-800">
          <ArrowLeft className="w-5 h-5 mr-2" />
          Voltar para lista
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow">
        <div className="p-6 border-b">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center mr-4">
                <PawPrint className="w-8 h-8 text-blue-600" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">{pet.name}</h1>
                <p className="text-gray-600">ID: {pet.id}</p>
              </div>
            </div>
            <Link
              to={`/pets/edit/${pet.id}`}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center"
            >
              <Edit className="w-5 h-5 mr-2" />
              Editar Pet
            </Link>
          </div>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-lg font-bold mb-4">Informações do Pet</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-600">Espécie</label>
                  <p className="mt-1">{pet.species}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600">Idade</label>
                  <p className="mt-1">{pet.age} anos</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600">Raça</label>
                  <p className="mt-1">{pet.breed}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600">Peso</label>
                  <p className="mt-1">{pet.weight}</p>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-lg font-bold mb-4">Informações Adicionais</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-600">Data de Nascimento</label>
                  <div className="flex items-center mt-1">
                    <Calendar className="w-4 h-4 mr-2 text-gray-400" />
                    <p>{pet.birthDate}</p>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600">Tutor</label>
                  <div className="mt-2 p-3 bg-gray-50 rounded-lg">
                    <p className="font-medium">{pet.tutor.name}</p>
                    <Link 
                      to={`/tutors/${pet.tutor.id}`}
                      className="text-sm text-blue-600 hover:text-blue-800 mt-1 inline-block"
                    >
                      Ver perfil do tutor →
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
