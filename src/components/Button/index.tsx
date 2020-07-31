import React, { ButtonHTMLAttributes } from 'react';
import { FiLoader } from 'react-icons/fi';
import classNames from 'classnames';

import { Container } from './styles';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  loading?: boolean;
  tp?: 'positive' | 'negative' | undefined;
};

const Button: React.FC<ButtonProps> = ({ children, loading, tp, ...rest }) => {
  const classes = classNames({
    loading: loading ? 'loading' : '',
    positive: tp === 'positive' ? 'positive' : '',
    negative: tp === 'negative' ? 'negative' : '',
  });

  return (
    <Container type="button" {...rest} className={classes} disabled={!!loading}>
      {loading ? (
        <>
          <FiLoader /> Carregando...
        </>
      ) : (
        children
      )}
    </Container>
  );
};

export default Button;
