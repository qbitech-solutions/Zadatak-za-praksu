import { useEffect, useState } from "react";
import TodoItems from "../TodoItems/TodoItems";
import axios from "axios";
import config from "../../config";
import { Todo } from "../../types";
import CustomModal from "../Modal/Modal";
import { StyledTodoList, StyledTodoDiv, StyledButton } from "./TodoList.styled";

const TodoList = () => {
  const [completedTodo, setCompletedTodo] = useState<Todo[]>([]);
  const [notCompletedTodo, setNotCompletedTodo] = useState<Todo[]>([]);
  const [checkboxClickTime, setCheckboxClickTime] = useState<number | null>(
    null
  );
  const [showAddTaskModal, setShowAddTaskModal] = useState(false);
  const [newTask, setNewTask] = useState("");
  const [selectedPriority, setSelectedPriority] = useState("");

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

  const handleAddTask = async (newTask: string) => {
    try {
      await axios.post(config.apiUrl, {
        task: newTask,
        priority: selectedPriority || "red",
        completed: false,
      });
      setShowAddTaskModal(false);

      const res = await axios.get(config.apiUrl);
      setCompletedTodo(res.data.filter((todo: Todo) => todo.completed));
      setNotCompletedTodo(res.data.filter((todo: Todo) => !todo.completed));
    } catch (error) {
      console.error(error);
    }
  };

  const sortByPriority = (todo: Todo[]) => {
    return todo.sort((a, b) => {
      const priorityOrder = { red: 1, yellow: 2, green: 3 };
      return priorityOrder[a.priority] - priorityOrder[b.priority];
    });
  };

  return (
    <>
      <StyledTodoDiv>
        <h1>Todo List</h1>
        <StyledButton onClick={() => setShowAddTaskModal(true)}>
          Add task
        </StyledButton>
      </StyledTodoDiv>
      <StyledTodoList>
        <div>
          <h4>Not completed</h4>
          {sortByPriority(notCompletedTodo).map((todo) => (
            <TodoItems
              key={todo.id}
              todo={todo}
              onCheckboxChange={() => handleCheckboxChange(todo.id)}
              onTaskChange={() => setCheckboxClickTime(Date.now())}
            />
          ))}
        </div>
        <div>
          <h4>Completed</h4>
          {sortByPriority(completedTodo).map((todo) => (
            <TodoItems
              key={todo.id}
              todo={todo}
              onCheckboxChange={() => handleCheckboxChange(todo.id)}
              onTaskChange={() => setCheckboxClickTime(Date.now())}
            />
          ))}
        </div>
      </StyledTodoList>
      <CustomModal
        show={showAddTaskModal}
        handleClose={() => setShowAddTaskModal(false)}
        handleConfirm={() => handleAddTask(newTask)}
        handlePriorityChange={setSelectedPriority}
        title="Add Task"
      >
        <label>Add Task:</label>
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
      </CustomModal>
    </>
  );
};

export default TodoList;
