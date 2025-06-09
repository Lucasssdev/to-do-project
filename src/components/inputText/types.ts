import { StyleProp, TextStyle } from "react-native";

export interface InputComponentProps {
  value: string;
  placeholder: string;
  customStyle?: StyleProp<TextStyle>;
  onChangeText: (text: string) => void;
}
