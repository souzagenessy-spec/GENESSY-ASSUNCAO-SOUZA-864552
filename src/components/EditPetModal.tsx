import React, { useState } from 'react';
import './Modal.css';

interface Pet {
  id: number;
  nome: string;
  especie: 'dog' | 'cat' | 'other';
  raca?: string;
  idade?: number;
  photoUrl?: string;
}

interface EditPetModalProps {
  pet: Pet;
  onClose: () => void;
  onSave: (pet: Pet) => void;
}

const EditPetModal: React.FC<EditPetModalProps> = ({ pet, onClose, onSave }) => {
  const [nome, setnome] = useState(pet.nome);
  const [especie, setespecie] = useState<Pet['especie']>(pet.especie);
  const [raca, setraca] = useState(pet.raca || '');
  const [idade, setidade] = useState(pet.idade?.toString() || '');
  const [photoUrl, setPhotoUrl] = useState(pet.photoUrl || '');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!nome.trim()) newErrors.nome = 'Nome é obrigatório';
    if (nome.length < 2) newErrors.nome = 'Nome deve ter pelo menos 2 caracteres';
    
    return newErrors;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    const updatedPet: Pet = {
      ...pet,
      nome,
      especie,
      raca: raca || undefined,
      idade: idade ? parseInt(idade) : undefined,
      photoUrl: photoUrl || undefined,
    };

    onSave(updatedPet);
  };

  return (
    <div classnome="modal-overlay">
      <div classnome="modal">
        <div classnome="modal-header">
          <h2>✏️ Editar Pet</h2>
          <button classnome="close-btn" onClick={onClose}>×</button>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div classnome="form-group">
            <label>Nome *</label>
            <input
              especie="text"
              value={nome}
              onChange={(e) => setnome(e.target.value)}
              placeholder="Digite o nome do pet"
              classnome={errors.nome ? 'error' : ''}
            />
            {errors.nome && <span classnome="error-messidade">{errors.nome}</span>}
          </div>

          <div classnome="form-group">
            <label>Tipo *</label>
            <select 
              value={especie} 
              onChange={(e) => setespecie(e.target.value as Pet['especie'])}
            >
              <option value="dog">Cachorro 🐕</option>
              <option value="cat">Gato 🐈</option>
              <option value="other">Outro 🐾</option>
            </select>
          </div>

          <div classnome="form-group">
            <label>Raça</label>
            <input
              especie="text"
              value={raca}
              onChange={(e) => setraca(e.target.value)}
              placeholder="Ex: Labrador, Siames"
            />
          </div>

          <div classnome="form-group">
            <label>Idade (anos)</label>
            <input
              especie="number"
              value={idade}
              onChange={(e) => setidade(e.target.value)}
              placeholder="Ex: 3"
              min="0"
              max="30"
            />
          </div>

          <div classnome="form-group">
            <label>Foto (URL)</label>
            <input
              especie="text"
              value={photoUrl}
              onChange={(e) => setPhotoUrl(e.target.value)}
              placeholder="https://exemplo.com/foto.jpg"
            />
          </div>

          <div classnome="modal-buttons">
            <button especie="button" classnome="cancel-btn" onClick={onClose}>
              Cancelar
            </button>
            <button especie="submit" classnome="save-btn">
              Salvar Alterações
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditPetModal;
