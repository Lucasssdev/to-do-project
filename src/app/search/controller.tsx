import React, { useCallback, useEffect, useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { style } from "./style";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Storage, { Task } from "../../server/taskService";
import { useFocusEffect } from "@react-navigation/native";
import { themas } from "../../global/themes";

export function useControllerSearch() {
  const [modalVisible, setModalVisible] = useState(false); // Estado para controlar a visibilidade do modal de pesquisa
  const [editModalVisible, setEditModalVisible] = useState(false); // Estado para controle do modal de edição
  const [detailModalVisible, setDetailModalVisible] = useState(false); // Estado para controle do modal de detalhes da tarefa
  const [tasks, setTasks] = useState<Task[]>([]); // Estado para armazenar a lista de tarefas
  const [filtredTasks, setFiltredTasks] = useState<Task[]>([]); // Estado para armazenar tarefas filtradas
  const [currentTask, setCurrentTask] = useState<Task | null>(null); // Estado para armazenar a tarefa atualmente selecionada
  const [search, setSearch] = useState<string>(""); // Estado para armazenar a string de pesquisa

  const server = new Storage(); // Instância do Storage para manipular tarefas

  // Função para filtrar tarefas com base na string de pesquisa
  const filterTasks = () => {
    if (!search.length) return; // Retorna se a string de pesquisa estiver vazia
    const filtred = tasks.filter((task) => task.name.includes(search)); // Filtra tarefas que contêm a string de pesquisa
    setFiltredTasks(filtred); // Atualiza as tarefas filtradas
  };

  // Efeito colateral que filtra as tarefas sempre que a string de pesquisa ou a lista de tarefas muda
  useEffect(() => {
    filterTasks(); // Chama a função de filtro
  }, [search, tasks]); // Dependências: pesquisa e tarefas

  // Atualiza a string de pesquisa com o texto fornecido
  const onChange = (text: string) => {
    setSearch(text); // Atualiza o estado de pesquisa
  };

  // Função assíncrona para buscar todas as tarefas do servidor
  const getTasks = async () => {
    const tasks = await server.getTasks(); // Obtém tarefas do servidor
    setTasks(tasks); // Atualiza o estado de tarefas
    setFiltredTasks([]); // Reseta as tarefas filtradas
  };

  // Função assíncrona que busca tarefas ao ganhar foco no componente
  const getTasksFocus = async () => {
    const tasks = await server.getTasks(); // Obtém tarefas do servidor
    setTasks(tasks); // Atualiza o estado de tarefas
    setFiltredTasks([]); // Reseta as tarefas filtradas
    setSearch(""); // Limpa a string de pesquisa
  };

  // Executa a função getTasksFocus e getTasks quando o componente ganha foco
  useFocusEffect(
    useCallback(() => {
      getTasksFocus(); // Chama a função para obter tarefas
      getTasks(); // Chama a função para obter tarefas
    }, []) // Array de dependências vazio significa que será executado uma vez ao montar
  );

  // Função para fechar o modal de pesquisa e buscar tarefas novamente
  const onCloseModal = () => {
    setModalVisible(false); // Fecha o modal
    getTasks(); // Obtém tarefas novamente
  };

  // Função assíncrona para editar uma tarefa
  const editTask = async (task: Task) => {
    await server.editTask(task); // Edita a tarefa no servidor
    getTasks(); // Obtém tarefas novamente
  };

  // Função assíncrona para deletar uma tarefa pelo ID
  const deleteTask = async (id: string) => {
    await server.deleteTask(id); // Deleta a tarefa no servidor
    getTasks(); // Obtém tarefas novamente
  };

  // Função para abrir o modal de detalhes da tarefa
  const openDetailModal = (task: any) => {
    setCurrentTask(task); // Define a tarefa atual
    setDetailModalVisible(true); // Abre o modal de detalhes
  };

  // Função para renderizar cada tarefa na lista
  const renderTask = ({ item }: { item: Task }) => {
    return (
      <TouchableOpacity
        style={style.taskContainer} // Estilo do container da tarefa
        onPress={() => openDetailModal(item)} // Abre o modal de detalhes ao pressionar
      >
        {/* Botão de círculo para marcar a tarefa como concluída ou não */}
        <TouchableOpacity
          style={[
            style.circleButton, // Estilo do botão
            {
              backgroundColor: item.completed // Cor de fundo com base na conclusão
                ? themas.colors.green
                : themas.colors.white,
            },
            {
              borderColor: item.completed // Cor da borda com base na conclusão
                ? themas.colors.green
                : themas.colors.red,
            },
          ]}
          onPress={() => toggleTaskCompletion(item.id)} // Alterna a conclusão da tarefa ao pressionar
        />
        {/* Detalhes da tarefa */}
        <View style={style.taskDetails}>
          <Text
            style={{
              ...style.taskTitle, // Estilo do título da tarefa
              textDecorationLine: item.completed ? "line-through" : "none", // Riscado se concluído
              color: item.completed
                ? themas.colors.midGray // Cor do texto com base na conclusão
                : themas.colors.black,
            }}
          >
            {item.name}
          </Text>
          {item.description && !item.completed && (
            <Text style={style.taskDescription}>{item.description}</Text> // Exibe descrição se existir e não estiver concluída
          )}
          {item.dateFinish && !item.completed && (
            <Text style={style.taskDate}>Due: {item.dateFinish}</Text> // Exibe a data de conclusão se existir e não estiver concluída
          )}
        </View>
      </TouchableOpacity>
    );
  };

  // Função assíncrona para alternar o estado de conclusão da tarefa
  const toggleTaskCompletion = async (id: string) => {
    await server.toggleTaskCompletion(id); // Chama a função do servidor para alternar a conclusão
    getTasks(); // Atualiza a lista de tarefas
  };

  // Retorna um objeto com estados e funções para serem usados pelo componente pai
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
    onChange,
    search,
    filtredTasks,
  };
}
