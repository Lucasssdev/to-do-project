import React from "react";
import { TextInput } from "react-native";
import { style } from "./style";
import { InputComponentProps } from "./types";

const InputComponent: React.FC<InputComponentProps> = ({
  value,
  placeholder,
  onChangeText,
  customStyle,
}) => {
  return (
    <TextInput
      style={[style.input, customStyle]}
      value={value}
      placeholder={placeholder}
      onChangeText={onChangeText}
      placeholderTextColor="#000"
    />
  );
};

export default InputComponent;
