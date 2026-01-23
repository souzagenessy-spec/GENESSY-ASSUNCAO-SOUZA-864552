import React from "react";
import { Pet } from "../api/petService";

interface PetListProps {
  pets: Pet[];
  onEdit: (pet: Pet) => void;
  onDelete: (id: number) => void;
}

const PetList: React.FC<PetListProps> = ({ pets, onEdit, onDelete }) => {
  return (
    <div style={{ marginTop: "20px" }}>
      <h2>Lista de Pets</h2>
      {pets.length === 0 ? (
        <p>Nenhum pet cadastrado.</p>
      ) : (
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ backgroundColor: "#f2f2f2" }}>
              <th style={{ padding: "10px", border: "1px solid #ddd" }}>Nome</th>
              <th style={{ padding: "10px", border: "1px solid #ddd" }}>Espécie</th>
              <th style={{ padding: "10px", border: "1px solid #ddd" }}>Raça</th>
              <th style={{ padding: "10px", border: "1px solid #ddd" }}>Ações</th>
            </tr>
          </thead>
          <tbody>
            {pets.map((pet) => (
              <tr key={pet.id} style={{ borderBottom: "1px solid #ddd" }}>
                <td style={{ padding: "10px" }}>{pet.nome}</td>
                <td style={{ padding: "10px" }}>{pet.especie}</td>
                <td style={{ padding: "10px" }}>{pet.raca}</td>
                <td style={{ padding: "10px" }}>
                  <button
                    onClick={() => onEdit(pet)}
                    style={{ marginRight: "10px", padding: "5px 10px" }}
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => onDelete(pet.id)}
                    style={{ padding: "5px 10px", background: "#ff4444", color: "white" }}
                  >
                    Excluir
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default PetList;
