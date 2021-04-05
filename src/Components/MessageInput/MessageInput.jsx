import './style.scss';

import { useState, useRef, useCallback, useEffect } from 'react';

import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import SendIcon from '@material-ui/icons/SendRounded';
import { Grid } from '@material-ui/core';

export const MessageInput = ({ handlerAddMessage, chatId }) => {
  const [inputValue, setInputValue] = useState('');
  const refInput = useRef();

  const handlerInputChange = useCallback((e) => {
    setInputValue(e.target.value);
  }, []);

  const handlerSubmit = useCallback((e) => {
    e.preventDefault();

    const value = inputValue.trim();
    if (!value) return;

    handlerAddMessage(value);
    setInputValue('');
    refInput.current.focus();
  }, [inputValue, handlerAddMessage]);

  useEffect(() => {
    console.log('MessageInput');
    setInputValue('');
  }, [chatId]);

  return (
    <form className="message-input" onSubmit={handlerSubmit} noValidate autoComplete="off">
      <Grid container spacing={1} alignItems="center" justify="flex-start">
        <Grid item xs={11}>
          <TextField fullWidth label="сообщение" variant="outlined" inputRef={refInput} value={inputValue} onChange={handlerInputChange}/>
        </Grid>
        <Grid item xs={1}>
          <IconButton aria-label="send" type="submit">
            <SendIcon color="primary"/>
          </IconButton>
        </Grid>
      </Grid>
    </form>
  );
};