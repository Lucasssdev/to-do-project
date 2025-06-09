import React from "react";
import { View, Text, FlatList } from "react-native";
import { style } from "./style";
import ButtonNew from "../../components/buttonNew";
import CreateTaskModal from "../modalCreateTask";
import EditTaskModal from "../modalEdition";
import TaskDetailModal from "../modalDetails";
import { useControllerMain } from "./controller";

const Main = () => {
  const controller = useControllerMain();

  return (
    <View style={style.container}>
      <FlatList
        data={controller.tasks} // Dados das tarefas obtidas do controller
        renderItem={controller.renderTask} // Função para renderizar cada item
        keyExtractor={(item) => item.id.toString()} // Define a chave de cada item
        contentContainerStyle={style.taskList} // Estilo do container da lista
        ListEmptyComponent={<Text style={style.emptyText}>No tasks.</Text>} // Mensagem quando não há tarefas
      />

      <View style={style.absoluteButtonContainer}>
        <ButtonNew onPress={() => controller.setModalVisible(true)} />
      </View>

      <CreateTaskModal
        visible={controller.modalVisible} // Controla a visibilidade do modal
        onClose={() => controller.onCloseModal()} // Função para fechar o modal
      />

      {/* Modal para edição de tarefas, visível apenas se houver uma tarefa selecionada */}
      {controller.currentTask && (
        <EditTaskModal
          visible={controller.editModalVisible} // Controla a visibilidade do modal de edição
          onClose={() => controller.setEditModalVisible(false)} // Função para fechar o modal de edição
          task={controller.currentTask} // Tarefa atual a ser editada
          onEdit={controller.editTask} // Função para editar a tarefa
          onDelete={controller.deleteTask} // Função para deletar a tarefa
        />
      )}

      {controller.currentTask && (
        <TaskDetailModal
          visible={controller.detailModalVisible} // Controla a visibilidade do modal de detalhes
          onClose={() => controller.setDetailModalVisible(false)} // Função para fechar o modal de detalhes
          task={controller.currentTask} // Tarefa atual para visualizar detalhes
          onDelete={controller.deleteTask} // Função para deletar a tarefa
          onEdit={(task) => {
            controller.setCurrentTask(task); // Atualiza a tarefa atual
            controller.setEditModalVisible(true); // Abre o modal de edição
          }}
        />
      )}
    </View>
  );
};

export default Main;
