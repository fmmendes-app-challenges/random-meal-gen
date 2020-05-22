import React, { useCallback, useState } from 'react';
import { useHistory } from 'react-router-dom';
import * as Yup from 'yup';
import {
  FiMail,
  FiEyeOff,
  FiEye,
  FiAlertCircle,
  FiLoader,
} from 'react-icons/fi';

import { useAuth } from '../../hooks/auth';

import { Container, Content, InputLabel } from './styles';
import InputError from '../../components/InputError';
import Button from '../../components/Button';

interface SignInFormData {
  email: string;
  password: string;
}

interface InputInfo {
  error: {
    [key: string]: string;
  };
  isFocused: {
    [key: string]: boolean;
  };
}

const SignIn: React.FC = () => {
  const { signIn } = useAuth();
  const history = useHistory();

  const [signInForm, setSignInForm] = useState({
    email: '',
    password: '',
  } as SignInFormData);
  const [inputInfo, setInputInfo] = useState({
    error: {},
    isFocused: {},
  } as InputInfo);
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);

  const handleSubmit = useCallback(
    async (event) => {
      event.preventDefault();
      setLoading(true);
      try {
        setInputInfo((oldInfo) => {
          return {
            ...oldInfo,
            error: {},
          };
        });

        const schema = Yup.object().shape({
          email: Yup.string()
            .email('Digite um e-mail válido')
            .required('Digite seu e-mail'),
          password: Yup.string().required('Digite sua senha'),
        });

        await schema.validate(signInForm, {
          abortEarly: false,
        });

        await signIn(signInForm);

        setLoading(false);
        history.push('/random');
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          err.inner.forEach((error) => {
            setInputInfo((oldInfo) => {
              const newInfo = { ...oldInfo };

              newInfo.error[error.path] = error.message;

              return newInfo;
            });
          });
          setLoading(false);
        } else {
          setLoading(false);
          setInputInfo((oldInfo) => {
            const newInfo = { ...oldInfo };

            newInfo.error.login =
              'Something went wrong. Check your credentials.';

            return newInfo;
          });
        }
      }
    },
    [signIn, signInForm, history],
  );

  const handleInputChange = useCallback((event) => {
    const { name, value } = event.target;

    setSignInForm((oldSignInForm) => {
      return {
        ...oldSignInForm,
        [name]: value,
      };
    });
  }, []);

  const handleInputFocus = useCallback((field: string) => {
    setInputInfo((oldInfo) => {
      const newInfo = {
        ...oldInfo,
      };

      newInfo.isFocused[field] = true;
      newInfo.error[field] = '';

      return newInfo;
    });
  }, []);

  const handleInputBlur = useCallback((field: string) => {
    setInputInfo((oldInfo) => {
      const newInfo = {
        ...oldInfo,
      };

      newInfo.isFocused[field] = false;

      return newInfo;
    });
  }, []);

  const handleToggle = useCallback(() => {
    setVisible((oldState) => !oldState);
  }, []);

  return (
    <Container>
      <Content>
        <form onSubmit={handleSubmit}>
          <h1>Hungry? We&#39;ve got you!</h1>

          <InputLabel
            htmlFor="email"
            isFilled={!!signInForm.email}
            isFocused={!!inputInfo.isFocused.email}
            hasError={!!inputInfo.error.email}
          >
            <FiMail size={20} />
            <input
              name="email"
              id="email"
              type="text"
              placeholder="E-mail"
              value={signInForm.email}
              onChange={handleInputChange}
              onFocus={() => handleInputFocus('email')}
              onBlur={() => handleInputBlur('email')}
              autoComplete="off"
            />
            {inputInfo.error.email && (
              <InputError title={inputInfo.error.email}>
                <FiAlertCircle size={20} />
              </InputError>
            )}
          </InputLabel>

          <InputLabel
            htmlFor="password"
            isFilled={!!signInForm.password}
            isFocused={!!inputInfo.isFocused.password}
            hasError={!!inputInfo.error.password}
          >
            <button
              type="button"
              onClick={handleToggle}
              className="passwordToggle"
              tabIndex={-1}
            >
              {visible ? <FiEye size={20} /> : <FiEyeOff size={20} />}
            </button>
            <input
              name="password"
              id="password"
              type={visible ? 'text' : 'password'}
              placeholder="Password"
              value={signInForm.password}
              onChange={handleInputChange}
              onFocus={() => handleInputFocus('password')}
              onBlur={() => handleInputBlur('password')}
              autoComplete="off"
            />
            {inputInfo.error.password && (
              <InputError title={inputInfo.error.password}>
                <FiAlertCircle size={20} />
              </InputError>
            )}
          </InputLabel>

          <Button type="submit" isLoading={loading}>
            {loading ? <FiLoader /> : 'Log in'}
          </Button>

          {inputInfo.error.login && (
            <small className="login-error">{inputInfo.error.login}</small>
          )}

          <small>
            Doesn&#39;t have an account? <br />
            No problem, neither do I. Use these: <br />
            <p>
              <strong>E-mail:</strong> eve.holt@reqres.in
            </p>
            <p>
              <strong>Password:</strong> cityslicka
            </p>
          </small>
        </form>
      </Content>
    </Container>
  );
};

export default SignIn;
