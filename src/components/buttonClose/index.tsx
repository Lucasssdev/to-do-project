import React from "react";
import { TouchableOpacity } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { themas } from "../../global/themes";
import { ButtonCloseProps } from "./types";

const ButtonClose: React.FC<ButtonCloseProps> = ({ onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Ionicons name={"close-outline"} color={themas.colors.black} size={20} />
    </TouchableOpacity>
  );
};

export default ButtonClose;
