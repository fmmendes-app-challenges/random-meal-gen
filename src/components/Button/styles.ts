import styled, { keyframes } from 'styled-components';
import { shade } from 'polished';

const spin = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

interface ButtonProps {
  isLoading: boolean;
}

export const Container = styled.button<ButtonProps>`
  border-radius: 4px;
  border: 0;
  padding: 12px;
  width: 100%;
  color: #eae6e5;
  font-weight: 600;
  font-size: 16px;
  margin-top: 16px;

  transition: background-color 0.2s;

  svg {
    animation: ${spin} 10s infinite;
  }

  background: ${(props) =>
    props.isLoading ? shade(0.5, '#5B9279') : '#5b9279'};

  &:hover {
    background: ${shade(0.2, '#5B9279')};
  }
`;
