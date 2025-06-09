export interface DateInputComponentProps {
  value: string;
  placeholder: string;
  onChangeText: (text: string) => void;
  errorMessage?: string; // Optional prop for error messages
}
