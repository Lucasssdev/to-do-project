import React from "react";
import { FlatList, Text, View } from "react-native";
import { style } from "./style";
import { useControllerSearch } from "./controller";
import EditTaskModal from "../modalEdition";
import TaskDetailModal from "../modalDetails";
import InputComponent from "../../components/inputText";

export default function Search() {
  const controller = useControllerSearch();
  // Usa o hook para obter o estado e as funções necessárias para o gerenciamento de tarefas

  return (
    <View style={style.container}>
      {/* Container principal do componente */}

      <View style={style.inputContainer}>
        {/* Container para o campo de entrada de pesquisa */}
        <InputComponent
          customStyle={style.inputCustom}
          value={controller.search}
          placeholder={"Search the Task:"}
          onChangeText={(text: string) => controller.onChange(text)}
        />
      </View>

      <FlatList
        data={controller.filtredTasks}
        renderItem={controller.renderTask}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={style.taskList}
        ListEmptyComponent={
          <Text style={style.emptyText}>No tasks filtrete.</Text>
        }
      />

      {controller.currentTask && (
        // Se houver uma tarefa selecionada
        <EditTaskModal
          visible={controller.editModalVisible}

          onClose={() => controller.setEditModalVisible(false)}
          task={controller.currentTask}
          onEdit={controller.editTask}
          onDelete={controller.deleteTask}
        />
      )}

      {controller.currentTask && (
        // Se houver uma tarefa selecionada
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
}
