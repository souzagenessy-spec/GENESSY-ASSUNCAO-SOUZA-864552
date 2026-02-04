export interface Tutor {
  id: number
  name: string
  email: string
  phone: string
  address: string
  document: string
  createdAt: string
  updatedAt: string
}

export interface Veterinarian {
  id: number
  name: string
  email: string
  phone: string
  specialty: string
  licenseNumber: string
  active: boolean
}

export interface PetWithTutor {
  id: number
  name: string
  breed: string
  status: "ativo" | "adotado" | "tratamento"
  age: number
  type: "cachorro" | "gato" | "pássaro" | "outro"
  tutor: Tutor
  veterinarian?: Veterinarian
  observations?: string
  registeredAt: string
}
