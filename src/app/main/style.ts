import { StyleSheet } from "react-native";
import { themas } from "../../global/themes";

export const style = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: themas.colors.grayBackground,
  },

  taskContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    marginBottom: 15,
    backgroundColor: themas.colors.white,
    borderRadius: 10,
  },
  circleButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    borderWidth: 2,
    marginRight: 15,
    backgroundColor: "transparent",
  },
  taskDetails: {
    flex: 1,
  },
  taskTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  taskDate: {
    fontSize: 14,
    color: themas.colors.lightGray,
    marginBottom: 5,
  },
  taskDescription: {
    fontSize: 14,
    color: themas.colors.lightGray,
  },
  absoluteButtonContainer: {
    position: "absolute",
    bottom: 20,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "center", // Centraliza os botões horizontalmente
    alignItems: "center",
  },
  addButton: {
    width: 60, // Um pouco maior que o botão de limpar
    height: 60, // Um pouco maior que o botão de limpar
    borderRadius: 30,
    backgroundColor: themas.colors.blue,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
    zIndex: 2, // Garante que fique visualmente à frente
  },
  clearButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: themas.colors.red,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute", // Posiciona absolutamente dentro do container
    right: 20, // Distância da borda direita
    elevation: 5,
  },
  taskList: {
    paddingBottom: 100,
  },
  emptyText: {
    textAlign: "center",
    fontSize: 16,
    color: themas.colors.lightGray,
    marginTop: 20,
  },
  // Novos estilos para as estatísticas
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    flexWrap: "wrap",
  },
  statsText: {
    fontSize: 14,
    color: themas.colors.lightGray,
    marginRight: 8,
  },
  testButton: {
    backgroundColor: themas.colors.blue,
    padding: 10,
    borderRadius: 8,
    marginHorizontal: 20,
    marginVertical: 10,
    alignItems: "center",
  },
  testButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  clearButtonText: {
    color: themas.colors.white,
    fontSize: 24,
    fontWeight: "bold",
  },
});
