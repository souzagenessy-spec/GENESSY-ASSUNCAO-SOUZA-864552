import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import { Save, ArrowLeft, Upload } from "lucide-react"

export default function PetForm() {
  const navigate = useNavigate()
  const [form, setForm] = useState({
    name: "",
    species: "dog",
    age: "",
    breed: "",
    weight: ""
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Aqui faria submit para API
    navigate("/pets")
  }

  return (
    <div>
      <div className="mb-6">
        <Link to="/pets" className="flex items-center text-blue-600 hover:text-blue-800">
          <ArrowLeft className="w-5 h-5 mr-2" />
          Voltar para lista
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow p-6">
        <h1 className="text-2xl font-bold mb-6">Cadastrar Novo Pet</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-2">Nome do Pet *</label>
              <input
                type="text"
                value={form.name}
                onChange={(e) => setForm({...form, name: e.target.value})}
                className="w-full px-4 py-3 border rounded-lg"
                placeholder="Ex: Rex, Luna"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Espécie *</label>
              <select
                value={form.species}
                onChange={(e) => setForm({...form, species: e.target.value})}
                className="w-full px-4 py-3 border rounded-lg"
              >
                <option value="dog">Cachorro</option>
                <option value="cat">Gato</option>
                <option value="bird">Pássaro</option>
                <option value="other">Outro</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Idade (anos) *</label>
              <input
                type="number"
                value={form.age}
                onChange={(e) => setForm({...form, age: e.target.value})}
                className="w-full px-4 py-3 border rounded-lg"
                placeholder="Ex: 3"
                min="0"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Raça</label>
              <input
                type="text"
                value={form.breed}
                onChange={(e) => setForm({...form, breed: e.target.value})}
                className="w-full px-4 py-3 border rounded-lg"
                placeholder="Ex: Labrador, Siames"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Foto do Pet</label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
              <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">Arraste e solte uma imagem ou clique para selecionar</p>
              <p className="text-sm text-gray-500 mt-2">PNG, JPG até 5MB</p>
            </div>
          </div>

          <div className="flex justify-end space-x-4 pt-6 border-t">
            <Link
              to="/pets"
              className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Cancelar
            </Link>
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 flex items-center"
            >
              <Save className="w-5 h-5 mr-2" />
              Salvar Pet
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
