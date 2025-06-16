import React from "react";
import { View, Text, FlatList, TouchableOpacity, Alert } from "react-native";
import { style } from "./style";
import ButtonNew from "../../components/buttonNew";
import CreateTaskModal from "../modalCreateTask";
import EditTaskModal from "../modalEdition";
import TaskDetailModal from "../modalDetails";
import { useControllerMain } from "./controller";
import SearchBar from "../../components/searchBar";
import Storage from "../../server/taskService";
import { themas } from "../../global/themes";
import { Ionicons } from "@expo/vector-icons";

const Main = () => {
  const controller = useControllerMain();
  const storage = new Storage();

  // Função para gerar tarefas de teste
  const generateTestTasks = async () => {
    try {
      Alert.alert(
        "Gerar Tarefas de Teste",
        "Isso gerará 15 tarefas aleatórias para teste. Deseja continuar?",
        [
          {
            text: "Cancelar",
            style: "cancel",
          },
          {
            text: "Confirmar",
            onPress: async () => {
              const tasks = await storage.generateTestTasks();
              Alert.alert(
                "Sucesso!",
                `${tasks.length} tarefas de teste foram geradas.`
              );
              // Recarregar a lista
              controller.loadTasks();
            },
          },
        ]
      );
    } catch (error) {
      console.error("Erro ao gerar tarefas de teste:", error);
      Alert.alert("Erro", "Não foi possível gerar tarefas de teste");
    }
  };

  // Função para limpar todas as tarefas
  const clearAllTasks = async () => {
    Alert.alert(
      "Limpar Todas as Tarefas",
      "Você tem certeza que deseja remover todas as tarefas? Esta ação não pode ser desfeita.",
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Limpar",
          style: "destructive",
          onPress: async () => {
            const success = await storage.clearAllTasks();
            if (success) {
              Alert.alert("Sucesso", "Todas as tarefas foram removidas.");
              controller.loadTasks(); // Recarregar a lista vazia
            }
          },
        },
      ]
    );
  };

  return (
    <View style={style.container}>
      {/* Barra de pesquisa acima da lista */}
      <SearchBar
        onSearch={controller.handleSearch}
        placeholder="Buscar por nome ou descrição..."
      />

      {/* Botão para gerar tarefas de teste */}
      <TouchableOpacity style={style.testButton} onPress={generateTestTasks}>
        <Text style={style.testButtonText}>Gerar Tarefas de Teste</Text>
      </TouchableOpacity>

      <FlatList
        data={controller.filteredTasks}
        renderItem={controller.renderTask}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={style.taskList}
        ListEmptyComponent={
          <Text style={style.emptyText}>Nenhuma tarefa encontrada.</Text>
        }
      />

      <View style={style.absoluteButtonContainer}>
        {/* Botão para limpar todas as tarefas */}
        <TouchableOpacity style={style.clearButton} onPress={clearAllTasks}>
          <Ionicons name="trash-outline" size={24} color="white" />
        </TouchableOpacity>

        {/* Botão para adicionar tarefa */}
        <ButtonNew onPress={() => controller.setModalVisible(true)} />
      </View>

      <CreateTaskModal
        visible={controller.modalVisible}
        onClose={() => controller.onCloseModal()}
      />

      {controller.currentTask && (
        <EditTaskModal
          visible={controller.editModalVisible}
          onClose={() => controller.setEditModalVisible(false)}
          task={controller.currentTask}
          onEdit={controller.editTask}
          onDelete={controller.deleteTask}
        />
      )}

      {controller.currentTask && (
        <TaskDetailModal
          visible={controller.detailModalVisible}
          onClose={() => controller.setDetailModalVisible(false)}
          task={controller.currentTask}
          onDelete={controller.deleteTask}
          onEdit={(task) => {
            controller.setCurrentTask(task);
            controller.setEditModalVisible(true);
          }}
        />
      )}
    </View>
  );
};

export default Main;
