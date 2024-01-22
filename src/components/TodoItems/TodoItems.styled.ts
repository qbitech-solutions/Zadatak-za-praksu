import { FaEdit, FaRegTrashAlt } from "react-icons/fa";
import styled from "styled-components";

interface StyledTodoItemProps {
  priority: "red" | "yellow" | "green";
  completed: boolean | number;
}

export const StyledTodoItem = styled.div<StyledTodoItemProps>`
  width: 500px;
  height: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${(props) => getPriorityColor(props.priority)};
  text-decoration: ${(props) => (props.completed ? "line-through" : "none")};
  input {
    margin-right: 10px;
  }

  div {
    flex-grow: 1;
  }
`;

export const StyledFaEdit = styled(FaEdit)`
  width: 20px;
  height: 20px;
  color: #fff;
  margin-right: 10px;
`;

export const StyledFaRegTrashAlt = styled(FaRegTrashAlt)`
  width: 20px;
  height: 20px;
  color: #fff;
  margin-right: 10px;
`;

const getPriorityColor = (priority: "red" | "yellow" | "green") => {
  switch (priority) {
    case "red":
      return "#fa5252";
    case "yellow":
      return "#ffd43b";
    case "green":
      return "#69db7c";
    default:
      return "blue";
  }
};
