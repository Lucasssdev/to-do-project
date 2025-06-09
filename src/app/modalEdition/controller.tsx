import { useState, useEffect } from "react";
import { EditTaskModalProps } from "./types"; // Importa a tipagem para as props esperadas

// Define o hook personalizado, que recebe as props necessárias para o modal de edição
export const useEditTaskController = ({
  task, 
  onEdit, 
  onDelete, 
  onClose, 
}: EditTaskModalProps) => {
  // Estados locais para armazenar os valores da tarefa
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [dateFinish, setDateFinish] = useState<string>("");

  // useEffect que carrega os dados da tarefa quando o `task` muda
  useEffect(() => {
    if (task) {
      setName(task.name); // Preenche o nome
      setDescription(task.description || ""); // Preenche a descrição, caso exista
      setDateFinish(task.dateFinish || ""); // Preenche a data de conclusão, caso exista
    }
  }, [task]);

  // Função para salvar as alterações na tarefa
  const handleSave = () => {
    if (task) {
      const newTask = { ...task, name, description, dateFinish }; // Cria uma nova tarefa com os dados atualizados
      onEdit(newTask); // Chama a função de edição passando a tarefa atualizada
      onClose(); // Fecha o modal após salvar
    }
  };

  // Função para deletar a tarefa
  const handleDelete = () => {
    if (task) {
      onDelete(task.id); // Chama a função de exclusão com o ID da tarefa
      onClose(); // Fecha o modal após deletar
    }
  };

  // Retorna todos os estados e funções necessários para o componente
  return {
    name,
    setName,
    description,
    setDescription,
    dateFinish,
    setDateFinish,
    handleSave,
    handleDelete,
  };
};
