import React, { useState, useEffect } from "react";
import { X, Upload, Camera, Save } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Button from "@/components/common/Button";
import Input from "@/components/common/Input";
import Select from "@/components/common/Select";
import Textarea from "@/components/common/Textarea";
import { CreatePetDto, Pet } from "../../types/pet";

const petSchema = z.object({
  name: z.string().min(2, "Nome deve ter pelo menos 2 caracteres").max(50),
  type: z.enum(["dog", "cat", "bird", "rabbit", "other"], {
    required_error: "Selecione o tipo do pet",
  }),
  breed: z.string().min(2, "Raça deve ter pelo menos 2 caracteres"),
  age: z.number().min(0).max(30),
  weight: z.number().min(0.1).max(100),
  birthDate: z.string().min(1, "Data de nascimento é obrigatória"),
  color: z.string().min(2, "Cor deve ter pelo menos 2 caracteres"),
  microchipNumber: z.string().optional(),
  medicalNotes: z.string().optional(),
  dietNotes: z.string().optional(),
  behaviorNotes: z.string().optional(),
  spayedNeutered: z.boolean(),
});

type PetFormData = z.infer<typeof petSchema>;

interface AddPetModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: CreatePetDto) => Promise<void>;
  isLoading?: boolean;
  pet?: Pet | null;
}

const petTypes = [
  { value: "dog", label: "?? Cachorro" },
  { value: "cat", label: "?? Gato" },
  { value: "bird", label: "?? Pássaro" },
  { value: "rabbit", label: "?? Coelho" },
  { value: "other", label: "?? Outro" },
];

