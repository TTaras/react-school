import './style.scss';

import { useCallback, useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import { Link } from 'react-router-dom';

import { addChat } from '@store/chatList/actions';
import { deleteChat } from '@store/chatList/actions';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import DeleteIcon from '@material-ui/icons/Delete';

import TextField from '@material-ui/core/TextField';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';


export const ChatList = ({ activeId }) => {
  const [inputValue, setInputValue] = useState('');
  const history = useHistory();
  const chatList = useSelector((state) => state.chatList);
  const dispatch = useDispatch();

  const handlerInputChange = useCallback((e) => {
    setInputValue(e.target.value);
  }, []);

  const handlerSubmit = useCallback((e) => {
    e.preventDefault();

    const value = inputValue.trim();
    if (!value) return;

    dispatch(addChat(value));

    setInputValue('');
  }, [inputValue, dispatch]);

  const handlerRemoveChat = useCallback((e) => {
    e.preventDefault();

    const id = e.currentTarget.dataset.id;
    if (!id) return;

    dispatch(deleteChat(id));

    if (id === activeId) {
      history.push('/chats');
    }
  }, [dispatch, history, activeId]);

  const ChatList = [];
  for (let [id, el] of Object.entries(chatList)) {
    ChatList.push(
      <ListItem
        button
        key={id}
        component={Link}
        to={`/chats/${id}`}
        selected={activeId === id}
        className={el.isBlink ? 'blink' : ''}
      >
        <ListItemIcon>
          <DeleteIcon onClick={handlerRemoveChat} data-id={id}/>
        </ListItemIcon>
        <ListItemText primary={el.name}/>
      </ListItem>
    )
  }


  return (
    <div className="chat-list">
      <List component="nav" subheader={<ListSubheader component="div">Список чатов</ListSubheader>}>
        {ChatList}
      </List>
      <form onSubmit={handlerSubmit} noValidate autoComplete="off">
        <TextField label="Добавить чат" value={inputValue} onChange={handlerInputChange}/>
        <Fab color="primary" aria-label="add" type="submit">
          <AddIcon />
        </Fab>
      </form>
    </div>
  );
};