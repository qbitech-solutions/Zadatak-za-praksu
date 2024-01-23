import axios from "axios";
import { useState } from "react";
import { TodoItemsProps } from "../../types";
import {
  StyledDivTask,
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
  const [editPriority, setEditPriority] = useState(todo.priority);
  const [showDescription, setShowDescription] = useState(false);
  const [editDescription, setEditDescription] = useState(todo.description);

  const handleEdit = async (id: number) => {
    try {
      await axios.patch(`${config.apiUrl}/${id}`, {
        task: editedTask,
        priority: editPriority,
        description: editDescription,
      });
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
    <StyledTodoItem
      className="StyledTodoItem"
      priority={todo.priority}
      completed={+todo.completed}
    >
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onCheckboxChange(todo.id)}
      />
      <StyledDivTask
        className="StyledDivTask"
        style={{ marginLeft: "10px" }}
        onClick={() => {
          setShowDescription(true);
        }}
      >
        {todo.task}
      </StyledDivTask>
      <CustomModal
        show={showDescription}
        handleClose={() => setShowDescription(false)}
        title={todo.task}
        description={todo.description}
        readOnly={true}
      />
      <StyledFaEdit
        className="StyledFaEdit"
        onClick={() => setShowEditModal(true)}
      />
      <StyledFaRegTrashAlt
        className="StyledFaRegTrashAlt"
        onClick={() => setShowDeleteModal(true)}
      />

      <CustomModal
        show={showEditModal}
        handleClose={() => setShowEditModal(false)}
        handleConfirm={(newPriority, newDescription) => {
          setEditPriority(newPriority);
          setEditDescription(newDescription);
          handleEdit(todo.id);
        }}
        title="Edit Task"
        currentPriority={editPriority}
        handlePriorityChange={(newPriority) => setEditPriority(newPriority)}
        handleDescriptionChange={(newDescription) =>
          setEditDescription(newDescription)
        }
        description={todo.description}
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
