import React from "react";
import { TouchableOpacity, Text } from "react-native";
import { style } from "./style";
import Ionicons from "react-native-vector-icons/Ionicons";
import { themas } from "../../global/themes";
import { ButtonDeleteProps } from "./types";

const ButtonDelete: React.FC<ButtonDeleteProps> = ({
  title,
  onPress,
  style: customStyle,
}) => {
  return (
    <TouchableOpacity onPress={onPress} style={style.button}>
      <Ionicons name={"trash-bin"} color={themas.colors.white} size={20} />
      <Text style={style.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};

export default ButtonDelete;
