import { Task } from "../../server/taskService"; 
// Define a interface das propriedades esperadas pelo TaskDetailModal
export interface TaskDetailModalProps {
  visible: boolean; // Controla a visibilidade do modal, onde true significa visível e false significa oculto
  onClose: () => void; // Função callback para fechar o modal
  task: Task; // Objeto Task contendo os dados da tarefa a serem exibidos
  onDelete: (id: string) => void; // Função callback para deletar a tarefa, que recebe o ID da tarefa como argumento
  onEdit: (task: Task) => void; // Função callback para editar a tarefa, que recebe o objeto da tarefa como argumento
}