export default function AddPetModal({
  isOpen,
  onClose,
  onSubmit,
  isLoading = false,
  pet,
}: AddPetModalProps) {
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");
  const isEditing = !!pet;

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch,
  } = useForm<PetFormData>({
    resolver: zodResolver(petSchema),
    defaultValues: {
      name: "",
      type: "dog",
      breed: "",
      age: 0,
      weight: 0,
      color: "",
      spayedNeutered: false,
      birthDate: new Date().toISOString().split("T")[0],
    },
  });

  // Preencher formulário se estiver editando
  useEffect(() => {
    if (pet) {
      setValue("name", pet.name);
      setValue("type", pet.type);
      setValue("breed", pet.breed);
      setValue("age", pet.age);
      setValue("weight", pet.weight);
      setValue("color", pet.color);
      setValue("microchipNumber", pet.microchipNumber || "");
      setValue("medicalNotes", pet.medicalNotes || "");
      setValue("dietNotes", pet.dietNotes || "");
      setValue("behaviorNotes", pet.behaviorNotes || "");
      setValue("spayedNeutered", pet.spayedNeutered);
      setValue("birthDate", new Date(pet.birthDate).toISOString().split("T")[0]);
      
      if (pet.profileImageUrl) {
        setImagePreview(pet.profileImageUrl);
      }
    } else {
      reset();
      setProfileImage(null);
      setImagePreview("");
    }
  }, [pet, reset, setValue]);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setProfileImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFormSubmit = async (data: PetFormData) => {
    const petData: CreatePetDto = {
      ...data,
      birthDate: new Date(data.birthDate),
      profileImage: profileImage || undefined,
    };
    await onSubmit(petData);
    if (!isEditing) {
      resetForm();
    }
  };

  const resetForm = () => {
    reset();
    setProfileImage(null);
    setImagePreview("");
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <div
          className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
          onClick={handleClose}
        />

        <div className="inline-block transform overflow-hidden rounded-2xl bg-white text-left align-bottom shadow-2xl transition-all sm:my-8 sm:w-full sm:max-w-2xl sm:align-middle">
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="flex items-center justify-between border-b pb-3 mb-6">
              <div>
                <h3 className="text-xl font-bold leading-6 text-gray-900">
                  {isEditing ? "?? Editar Pet" : "?? Adicionar Novo Pet"}
                </h3>
                <p className="text-sm text-gray-500 mt-1">
                  {isEditing 
                    ? "Atualize as informações do seu pet" 
                    : "Preencha todas as informações do novo pet"}
                </p>
              </div>
              <button
                onClick={handleClose}
                className="rounded-full p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
              {/* Upload de Imagem */}
              <div className="flex flex-col items-center justify-center">
                <div className="relative">
                  <div className="h-40 w-40 overflow-hidden rounded-2xl border-4 border-white shadow-xl">
                    {imagePreview ? (
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
                        <Camera className="h-16 w-16 text-gray-400" />
                      </div>
                    )}
                  </div>
                  <label
                    htmlFor="profileImage"
                    className="absolute bottom-3 right-3 flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-purple-600 text-white shadow-lg hover:from-blue-700 hover:to-purple-700 transition-all"
                  >
                    <Upload className="h-5 w-5" />
                    <input
                      id="profileImage"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleImageUpload}
                    />
                  </label>
                </div>
                <p className="mt-3 text-sm text-gray-500">
                  Clique no ícone para {imagePreview ? "alterar" : "adicionar"} a foto
                </p>
              </div>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                {/* Nome */}
                <Input
                  label="Nome do Pet *"
                  placeholder="Digite o nome do pet"
                  {...register("name")}
                  error={errors.name?.message}
                />

                {/* Tipo */}
                <Select
                  label="Tipo *"
                  options={petTypes}
                  {...register("type")}
                  error={errors.type?.message}
                />

                {/* Raça */}
                <Input
                  label="Raça *"
                  placeholder="Ex: Labrador, Siames, Calopsita"
                  {...register("breed")}
                  error={errors.breed?.message}
                />

                {/* Idade */}
                <Input
                  label="Idade (anos) *"
                  type="number"
                  step="0.5"
                  min="0"
                  max="30"
                  {...register("age", { valueAsNumber: true })}
                  error={errors.age?.message}
                />

                {/* Peso */}
                <Input
                  label="Peso (kg) *"
                  type="number"
                  step="0.1"
                  min="0.1"
                  max="100"
                  {...register("weight", { valueAsNumber: true })}
                  error={errors.weight?.message}
                />

                {/* Data de Nascimento */}
                <Input
                  label="Data de Nascimento *"
                  type="date"
                  {...register("birthDate")}
                  error={errors.birthDate?.message}
                />

                {/* Cor */}
                <Input
                  label="Cor *"
                  placeholder="Ex: Preto, Branco, Marrom, Amarelo"
                  {...register("color")}
                  error={errors.color?.message}
                />

                {/* Número do Microchip */}
                <Input
                  label="Número do Microchip"
                  placeholder="Opcional - 15 dígitos"
                  {...register("microchipNumber")}
                  error={errors.microchipNumber?.message}
                />
              </div>

              {/* Castrado/Estéril */}
              <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-xl">
                <input
                  type="checkbox"
                  id="spayedNeutered"
                  className="h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  {...register("spayedNeutered")}
                />
                <label htmlFor="spayedNeutered" className="text-gray-700 font-medium">
                  Castrado/Estéril
                </label>
                <span className="text-sm text-gray-500 ml-auto">
                  (Importante para saúde do pet)
                </span>
              </div>

              {/* Notas Médicas */}
              <Textarea
                label="Notas Médicas"
                placeholder="Informações médicas importantes, alergias, condições especiais, medicamentos..."
                rows={3}
                {...register("medicalNotes")}
                error={errors.medicalNotes?.message}
              />

              {/* Notas de Dieta */}
              <Textarea
                label="Notas de Dieta"
                placeholder="Alimentação, horários, restrições alimentares, quantidade..."
                rows={2}
                {...register("dietNotes")}
                error={errors.dietNotes?.message}
              />

              {/* Notas de Comportamento */}
              <Textarea
                label="Notas de Comportamento"
                placeholder="Temperamento, hábitos, treinamento, socialização..."
                rows={2}
                {...register("behaviorNotes")}
                error={errors.behaviorNotes?.message}
              />

              {/* Botões */}
              <div className="flex justify-end space-x-3 border-t pt-6">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleClose}
                  disabled={isLoading}
                >
                  Cancelar
                </Button>
                <Button
                  type="submit"
                  variant="primary"
                  loading={isLoading}
                  disabled={isLoading}
                  leftIcon={isEditing ? <Save className="h-4 w-4" /> : undefined}
                >
                  {isLoading 
                    ? "Salvando..." 
                    : isEditing 
                    ? "Atualizar Pet" 
                    : "Adicionar Pet"
                  }
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}




