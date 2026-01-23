import React, { useState } from 'react';
import { Filter } from 'lucide-react';

interface FiltersProps {
  onFilterChange: (filterType: string, value: string) => void;
  onSortChange: (sortBy: string) => void;
}

const Filters: React.FC<FiltersProps> = ({ onFilterChange, onSortChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex gap-4 mb-6">
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          <Filter size={18} />
          Filtros
        </button>
        
        {isOpen && (
          <div className="absolute top-full mt-2 bg-white shadow-xl rounded-lg p-4 z-50 w-64 border">
            <h3 className="font-bold mb-3">Filtrar por:</h3>
            
            <div className="mb-3">
              <label className="block mb-1">Tipo:</label>
              <select
                className="w-full border rounded p-2"
                onChange={(e) => onFilterChange('type', e.target.value)}
              >
                <option value="">Todos</option>
                <option value="cachorro">Cachorro</option>
                <option value="gato">Gato</option>
                <option value="outro">Outro</option>
              </select>
            </div>
            
            <div className="mb-3">
              <label className="block mb-1">Status:</label>
              <select
                className="w-full border rounded p-2"
                onChange={(e) => onFilterChange('status', e.target.value)}
              >
                <option value="">Todos</option>
                <option value="ativo">Ativo</option>
                <option value="adotado">Adotado</option>
                <option value="perdido">Perdido</option>
              </select>
            </div>
          </div>
        )}
      </div>
      
      <select
        className="px-4 py-2.5 border border-gray-300 rounded-lg bg-white"
        onChange={(e) => onSortChange(e.target.value)}
      >
        <option value="">Ordenar...</option>
        <option value="newest">Mais recente</option>
        <option value="oldest">Mais antigo</option>
        <option value="name_asc">Nome (A-Z)</option>
        <option value="name_desc">Nome (Z-A)</option>
        <option value="age_asc">Idade crescente</option>
        <option value="age_desc">Idade decrescente</option>
      </select>
    </div>
  );
};

export default Filters;