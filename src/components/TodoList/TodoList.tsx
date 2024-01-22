import { useEffect, useState } from "react";
import TodoItems from "../TodoItems/TodoItems";
import axios from "axios";
import config from "../../config";
import { Todo } from "../../types";

const TodoList = () => {
  const [completedTodo, setCompletedTodo] = useState<Todo[]>([]);
  const [notCompletedTodo, setNotCompletedTodo] = useState<Todo[]>([]);

  useEffect(() => {
    axios
      .get(config.apiUrl)
      .then((res) => {
        setCompletedTodo(res.data.filter((todo: Todo) => todo.completed));
        setNotCompletedTodo(res.data.filter((todo: Todo) => !todo.completed));
      })
      .catch(console.error);
  }, []);

  return (
    <>
      <div>
        <h1>Completed</h1>
        {completedTodo.map((todo) => (
          <TodoItems
            key={todo.id}
            todo={todo}
            onCheckboxChange={() => {
              console.log("test");
            }}
          />
        ))}
      </div>
      <div>
        <h1>Not completed</h1>
        {notCompletedTodo.map((todo) => (
          <TodoItems
            key={todo.id}
            todo={todo}
            onCheckboxChange={() => {
              console.log("test");
            }}
          />
        ))}
      </div>
    </>
  );
};

export default TodoList;
