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
}

const SwitchInput: React.FC<InputProps> = ({
  name,
  label,
  containerStyle = {},
  icon: Icon,
}) => {
  const [isChecked, setIsChecked] = useState(false);
  const { fieldName, defaultValue, error, registerField } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: { value: isChecked },
      path: 'value',
    });
  }, [fieldName, registerField, isChecked]);

  return (
    <>
      <Container style={containerStyle} data-testid="input-container">
        {Icon && <Icon size={20} />}
        {label && <Label>{label}</Label>}
        <Switch
          onChange={() => setIsChecked((last) => !last)}
          defaultValue={defaultValue}
          checked={isChecked}
        />

        {error}
      </Container>
    </>
  );
};

export default SwitchInput;
