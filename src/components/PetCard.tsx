import React from 'react';
import { Edit, Trash2, Calendar, User, Award } from 'lucide-react';
import { Pet } from '../types/pet';
import { formatDate } from '../utils/formatDate';

interface PetCardProps {
  pet: Pet;
  onEdit: () => void;
  onDelete: () => void;
}

const PetCard: React.FC<PetCardProps> = ({ pet, onEdit, onDelete }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ativo': return 'bg-green-100 text-green-800';
      case 'adotado': return 'bg-blue-100 text-blue-800';
      case 'perdido': return 'bg-red-100 text-red-800';
      case 'em tratamento': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'cachorro': return '??';
      case 'gato': return '??';
      case 'pássaro': return '??';
      case 'roedor': return '??';
      default: return '??';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR');
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border hover:shadow-md transition-shadow duration-300 overflow-hidden">
      <div className="p-5 border-b">
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-3">
            <span className="text-2xl">{getTypeIcon(pet.type)}</span>
            <div>
              <h3 className="text-lg font-bold text-gray-900">{pet.name}</h3>
              <p className="text-sm text-gray-600">{pet.breed}</p>
            </div>
          </div>
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(pet.status)}`}>
            {pet.status}
          </span>
        </div>
      </div>

      <div className="p-5 space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center gap-2">
            <Calendar size={16} className="text-gray-400" />
            <div>
              <p className="text-xs text-gray-500">Idade</p>
              <p className="font-medium">{pet.age} {pet.age === 1 ? 'ano' : 'anos'}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Award size={16} className="text-gray-400" />
            <div>
              <p className="text-xs text-gray-500">Tipo</p>
              <p className="font-medium capitalize">{pet.type}</p>
            </div>
          </div>
        </div>

        {pet.owner && (
          <div className="flex items-center gap-2">
            <User size={16} className="text-gray-400" />
            <div>
              <p className="text-xs text-gray-500">Dono</p>
              <p className="font-medium">{pet.owner}</p>
            </div>
          </div>
        )}

        {pet.notes && (
          <div>
            <p className="text-xs text-gray-500 mb-1">Observações</p>
            <p className="text-sm text-gray-700 line-clamp-2">{pet.notes}</p>
          </div>
        )}

        <div className="pt-3 border-t">
          <p className="text-xs text-gray-500">
            Cadastrado em: {formatDate(pet.createdAt)}
          </p>
        </div>
      </div>

      <div className="p-4 bg-gray-50 border-t flex justify-end gap-2">
        <button
          onClick={onEdit}
          className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          <Edit size={16} />
          Editar
        </button>
        <button
          onClick={onDelete}
          className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
        >
          <Trash2 size={16} />
          Excluir
        </button>
      </div>
    </div>
  );
};

export default PetCard;

