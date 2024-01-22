import { TodoItemsProps } from "../../types";
import {
  StyledFaEdit,
  StyledFaRegTrashAlt,
  StyledTodoItem,
} from "./TodoItems.styled";

const TodoItems = ({ todo, onCheckboxChange }: TodoItemsProps) => {
  return (
    <StyledTodoItem priority={todo.priority} completed={+todo.completed}>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onCheckboxChange(todo.id)}
      />
      <div>{todo.task}</div>
      <StyledFaEdit />
      <StyledFaRegTrashAlt />
    </StyledTodoItem>
  );
};

export default TodoItems;
