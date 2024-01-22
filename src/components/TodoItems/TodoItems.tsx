import axios from "axios";
import { useState } from "react";
import { TodoItemsProps } from "../../types";
import {
  StyledFaEdit,
  StyledFaRegTrashAlt,
  StyledTodoItem,
} from "./TodoItems.styled";
import config from "../../config";
import CustomModal from "../Modal/Modal";

const TodoItems = ({
  todo,
  onCheckboxChange,
  onTaskChange,
}: TodoItemsProps) => {
  const [editedTask, setEditedTask] = useState(todo.task);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleEdit = async (id: number) => {
    try {
      await axios.patch(`${config.apiUrl}/${id}`, { task: editedTask });
      setShowEditModal(false);
      onTaskChange();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`${config.apiUrl}/${id}`);
      setShowDeleteModal(false);
      onTaskChange();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <StyledTodoItem priority={todo.priority} completed={+todo.completed}>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onCheckboxChange(todo.id)}
      />
      <div>{todo.task}</div>
      <StyledFaEdit onClick={() => setShowEditModal(true)} />
      <StyledFaRegTrashAlt onClick={() => setShowDeleteModal(true)} />

      <CustomModal
        show={showEditModal}
        handleClose={() => setShowEditModal(false)}
        handleConfirm={() => handleEdit(todo.id)}
        title="Edit Task"
      >
        <label>Edit Task:</label>
        <input
          type="text"
          value={editedTask}
          onChange={(e) => setEditedTask(e.target.value)}
        />
      </CustomModal>

      {/* delete */}
      <CustomModal
        show={showDeleteModal}
        handleClose={() => setShowDeleteModal(false)}
        handleConfirm={() => handleDelete(todo.id)}
        title="Delete Task"
      >
        Are you sure you want to delete this task?
      </CustomModal>
    </StyledTodoItem>
  );
};

export default TodoItems;
