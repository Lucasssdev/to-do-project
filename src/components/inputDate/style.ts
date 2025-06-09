import { StyleSheet } from "react-native";
import { themas } from "../../global/themes";

export const style = StyleSheet.create({
  container: {
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: themas.colors.darkGray,
    borderRadius: 5,
    padding: 10,
    backgroundColor: themas.colors.white,
    width: 280,
    marginBottom: 10,
  },
});
