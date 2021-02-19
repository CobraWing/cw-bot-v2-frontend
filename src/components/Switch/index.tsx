/* eslint-disable @typescript-eslint/ban-types */
import React, { InputHTMLAttributes, useEffect, useState } from 'react';

import Switch from 'react-switch';

import { IconBaseProps } from 'react-icons';
import { useField } from '@unform/core';
import { Label, Container } from './styles';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label?: string;
  containerStyle?: object;
  icon?: React.ComponentType<IconBaseProps>;
  callback?(value: boolean): void;
}

const SwitchInput: React.FC<InputProps> = ({
  name,
  label,
  containerStyle = {},
  icon: Icon,
  callback,
}) => {
  const [isChecked, setIsChecked] = useState(true);
  const { fieldName, defaultValue, error, registerField } = useField(name);

  useEffect(() => {
    if (defaultValue !== undefined) {
      setIsChecked(defaultValue);
    }
  }, [defaultValue]);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: { value: isChecked },
      path: 'value',
    });
    callback && callback(isChecked);
  }, [fieldName, registerField, isChecked, callback]);

  return (
    <>
      <Container
        style={containerStyle}
        data-testid="input-container"
        className="formContainerSwitch"
      >
        {Icon && <Icon size={20} />}
        {label && <Label>{label}</Label>}
        <Switch
          onChange={() => {
            setIsChecked((last) => !last);
          }}
          onKeyDown={(e) => {
            if (e.keyCode === 13) {
              e.preventDefault();
              setIsChecked((last) => !last);
            }
          }}
          defaultValue={defaultValue}
          checked={isChecked}
        />

        {error}
      </Container>
    </>
  );
};

export default SwitchInput;
