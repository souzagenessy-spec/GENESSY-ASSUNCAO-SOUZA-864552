import React, { useState } from "react";
import { Pet } from "../api/petService";

interface AddPetModalProps {
  onClose: () => void;
  onSave: (pet: Omit<Pet, "id" | "createdAt" | "updatedAt">) => void;
}

const AddPetModal: React.FC<AddPetModalProps> = ({ onClose, onSave }) => {
  const [form, setForm] = useState({
    nome: "",
    especie: "",
    raca: "",
    idade: 0,
    peso: 0,
    tutor: "",
    contato: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validação básica
    if (!form.nome || !form.especie) {
      alert("Nome e espécie são obrigatórios!");
      return;
    }
    
    onSave(form);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    
    if (type === "number") {
      setForm({ ...form, [name]: parseFloat(value) || 0 });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  return (
    <div style={{
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: "rgba(0,0,0,0.5)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      zIndex: 1000
    }}>
      <div style={{
        backgroundColor: "white",
        padding: "30px",
        borderRadius: "10px",
        width: "90%",
        maxWidth: "500px",
        boxShadow: "0 5px 15px rgba(0,0,0,0.3)"
      }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
          <h2 style={{ margin: 0 }}>➕ Adicionar Novo Pet</h2>
          <button 
            onClick={onClose}
            style={{
              background: "none",
              border: "none",
              fontSize: "24px",
              cursor: "pointer",
              color: "#666"
            }}
          >
            ×
          </button>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: "15px" }}>
            <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>Nome *</label>
            <input 
              name="nome" 
              type="text"
              placeholder="Ex: Rex, Mimi..." 
              value={form.nome}
              onChange={handleChange}
              required 
              style={{ 
                width: "100%", 
                padding: "10px",
                border: "1px solid #ddd",
                borderRadius: "5px",
                boxSizing: "border-box"
              }} 
            />
          </div>
          
          <div style={{ marginBottom: "15px" }}>
            <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>Espécie *</label>
            <input 
              name="especie" 
              type="text"
              placeholder="Ex: Cachorro, Gato..." 
              value={form.especie}
              onChange={handleChange}
              required 
              style={{ 
                width: "100%", 
                padding: "10px",
                border: "1px solid #ddd",
                borderRadius: "5px",
                boxSizing: "border-box"
              }} 
            />
          </div>
          
          <div style={{ marginBottom: "15px" }}>
            <label style={{ display: "block", marginBottom: "5px" }}>Raça</label>
            <input 
              name="raca" 
              type="text"
              placeholder="Ex: Labrador, Siamês..." 
              value={form.raca}
              onChange={handleChange}
              style={{ 
                width: "100%", 
                padding: "10px",
                border: "1px solid #ddd",
                borderRadius: "5px",
                boxSizing: "border-box"
              }} 
            />
          </div>
          
          <div style={{ display: "flex", gap: "15px", marginBottom: "15px" }}>
            <div style={{ flex: 1 }}>
              <label style={{ display: "block", marginBottom: "5px" }}>Idade (anos)</label>
              <input 
                name="idade" 
                type="number" 
                min="0"
                max="50"
                placeholder="Idade" 
                value={form.idade}
                onChange={handleChange}
                style={{ 
                  width: "100%", 
                  padding: "10px",
                  border: "1px solid #ddd",
                  borderRadius: "5px",
                  boxSizing: "border-box"
                }} 
              />
            </div>
            
            <div style={{ flex: 1 }}>
              <label style={{ display: "block", marginBottom: "5px" }}>Peso (kg)</label>
              <input 
                name="peso" 
                type="number" 
                step="0.1"
                min="0"
                placeholder="Peso" 
                value={form.peso}
                onChange={handleChange}
                style={{ 
                  width: "100%", 
                  padding: "10px",
                  border: "1px solid #ddd",
                  borderRadius: "5px",
                  boxSizing: "border-box"
                }} 
              />
            </div>
          </div>
          
          <div style={{ marginBottom: "15px" }}>
            <label style={{ display: "block", marginBottom: "5px" }}>Nome do Tutor</label>
            <input 
              name="tutor" 
              type="text"
              placeholder="Ex: João Silva" 
              value={form.tutor}
              onChange={handleChange}
              style={{ 
                width: "100%", 
                padding: "10px",
                border: "1px solid #ddd",
                borderRadius: "5px",
                boxSizing: "border-box"
              }} 
            />
          </div>
          
          <div style={{ marginBottom: "25px" }}>
            <label style={{ display: "block", marginBottom: "5px" }}>Contato</label>
            <input 
              name="contato" 
              type="text"
              placeholder="Ex: email@exemplo.com ou (11) 99999-9999" 
              value={form.contato}
              onChange={handleChange}
              style={{ 
                width: "100%", 
                padding: "10px",
                border: "1px solid #ddd",
                borderRadius: "5px",
                boxSizing: "border-box"
              }} 
            />
          </div>
          
          <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px" }}>
            <button 
              type="button" 
              onClick={onClose}
              style={{ 
                padding: "10px 20px", 
                background: "#f5f5f5",
                border: "1px solid #ddd",
                borderRadius: "5px",
                cursor: "pointer",
                fontWeight: "bold"
              }}
            >
              Cancelar
            </button>
            <button 
              type="submit"
              style={{ 
                padding: "10px 20px", 
                background: "#4CAF50", 
                color: "white", 
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
                fontWeight: "bold"
              }}
            >
              Salvar Pet
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddPetModal;
