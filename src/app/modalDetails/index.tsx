import React from "react";
import { View, Text, Modal } from "react-native";
import { style } from "./style"; 
import { TaskDetailModalProps } from "./types";
import ButtonEdit from "../../components/buttonEdit";
import ButtonDelete from "../../components/buttonDelete";
import ButtonClose from "../../components/buttonClose";

// Define o componente funcional TaskDetailModal com suas propriedades tipadas
const TaskDetailModal: React.FC<TaskDetailModalProps> = ({
  visible, // Controla se o modal está visível
  onClose, // Função para fechar o modal
  task, // Objeto de dados da tarefa atual
  onDelete, // Função para deletar a tarefa
  onEdit, // Função para editar a tarefa
}) => {
  return (
    <Modal
      animationType="slide" // Define o tipo de animação do modal
      transparent={true} // Define o fundo do modal como transparente
      visible={visible} // Define a visibilidade do modal
      onRequestClose={onClose} // Função para fechar o modal em caso de request
    >
      <View style={style.modalBackground}>
        <View style={style.modalContainer}>
          {/* Botão para fechar o modal */}
          <View style={style.buttonContainerClose}>
            <ButtonClose title="X" onPress={onClose} />
          </View>

          {/* Exibe o nome da tarefa */}
          <Text style={style.taskTitle}>{task?.name}</Text>

          {/* Exibe a descrição da tarefa, se houver */}
          {task?.description && (
            <Text style={style.taskDescription}>{task.description}</Text>
          )}

          {/* Exibe a data de criação formatada */}
          <Text style={style.taskDate}>
            Created At:{" "}
            {task?.dateCreated
              ? new Date(task.dateCreated).toLocaleDateString("en-us") // Formata a data de criação
              : ""}
          </Text>

          {/* Exibe a data de conclusão, se houver */}
          {task?.dateFinish && (
            <Text style={style.taskDate}>Due: {task.dateFinish}</Text>
          )}

          {/* Container para botões de ação */}
          <View style={style.buttonContainer}>
            {/* Botão para editar a tarefa */}
            <ButtonEdit
              title="Edit"
              onPress={() => {
                if (task) {
                  onEdit(task); // Chama a função de edição passando a tarefa como argumento
                  onClose(); // Fecha o modal após chamar a edição
                }
              }}
            />

            {/* Botão para deletar a tarefa */}
            <ButtonDelete
              title="Delete"
              onPress={() => {
                if (task) {
                  onDelete(task.id); // Chama a função de exclusão passando o ID da tarefa
                  onClose(); // Fecha o modal após a exclusão
                }
              }}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default TaskDetailModal;
