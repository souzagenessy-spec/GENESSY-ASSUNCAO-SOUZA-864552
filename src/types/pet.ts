export interface Pet {
  id: number
  name: string
  breed: string
  status: "ativo" | "adotado"
  age: number
  type: "cachorro" | "gato" | "pássaro"
  ownerName: string
  observations?: string
  registeredAt: string
}

export type PetStatus = "ativo" | "adotado"
export type PetType = "cachorro" | "gato" | "pássaro"
