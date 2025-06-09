import { useState } from "react";
import { Alert } from "react-native";
import Storage from "../../server/taskService";

// Função principal do hook, recebe um parâmetro onClose para fechar o modal de criação após salvar a tarefa
export function useControllerCreateTask(onClose: () => void) {
  // Estados locais para armazenar o nome, descrição e data de conclusão da tarefa
  const [taskName, setTaskName] = useState<string>("");
  const [taskDescription, setTaskDescription] = useState<string>("");
  const [taskDateFinish, setTaskDateFinish] = useState<string>("");

  // Instância de uma classe Storage para salvar a tarefa (conecta ao serviço de armazenamento)
  const storage = new Storage();

  // Função assíncrona para salvar uma nova tarefa
  const saveTask = async () => {
    try {
      // Cria um objeto newTask com os detalhes da tarefa preenchidos nos estados
      const newTask = {
        name: taskName,
        dateFinish: taskDateFinish,
        description: taskDescription,
      };

      // Chama o método createTask da instância storage para salvar a tarefa
      await storage.createTask(newTask);

      // Reseta os campos da tarefa após salvar
      setTaskName("");
      setTaskDescription("");
      setTaskDateFinish("");

      // Fecha o modal chamando a função onClose passada como parâmetro
      onClose();
    } catch (error) {
      // Mostra um alerta em caso de erro e exibe o erro no console para depuração
      Alert.alert("Erro", "Error when saving.");
      console.error("Erro ao salvar a tarefa:", error); // Log do erro
    }
  };

  // Retorna os valores e funções para serem usados no componente de criação de tarefa
  return {
    taskName,
    setTaskName,
    taskDescription,
    setTaskDescription,
    taskDateFinish,
    setTaskDateFinish,
    saveTask,
  };
}
