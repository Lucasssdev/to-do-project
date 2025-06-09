import React, { useCallback, useState } from "react";
import { TouchableOpacity, View, Text } from "react-native";
import { style } from "./style";
import Storage, { Task } from "../../server/taskService";
import { useFocusEffect } from "@react-navigation/native";
import { themas } from "../../global/themes";

// Hook customizado que controla o estado e a lógica da tela principal
export function useControllerMain() {
  // Estados para gerenciar a visibilidade de modais e a lista de tarefas
  const [modalVisible, setModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [detailModalVisible, setDetailModalVisible] = useState(false);
  const [tasks, setTasks] = useState<Task[]>([]); // Armazenando as tarefas
  const [currentTask, setCurrentTask] = useState<Task | null>(null); // Tarefa atualmente selecionada

  const server = new Storage(); // Instância do serviço de armazenamento de tarefas

  // Função assíncrona para buscar tarefas do servidor
  const getTasks = async () => {
    const tasks = await server.getTasks(); // Chamada ao serviço para obter tarefas
    setTasks(tasks); // Atualizando o estado com as tarefas recebidas
  };

  // Efeito que será executado quando o componente ganhar foco
  useFocusEffect(
    useCallback(() => {
      getTasks(); // Chamando a função para obter tarefas
    }, [])
  );

  // Função para fechar o modal e atualizar as tarefas
  const onCloseModal = () => {
    setModalVisible(false); // Esconde o modal de criação
    getTasks(); // Atualiza a lista de tarefas
  };

  // Função para editar uma tarefa
  const editTask = async (task: Task) => {
    await server.editTask(task); // Chamada ao serviço para editar a tarefa
    getTasks(); // Atualiza a lista de tarefas
  };

  // Função para deletar uma tarefa pelo ID
  const deleteTask = async (id: string) => {
    await server.deleteTask(id); // Chamada ao serviço para deletar a tarefa
    getTasks(); // Atualiza a lista de tarefas
  };

  // Função para abrir o modal de detalhes de uma tarefa
  const openDetailModal = (task: Task) => {
    setCurrentTask(task); // Define a tarefa atual para detalhes
    setDetailModalVisible(true); // Abre o modal de detalhes
  };

  // Função para renderizar cada tarefa na lista
  const renderTask = ({ item }: { item: Task }) => (
    <TouchableOpacity
      style={style.taskContainer}
      onPress={() => openDetailModal(item)} // Ação ao pressionar a tarefa
    >
      <TouchableOpacity
        style={[
          style.circleButton,
          {
            backgroundColor: item.completed
              ? themas.colors.green // Cor se a tarefa estiver concluída
              : themas.colors.white,
          },
          {
            borderColor: item.completed
              ? themas.colors.green // Cor da borda se concluída
              : themas.colors.red,
          },
        ]}
        onPress={() => toggleTaskCompletion(item.id)} // Alterna o estado de conclusão da tarefa
      />
      <View style={style.taskDetails}>
        <Text
          style={{
            ...style.taskTitle,
            textDecorationLine: item.completed ? "line-through" : "none", // Riscado se concluído
            color: item.completed
              ? themas.colors.midGray // Cor do texto se concluído
              : themas.colors.black,
          }}
        >
          {item.name}
        </Text>
        {item.description &&
          !item.completed && ( // Exibe descrição se não concluído
            <Text style={style.taskDescription}>{item.description}</Text>
          )}
        {item.dateFinish &&
          !item.completed && ( // Exibe data de término se não concluído
            <Text style={style.taskDate}>Due: {item.dateFinish}</Text>
          )}
      </View>
    </TouchableOpacity>
  );

  const toggleTaskCompletion = async (id: string) => {
    await server.toggleTaskCompletion(id); // Chama a função do servidor para alternar a conclusão
    getTasks(); // Atualiza a lista de tarefas
  };

  // Retorna as funções e estados para serem usados no componente principal
  return {
    modalVisible,
    setModalVisible,
    editModalVisible,
    setEditModalVisible,
    detailModalVisible,
    setDetailModalVisible,
    tasks,
    currentTask,
    setCurrentTask,
    toggleTaskCompletion,
    renderTask,
    onCloseModal,
    editTask,
    deleteTask,
  };
}
