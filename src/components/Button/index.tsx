import React, { ButtonHTMLAttributes } from 'react';
import { FiLoader } from 'react-icons/fi';

import { Container } from './styles';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  loading?: boolean;
};

const Button: React.FC<ButtonProps> = ({ children, loading, ...rest }) => (
  <Container
    type="button"
    {...rest}
    className={loading ? 'loading' : ''}
    disabled={!!loading}
  >
    {loading ? (
      <>
        <FiLoader /> Carregando...
      </>
    ) : (
      children
    )}
  </Container>
);

export default Button;
