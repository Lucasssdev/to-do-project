import React from "react";
import { TextInput, View } from "react-native";
import { style } from "./style"; // Adjust the import path as necessary
import { DateInputComponentProps } from "./types";
import { formatDate } from "./controller";

const DateInputComponent: React.FC<DateInputComponentProps> = ({
  value,
  placeholder,
  onChangeText,
}) => {
  return (
    <View style={style.container}>
      <TextInput
        style={style.input}
        value={value}
        placeholder={placeholder}
        onChangeText={(text) => onChangeText(formatDate(text))} // Formata a data antes de chamar onChangeText
        keyboardType="numeric" // Teclado numérico para entrada de data
        placeholderTextColor="#000"
      />
    </View>
  );
};

export default DateInputComponent;
