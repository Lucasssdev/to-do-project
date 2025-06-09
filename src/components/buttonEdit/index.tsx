import React from "react";
import { TouchableOpacity, Text } from "react-native";
import { style } from "./style";
import Ionicons from "react-native-vector-icons/Ionicons";
import { themas } from "../../global/themes";
import { ButtonEditProps } from "./types";

const ButtonEdit: React.FC<ButtonEditProps> = ({
  title,
  onPress,
  style: customStyle,
}) => {
  return (
    <TouchableOpacity onPress={onPress} style={style.button}>
      <Ionicons name={"pencil-sharp"} color={themas.colors.white} size={20} />
      <Text style={style.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};

export default ButtonEdit;
