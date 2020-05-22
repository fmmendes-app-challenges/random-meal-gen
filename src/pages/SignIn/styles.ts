import styled, { keyframes, css } from 'styled-components';

export const Container = styled.div`
  height: 100vh;
  display: flex;
  overflow: hidden;
`;

const appearFromBottom = keyframes`
  from {
    opacity: 0;
    transform: translateY(100px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: auto;

  width: 100%;
  max-width: 700px;

  animation: ${appearFromBottom} 1s;

  form {
    display: flex;
    flex-direction: column;
    margin: 80px 0;
    width: 40%;
    text-align: center;

    h1 {
      margin-bottom: 24px;
      font-size: 20px;
    }

    button.passwordToggle {
      background: none;
      border: none;
      padding: 0;
      color: inherit;
    }

    small {
      margin-top: 16px;

      &.login-error {
        font-size: 12px;
        color: #c53030;
      }
    }

    p {
      strong {
        font-weight: 600;
      }
    }
  }
`;

interface LabelProps {
  hasError: boolean;
  isFilled: boolean;
  isFocused: boolean;
}

export const InputLabel = styled.label<LabelProps>`
  background: #EAE6E5;
  border-radius: 4px;
  padding: 12px;

  display: flex;
  align-items: center;

  border: 2px solid #EAE6E5;
  color: #8F8073;


  ${(props) =>
    props.hasError &&
    css`
      border-color: #c53030;
      color: #c53030;
    `}

  ${(props) =>
    props.isFilled &&
    css`
      color: #12130f;
    `}

  ${(props) =>
    props.isFocused &&
    css`
      color: #12130f;
      border-color: #5b9279;
    `}

  input {
    flex: 1;
    background: transparent;
    border: 0;
    color: #12130F;

    &::placeholder {
      color: #666360;
    }
  }

  svg {
    margin-right: 16px;
  }

  & + label {
    margin-top: 8px;
  }
`;
