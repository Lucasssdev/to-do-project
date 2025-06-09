// style.ts
import { StyleSheet } from "react-native";
import { themas } from "../../global/themes";

export const style = StyleSheet.create({
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
  inputField: {
    width: "100%",
    borderColor: themas.colors.lightGray,
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
  },
  buttonContainer: {
    flexDirection: "column", // Stack buttons vertically
    justifyContent: "center",
    width: "100%", // Make it full width of modal,
    marginTop: "10%",
  },
  buttonContainerClose: {
    flexDirection: "column", // Stack buttons vertically
    width: "18%", // Make it full width of modal
    marginLeft: "105%",
  },
  buttonText: {
    color: themas.colors.white,
    textAlign: "center",
    fontSize: 16,
  },
});
