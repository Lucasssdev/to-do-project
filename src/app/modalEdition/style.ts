// style.ts
import { StyleSheet } from "react-native";
import { themas } from "../../global/themes";

const style = StyleSheet.create({
  modalBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: themas.colors.backgroundModal, // semi-transparent background
  },
  modalContainer: {
    width: "80%",
    backgroundColor: themas.colors.white,
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
    elevation: 5, // For Android shadow
  },
  taskTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  taskDate: {
    fontSize: 16,
    color: themas.colors.lightGray,
    marginBottom: 5,
  },
  taskDescription: {
    fontSize: 14,
    marginBottom: 15,
  },
  buttonContainer: {
    flexDirection: "column", // Stack buttons vertically
    width: "100%", // Make it full width of modal
    marginTop: 20, // Add some margin to separate from the task details
  },
  buttonText: {
    color: themas.colors.white,
    textAlign: "center",
    fontSize: 16,
  },
  textInput: {
    height: 40,
    borderColor: themas.colors.darkGray,
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 15,
    width: "100%", // Full width for input fields
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20, // Add some space below the title
  },
  buttonContainerClose: {
    flexDirection: "column", // Stack buttons vertically
    width: "18%", // Make it full width of modal
    marginLeft: "105%",
  },
});

export default style;
