import { useEffect, useState } from "react";
import TodoItems from "../TodoItems/TodoItems";
import axios from "axios";
import config from "../../config";
import { Todo } from "../../types";
import { StyledTodoList } from "./TodoList.styled";

const TodoList = () => {
  const [completedTodo, setCompletedTodo] = useState<Todo[]>([]);
  const [notCompletedTodo, setNotCompletedTodo] = useState<Todo[]>([]);
  const [checkboxClickTime, setCheckboxClickTime] = useState<number | null>(
    null
  );

  useEffect(() => {
    axios
      .get(config.apiUrl)
      .then((res) => {
        setCompletedTodo(res.data.filter((todo: Todo) => todo.completed));
        setNotCompletedTodo(res.data.filter((todo: Todo) => !todo.completed));
      })
      .catch(console.error);
  }, [checkboxClickTime]);

  const handleCheckboxChange = async (id: number) => {
    try {
      const todoToUpdate =
        completedTodo.find((todo) => todo.id === id) ||
        notCompletedTodo.find((todo) => todo.id === id);

      if (todoToUpdate) {
        const updatedStatus = !todoToUpdate.completed;

        await axios.patch(`${config.apiUrl}/${id}`, {
          completed: updatedStatus,
        });

        setCompletedTodo((prev) =>
          updatedStatus
            ? [...prev, todoToUpdate]
            : prev.filter((t) => t.id !== id)
        );

        setNotCompletedTodo((prev) =>
          updatedStatus
            ? prev.filter((t) => t.id !== id)
            : [...prev, todoToUpdate]
        );

        setCheckboxClickTime(Date.now());
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <StyledTodoList>
      <div>
        <h1>Not completed</h1>
        {notCompletedTodo.map((todo) => (
          <TodoItems
            key={todo.id}
            todo={todo}
            onCheckboxChange={() => handleCheckboxChange(todo.id)}
          />
        ))}
      </div>
      <div>
        <h1>Completed</h1>
        {completedTodo.map((todo) => (
          <TodoItems
            key={todo.id}
            todo={todo}
            onCheckboxChange={() => handleCheckboxChange(todo.id)}
          />
        ))}
      </div>
    </StyledTodoList>
  );
};

export default TodoList;
