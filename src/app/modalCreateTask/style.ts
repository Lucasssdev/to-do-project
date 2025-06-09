import { StyleSheet } from "react-native";
import { themas } from "../../global/themes";

export const style = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: themas.colors.backgroundModal, // Fundo semi-transparente para o efeito de overlay
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: "80%",
    backgroundColor: themas.colors.white,
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
  },
  buttonText: {
    color: themas.colors.white,
    fontSize: 16,
    fontWeight: "bold",
  },
  inputDescription: {
    marginBottom: 10,
  },
  buttonContainerClose: {
    flexDirection: "column", // Stack buttons vertically
    width: "18%", // Make it full width of modal
    marginLeft: "105%",
  },
  buttonContainerSave: {
    flexDirection: "column", // Stack buttons vertically
    width: "100%", // Make it full width of modal
  },
});
