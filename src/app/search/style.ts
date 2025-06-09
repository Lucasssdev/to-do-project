import { Dimensions, StyleSheet } from "react-native";
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
    bottom: 30,
    left: 20,
    right: 20,
    alignItems: "center",
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
  inputContainer: {
    alignItems: "center",
  },
  inputCustom: {
    width: Dimensions.get("window").width / 1.1,
  },
});
