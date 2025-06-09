import { StyleSheet } from "react-native";
import { themas } from "../../global/themes";

export const style = StyleSheet.create({
  button: {
    backgroundColor: themas.colors.darkGray, // Cor de fundo do botão
    paddingVertical: 10, // Espaçamento vertical
    paddingHorizontal: 20, // Espaçamento horizontal
    borderRadius: 5, // Cantos arredondados
    alignItems: "center", // Centraliza o texto
    justifyContent: "center", // Centraliza o texto
    marginBottom: 10,
  },
});
