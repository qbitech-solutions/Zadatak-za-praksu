import styled from "styled-components";

export const StyledTodoList = styled.div`
  display: flex;
  justify-content: center;
  gap: 50px;
  padding: 20px;
`;

export const StyledTodoDiv = styled.div`
  display: flex;
  justify-content: space-between;
  height: 100px;
  padding: 20px;
  border-bottom: 5px solid #91a7ff;
`;

export const StyledButton = styled.button`
  height: 40px;
  cursor: pointer;
  padding: 10px 20px;
  background-color: #4c6ef5;
  border: none;
  border-radius: 5px;
  font-weight: 700;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #91a7ff;
  }
`;
