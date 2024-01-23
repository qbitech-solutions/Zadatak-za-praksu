import { FaEdit, FaTrash } from "react-icons/fa";
import styled from "styled-components";
import { StyledTodoItemProps } from "../../types";

export const StyledTodoItem = styled.div<StyledTodoItemProps>`
  width: 500px;
  height: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  background-color: ${(props) => getPriorityColor(props.priority)};
  text-decoration: ${(props) => (props.completed ? "line-through" : "none")};
  input {
    margin-left: 10px;
    margin-right: 10px;
  }

  div {
    flex-grow: 1;
  }
`;

export const StyledDivTask = styled.div`
  margin-left: 20px;
  cursor: pointer;
  &:hover {
    color: #fff;
  }
`;

export const StyledFaEdit = styled(FaEdit)`
  width: 20px;
  height: 20px;
  color: #fff;
  margin-right: 10px;

  :hover {
    cursor: pointer;
  }
`;

export const StyledFaRegTrashAlt = styled(FaTrash)`
  width: 20px;
  height: 20px;
  color: #fff;
  margin-right: 10px;

  :hover {
    cursor: pointer;
  }
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
