import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";

// Interface que define a estrutura de uma tarefa
export interface Task {
  id: string;
  name: string;
  description?: string; //não obrigatório
  dateCreated: Date;
  dateFinish?: string; //não obrigatório
  completed: boolean;
}

// Interface para representar uma nova tarefa a ser criada
export interface CreatedTask {
  name: string;
  description?: string;
  dateFinish?: string;
}

// Classe Storage que encapsula as operações de armazenamento de tarefas
class Storage {
  // Método assíncrono para carregar tarefas existentes do AsyncStorage
  public async loadExistingTasks() {
    const keys = await AsyncStorage.getAllKeys(); // Obtém todas as chaves armazenadas
    const taskKeys = keys.filter((key) => key.startsWith("@task_")); // Filtra as chaves que começam com "@task_"

    // Carrega as tarefas
    const loadedTasks = await Promise.all(
      taskKeys.map(async (key) => {
        const taskstring = await AsyncStorage.getItem(key); // Obtém a string da tarefa
        return taskstring ? JSON.parse(taskstring) : null; // Retorna a tarefa parseada ou null
      })
    );
    return loadedTasks.filter((task) => task !== null); // Filtra tarefas null e retorna as carregadas
  }

  // Método para gerar um ID alfanumérico único
  public generateAlphanumericId() {
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"; // Conjunto de caracteres permitidos
    let result = "";
    const length = 10; // Comprimento do ID gerado
    for (let i = 0; i < length; i++) {
      result += characters.charAt(
        Math.floor(Math.random() * characters.length) // Seleciona um caractere aleatório
      );
    }
    return result; // Retorna o ID gerado
  }

  // Método assíncrono para criar uma nova tarefa
  public async createTask(newTask: CreatedTask) {
    const { name, dateFinish, description } = newTask; // Desestruturação do objeto newTask
    if (!name) {
      Alert.alert("Validação", "O nome da tarefa é obrigatório."); // Valida se o nome está presente
      return; // Retorna se o nome não for fornecido
    }

    try {
      const existingTasks = await this.loadExistingTasks(); // Carrega tarefas existentes
      let newId: string;

      // Gera um novo ID que não conflita com IDs existentes
      do {
        newId = this.generateAlphanumericId(); // Gera um ID alfanumérico
      } while (existingTasks.some((task: Task) => task.id === newId)); // Verifica se o ID já existe

      const date = new Date();
      const dateCreated = date.toISOString(); // Armazena a data de criação em formato ISO

      const task = {
        id: newId, // Define o ID gerado
        name, // Nome da tarefa
        description, // Descrição opcional
        dateFinish, // Data de conclusão opcional
        dateCreated, // Data de criação
        completed: false, // Define como não concluída por padrão
      };

      // Armazena a nova tarefa no AsyncStorage
      await AsyncStorage.setItem(`@task_${newId}`, JSON.stringify(task));
      return task; // Retorna a nova tarefa criada
    } catch (error) {
      Alert.alert("Error", "Ocorreu um erro ao criar a tarefa."); // Alerta em caso de erro
      return null; // Retorna null em caso de falha
    }
  }

  // Método assíncrono para carregar todas as tarefas
  public async loadTasks() {
    const keys = await AsyncStorage.getAllKeys(); // Obtém todas as chaves armazenadas
    const taskKeys = keys.filter((key) => key.startsWith("@task_")); // Filtra as chaves das tarefas

    // Carrega e parseia as tarefas a partir das chaves filtradas
    const loadedTasks = await Promise.all(
      taskKeys.map(async (key) => {
        const taskstring = await AsyncStorage.getItem(key); // Obtém a string da tarefa
        return taskstring ? JSON.parse(taskstring) : null; // Retorna a tarefa parseada ou null
      })
    );
    const filteredTasks = loadedTasks.filter((task) => task !== null); // Filtra tarefas null

    // Ordena as tarefas pela data de criação
    const tasks = filteredTasks.sort((b, a) => {
      return (
        new Date(b.dateCreated).getTime() - new Date(a.dateCreated).getTime() // Ordenação decrescente
      );
    });

    return tasks; // Retorna a lista de tarefas ordenadas
  }

  // Método assíncrono para alternar o estado de conclusão de uma tarefa
  public async toggleTaskCompletion(id: string) {
    try {
      const tasks = await this.getTasks(); // Obtém todas as tarefas
      const updatedTasks = tasks.map(
        (task) =>
          task.id === id ? { ...task, completed: !task.completed } : task // Alterna o estado de conclusão
      );
      // Armazena as tarefas atualizadas
      await Promise.all(
        updatedTasks.map(
          (task) =>
            AsyncStorage.setItem(`@task_${task.id}`, JSON.stringify(task)) // Atualiza cada tarefa
        )
      );
    } catch (error) {
      console.error("Error updating task completion:", error); // Loga o erro
      Alert.alert("Error", "Error updating task completion");
    }
  }

