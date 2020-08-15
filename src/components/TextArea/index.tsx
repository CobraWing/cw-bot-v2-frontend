import React, {
  InputHTMLAttributes,
  useEffect,
  useRef,
  useState,
  useCallback,
} from 'react';

import { IconBaseProps } from 'react-icons';
import { useField } from '@unform/core';
import { Label, Container } from './styles';

interface InputProps extends InputHTMLAttributes<HTMLTextAreaElement> {
  name: string;
  label?: string;
  containerStyle?: object;
  icon?: React.ComponentType<IconBaseProps>;
}

const TextArea: React.FC<InputProps> = ({
  name,
  label,
  containerStyle = {},
  icon: Icon,
  ...rest
}) => {
  const inputRef = useRef<HTMLTextAreaElement>(null);
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
      <Container
        style={containerStyle}
        isErrored={!!error}
        isFocused={isFocused}
        isFilled={isFilled}
        data-testid="input-container"
      >
        {Icon && <Icon size={20} />}
        <textarea
          id="w3review"
          name="w3review"
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          onKeyDown={(e) => {
            if (e.keyCode === 13) {
              e.stopPropagation();
            }
          }}
          ref={inputRef}
          defaultValue={defaultValue}
          {...rest}
        />

        {error}
      </Container>
    </>
  );
};

export default TextArea;
