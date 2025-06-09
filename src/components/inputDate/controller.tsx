export const formatDate = (text: string) => {
  // Remove todos os caracteres que não são dígitos
  const digits = text.replace(/\D/g, "");
  const len = digits.length;

  // Adiciona os hifens na posição correta
  if (len < 3) return digits; // Para entradas menores que 3, retorne somente os dígitos
  if (len < 5) return `${digits.slice(0, 2)}/${digits.slice(2)}`; // mm-dd
  return `${digits.slice(0, 2)}/${digits.slice(2, 4)}/${digits.slice(4, 8)}`; // mm-dd-yyyy
  
};


