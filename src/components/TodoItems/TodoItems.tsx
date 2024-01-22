import { TodoItemsProps } from "../../types";
import { StyledTodoItem } from "./TodoItems.styled";

const TodoItems = ({ todo, onCheckboxChange }: TodoItemsProps) => {
  return (
    <StyledTodoItem priority={todo.priority}>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onCheckboxChange(todo.id)}
      />
      {todo.task}
    </StyledTodoItem>
  );
};

export default TodoItems;
