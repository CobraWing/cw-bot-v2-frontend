import React, {
  InputHTMLAttributes,
  useEffect,
  useRef,
  useState,
  useCallback,
} from 'react';
import { Editor, EditorTools, EditorProps } from '@progress/kendo-react-editor';
import { loadMessages, LocalizationProvider } from '@progress/kendo-react-intl';

import htmlToText from 'html-to-text';

import { useField } from '@unform/core';
import classNames from 'classnames';
import forceColor from './hackForceCSS.js';
import { Label, Container } from './styles';

const {
  Bold,
  Italic,
  Underline,
  Strikethrough,
  // Link,
  // Unlink,
  Undo,
  Redo,
} = EditorTools;

interface InputProps extends InputHTMLAttributes<EditorProps> {
  name: string;
  label?: string;
  onChangeEvent?(): void;
  containerStyle?: object;
}

const EditorInput: React.FC<InputProps> = ({
  name,
  label,
  onChangeEvent,
  containerStyle = {},
}) => {
  const inputRef = useRef<InputProps>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);
  const { fieldName, defaultValue, error, registerField } = useField(name);

  const [html, setHtml] = useState(defaultValue);

  useEffect(() => {
    if (defaultValue !== undefined) {
      setHtml(defaultValue);
    }
  }, [defaultValue]);

  loadMessages(
    {
      editor: {
        'hyperlink-dialog-title': 'Inserir Link',
        'hyperlink-dialog-content-address': 'URL:',
        'hyperlink-dialog-content-title': 'Título:',
        'hyperlink-dialog-cancel': 'Cancelar',
        'hyperlink-dialog-insert': 'Inserir',
        hyperlink: '',
        'hyperlink-dialog-content-newwindow': '',
      },
    },
    'pt-br',
  );

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
    onChangeEvent && onChangeEvent();
  }, [fieldName, registerField, html, onChangeEvent]);

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
        <LocalizationProvider language="pt-br">
          <Editor
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
            tools={[
              [Bold, Italic, Underline, Strikethrough],
              // [Link, Unlink],
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
            value={html}
          />
        </LocalizationProvider>
      </Container>
    </>
  );
};

export default EditorInput;
