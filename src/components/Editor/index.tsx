import React, {
  InputHTMLAttributes,
  useEffect,
  useRef,
  useState,
  useCallback,
} from 'react';
import { Editor, EditorTools, EditorProps } from '@progress/kendo-react-editor';
import htmlToText from 'html-to-text';

import { useField } from '@unform/core';
import classNames from 'classnames';
import forceColor from './hackForceCSS.js';
import { Label, Container } from './styles';

const { Bold, Italic, Underline, Undo, Redo } = EditorTools;

interface InputProps extends InputHTMLAttributes<EditorProps> {
  name: string;
  label?: string;
  containerStyle?: object;
}

const EditorInput: React.FC<InputProps> = ({
  name,
  label,
  containerStyle = {},
}) => {
  const inputRef = useRef<InputProps>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);
  const { fieldName, defaultValue, error, registerField } = useField(name);
  const [html, setHtml] = useState(defaultValue);

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
    forceColor();
  }, []);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: { value: html },
      path: 'value',
    });
  }, [fieldName, registerField, html]);

  return (
    <>
      {label && <Label>{label}</Label>}
      <Container
        style={containerStyle}
        isErrored={!!error}
        isFocused={isFocused}
        isFilled={isFilled}
        data-testid="editor-container"
        className={classes}
      >
        <Editor
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          tools={[
            [Bold, Italic, Underline],
            [Undo, Redo],
          ]}
          onPasteHtml={(event) => {
            return htmlToText.fromString(event.pastedHtml);
          }}
          className="editor-input"
          onChange={(event) => {
            setHtml(event.html);
          }}
          contentStyle={{ color: '#ff0000' }}
          defaultContent={html}
        />
      </Container>
    </>
  );
};

export default EditorInput;
