import { StyleSheet } from "react-native";
import { themas } from "../../global/themes";

export const style = StyleSheet.create({
  button: {
    backgroundColor: themas.colors.red, // Cor de fundo do botão
    paddingVertical: 10, // Espaçamento vertical
    paddingHorizontal: 20, // Espaçamento horizontal
    borderRadius: 5, // Cantos arredondados
    alignItems: "center", // Centraliza o texto
    justifyContent: "center", // Centraliza o texto
    marginBottom: 10,
    flexDirection: "row",
  },
  buttonText: {
    color: themas.colors.white, // Cor do texto do botão
    fontSize: 16, // Tamanho da fonte
    fontWeight: "bold", // Peso da fonte
    paddingLeft: 5,
  },
});
