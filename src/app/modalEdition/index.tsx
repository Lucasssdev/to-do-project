// EditTaskModal.tsx
import {
  Modal,
  View,
  Text,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import InputComponent from "../../components/inputText"; // Adjust the import path as necessary
import DateInputComponent from "../../components/inputDate"; // Adjust the import path as necessary
import Button from "../../components/buttonClose"; // Your button component
import style from "./style"; // Adjust the import path as necessary
import { EditTaskModalProps } from "./types";
import { useEditTaskController } from "./controller";
import ButtonSave from "../../components/buttonSave";

const EditTaskModal: React.FC<EditTaskModalProps> = ({
  visible,
  onClose,
  task,
  onEdit,
  onDelete,
}) => {
  const controller = useEditTaskController({
    task,
    onEdit,
    onDelete,
    onClose,
    visible,
  });

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={style.modalBackground}>
          <View style={style.modalContainer}>
            <View style={style.buttonContainerClose}>
              <Button title="X" onPress={onClose} />
            </View>
            <Text style={style.modalTitle}>Edit Task</Text>

            <InputComponent
              value={controller.name}
              placeholder="Task Name"
              onChangeText={controller.setName}
            />
            <InputComponent
              value={controller.description}
              placeholder="Task Description"
              onChangeText={controller.setDescription}
            />
            <DateInputComponent
              value={controller.dateFinish}
              placeholder="Due Date (MM-DD-YYYY)"
              onChangeText={controller.setDateFinish}
            />

            <View style={style.buttonContainer}>
              <ButtonSave title="Save" onPress={controller.handleSave} />
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default EditTaskModal;
