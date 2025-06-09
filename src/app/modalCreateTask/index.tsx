import {
  View,
  Text,
  Modal,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { style } from "./style"; 
import { CreateTaskModalProps } from "./types"; 
import { useControllerCreateTask } from "./controller";
import InputText from "../../components/inputText"; 
import DateInputComponent from "../../components/inputDate"; 
import ButtonClose from "../../components/buttonClose"; 
import ButtonSave from "../../components/buttonSave"; 

// Componente funcional que representa o modal de criação de tarefas
const CreateTaskModal: React.FC<CreateTaskModalProps> = ({
  visible, // Define a visibilidade do modal
  onClose, // Função para fechar o modal
}) => {
  // Obtém o controlador específico para criação de tarefas
  const controller = useControllerCreateTask(onClose);

  return (
    <Modal
      animationType="slide" // Animação do modal
      transparent={true} // Define o fundo do modal como transparente
      visible={visible} // Define se o modal está visível ou não
      onRequestClose={onClose} // Função para fechar o modal ao solicitar fechamento
    >
      {/* Fecha o teclado ao tocar fora dos campos de entrada */}
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={style.modalOverlay}>
          {/* Ajusta o layout do teclado para que o conteúdo do modal não seja ocultado */}
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={style.modalContent}
          >
            {/* Botão para fechar o modal */}
            <View style={style.buttonContainerClose}>
              <ButtonClose title="X" onPress={onClose} />
            </View>

            <Text style={style.modalTitle}>Create a New Task</Text>

            {/* Campo de entrada para o nome da tarefa */}
            <InputText
              value={controller.taskName}
              placeholder="Task Name"
              onChangeText={(text) => controller.setTaskName(text)}
            />

            {/* Campo de entrada para a descrição da tarefa */}
            <InputText
              value={controller.taskDescription}
              placeholder="Task Description"
              onChangeText={(text) => controller.setTaskDescription(text)}
            />

            {/* Campo de entrada para a data de conclusão da tarefa */}
            <DateInputComponent
              value={controller.taskDateFinish}
              placeholder="Date: MM/DD/YYYY"
              onChangeText={(text) => controller.setTaskDateFinish(text)}
            />

            {/* Botão para salvar a tarefa */}
            <View style={style.buttonContainerSave}>
              <ButtonSave title="Save Task" onPress={controller.saveTask} />
            </View>
          </KeyboardAvoidingView>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default CreateTaskModal;