  // Método assíncrono para deletar uma tarefa específica
  public async deleteTask(id: string) {
    try {
      await AsyncStorage.removeItem(`@task_${id}`); // Remove a tarefa do AsyncStorage
    } catch (error) {
      console.error("Error deleting task:", error); // Loga o erro
      Alert.alert("Error", "Error Deleting task");
    }
  }

  // Método assíncrono para editar uma tarefa específica
  public async editTask(updatedTask: Task) {
    try {
      const tasks = await this.getTasks(); // Obtém todas as tarefas
      const updatedTasks = tasks.map(
        (task) =>
          task.id === updatedTask.id ? { ...task, ...updatedTask } : task // Atualiza a tarefa específica
      );
      // Armazena as tarefas atualizadas
      await Promise.all(
        updatedTasks.map(
          (task) =>
            AsyncStorage.setItem(`@task_${task.id}`, JSON.stringify(task)) // Atualiza cada tarefa
        )
      );
    } catch (error) {
      console.error("Error editing task:", error); // Loga o erro
      Alert.alert("Error", "Error Editing task");
    }
  }

  // Método get para obter todas as tarefas
  public async getTasks() {
    const tasks = await this.loadTasks(); // Carrega as tarefas
    return tasks; // Retorna as tarefas carregadas
  }

  // Método assíncrono para gerar tarefas de teste
  public async generateTestTasks() {
    try {
      // Nomes de tarefas de exemplo
      const taskNames = [
        "Responder e-mails",
        "Reunião com equipe",
        "Preparar apresentação",
        "Revisar documentação",
        "Fazer backup de arquivos",
        "Atualizar planilha de orçamento",
        "Marcar consulta médica",
        "Comprar mantimentos",
        "Pagar contas do mês",
        "Limpar área de trabalho",
        "Estudar novo framework",
        "Fazer exercícios físicos",
        "Organizar agenda da semana",
        "Ligar para cliente",
        "Planejar viagem",
      ];

      // Criar 15 tarefas com datas e status variados
      const tasks = [];
      const now = new Date();

      for (let i = 0; i < 15; i++) {
        // Gerar data aleatória nos últimos 30 dias
        const randomDaysAgo = Math.floor(Math.random() * 30);
        const date = new Date();
        date.setDate(now.getDate() - randomDaysAgo);

        // Formatação de data (ex: 2023-06-12)
        const dateStr = date.toISOString().split("T")[0];

        // 60% das tarefas serão marcadas como concluídas
        const isCompleted = Math.random() < 0.6;

        // Data de conclusão (apenas para tarefas concluídas)
        let completionDate = null;
        if (isCompleted) {
          // Concluída 1-3 dias após a criação
          const completionDaysAfter = Math.floor(Math.random() * 3) + 1;
          const completeDate = new Date(date);
          completeDate.setDate(date.getDate() + completionDaysAfter);
          completionDate = completeDate.toISOString().split("T")[0];
        }

        // Criar tarefa - use name em vez de title
        const task = {
          id: `test-${Date.now()}-${i}`,
          name: taskNames[i], // Use name em vez de title para corresponder ao seu modelo
          description: `Esta é uma tarefa de teste gerada automaticamente (#${
            i + 1
          })`,
          completed: isCompleted,
          dateCreated: dateStr,
          dateFinish: completionDate,
          priority: Math.floor(Math.random() * 3) + 1, // 1, 2 ou 3
        };

        tasks.push(task);

        // Salvar no AsyncStorage
        await AsyncStorage.setItem(`@task_${task.id}`, JSON.stringify(task));
      }

      return tasks;
    } catch (error) {
      console.error("Erro ao gerar tarefas de teste:", error);
      Alert.alert("Erro", "Não foi possível gerar tarefas de teste");
      return [];
    }
  }

  // Método assíncrono para limpar todas as tarefas
  public async clearAllTasks() {
    try {
      const keys = await AsyncStorage.getAllKeys();
      const taskKeys = keys.filter((key) => key.startsWith("@task_"));

      if (taskKeys.length === 0) {
        Alert.alert("Info", "Não há tarefas para limpar.");
        return false;
      }

      // Remover todas as tarefas
      await AsyncStorage.multiRemove(taskKeys);
      return true;
    } catch (error) {
      console.error("Erro ao limpar todas as tarefas:", error);
      Alert.alert("Erro", "Não foi possível limpar as tarefas");
      return false;
    }
  }
}

export default Storage; // Exporta a classe Storage como padrão
