import { Task } from "../../server/taskService";

export interface EditTaskModalProps {
  visible: boolean;
  onClose: () => void;
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
}
