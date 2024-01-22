export type Todo = {
  id: number;
  task: string;
  priority: "red" | "yellow" | "green";
  completed: boolean;
};

export type TodoItemsProps = {
  todo: Todo;
  onCheckboxChange: (id: number) => void;
};
