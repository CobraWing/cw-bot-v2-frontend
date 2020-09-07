/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-types */
import React, { useEffect, useRef, useState, useCallback } from 'react';
import ReactSelect, {
  OptionTypeBase,
  Props as SelectProps,
} from 'react-select';

import { useField } from '@unform/core';
import classNames from 'classnames';
import { FiAlertCircle } from 'react-icons/fi';
import { Label, Container, Error } from './styles';

interface InputProps extends SelectProps<OptionTypeBase> {
  name: string;
  label?: string;
  containerStyle?: object;
}

const Select: React.FC<InputProps> = ({
  name,
  label,
  containerStyle = {},
  ...rest
}) => {
  const inputRef = useRef(null);
  const [isFocused, setIsFocused] = useState(false);
  const { fieldName, defaultValue, error, registerField } = useField(name);
  const [value, setValue] = useState(defaultValue);

  useEffect(() => {
    if (defaultValue !== undefined) {
      setValue(defaultValue);
    }
  }, [defaultValue]);

  const handleInputFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleInputBlur = useCallback(() => {
    setIsFocused(false);
  }, []);

  const classes = classNames({
    formContainerInput: 'formContainerInput',
    isError: error ? 'isError' : '',
  });

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: { value },
      path: 'value',
    });
  }, [fieldName, registerField, value]);

  return (
    <>
      {label && <Label>{label}</Label>}
      <Container
        style={containerStyle}
        isErrored={!!error}
        isFocused={isFocused}
        data-testid="input-container"
        className={classes}
      >
        <ReactSelect
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          ref={inputRef}
          className={error ? 'with-error' : ''}
          classNamePrefix="react-select"
          onChange={(newValue: any) => {
            setValue(newValue?.value);
          }}
          value={rest?.options?.find((option) => option.value === value)}
          {...rest}
        />

        {error && (
          <Error className="select-error" title={error}>
            <FiAlertCircle color="#c53030" size={20} />
          </Error>
        )}
      </Container>
    </>
  );
};

export default Select;
