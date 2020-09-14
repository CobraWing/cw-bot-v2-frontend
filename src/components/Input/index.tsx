/* eslint-disable @typescript-eslint/ban-types */
import React, {
  InputHTMLAttributes,
  useEffect,
  useRef,
  useState,
  useCallback,
} from 'react';

import { IconBaseProps } from 'react-icons';
import { FiAlertCircle } from 'react-icons/fi';
import { QuestionCircleFill } from '@styled-icons/bootstrap';
import { useField } from '@unform/core';
import classNames from 'classnames';
import { Label, Tip, Container, Error } from './styles';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label?: string;
  containerStyle?: object;
  icon?: React.ComponentType<IconBaseProps>;
  replaceWhiteSpaces?: boolean;
  replaceSpecialCharacters?: boolean;
  tip?: string;
}

const Input: React.FC<InputProps> = ({
  name,
  label,
  containerStyle = {},
  icon: Icon,
  replaceWhiteSpaces,
  replaceSpecialCharacters,
  tip,
  ...rest
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);
  const { fieldName, defaultValue, error, registerField } = useField(name);

  const handleInputFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleInputBlur = useCallback(() => {
    setIsFocused(false);
    setIsFilled(!!inputRef.current?.value);
  }, []);

  const classes = classNames({
    formContainerInput: 'formContainerInput',
    isError: error ? 'isError' : '',
  });

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
    });
  }, [fieldName, registerField]);

  return (
    <>
      {label && <Label>{label}</Label>}
      {tip && (
        <Tip>
          <QuestionCircleFill
            className="header-icon"
            size={15}
            data-tip={tip}
            data-place="top"
            data-multiline="true"
            data-background-color="black"
            data-text-color="white"
            data-border="white"
          />
        </Tip>
      )}

      <Container
        style={containerStyle}
        isErrored={!!error}
        isFocused={isFocused}
        isFilled={isFilled}
        data-testid="input-container"
        className={classes}
      >
        {Icon && <Icon size={20} />}
        <input
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          onKeyDown={(e) => {
            if (e.keyCode === 13) {
              e.preventDefault();
            }
          }}
          onChange={() => {
            if (replaceWhiteSpaces && inputRef.current?.value) {
              inputRef.current.value = inputRef.current.value.replace(' ', '_');
            }
            if (replaceSpecialCharacters && inputRef.current?.value) {
              inputRef.current.value = inputRef.current.value.replace(
                /\W|_/g,
                '_',
              );
            }
          }}
          ref={inputRef}
          defaultValue={defaultValue}
          {...rest}
        />

        {error && (
          <Error title={error}>
            <FiAlertCircle color="#c53030" size={20} />
          </Error>
        )}
      </Container>
    </>
  );
};

export default Input;
