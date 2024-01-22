import styled from "styled-components";

interface StyledTodoItemProps {
  priority: "red" | "yellow" | "green";
}

export const StyledTodoItem = styled.div<StyledTodoItemProps>`
  background-color: ${(props) => getPriorityColor(props.priority)};
  width: 200px;
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
