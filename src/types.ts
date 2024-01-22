export type Todo = {
  id: number;
  task: string;
  priority: "red" | "yellow" | "green";
  completed: boolean;
};

export type TodoItemsProps = {
  todo: Todo;
  onCheckboxChange: (id: number) => void;
  onTaskChange: () => void;
};

export type ModalProps = {
  show: boolean;
  handleClose: () => void;
  handleConfirm?: (newPriority: "red" | "yellow" | "green") => void;
  title: string;
  children: React.ReactNode;
  confirmText?: string;
  currentPriority?: "red" | "yellow" | "green";
  handlePriorityChange?: (newPriority: "red" | "yellow" | "green") => void;
};
