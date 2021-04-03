import './style.scss';

import { useState } from 'react';
import { Link } from 'react-router-dom';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DraftsIcon from '@material-ui/icons/Drafts';
import ListSubheader from '@material-ui/core/ListSubheader';


export const ChatList = ({ activeId }) => {
  const [chatList] = useState([
    { id: 'id_1', name: 'Chat 1' },
    { id: 'id_2', name: 'Chat 2' },
    { id: 'id_3', name: 'Chat 3' },
    { id: 'id_4', name: 'Chat 4' },
    { id: 'id_5', name: 'Chat 5' },
  ]);

  const ChatList = chatList.map((el) =>
    <ListItem
      button
      key={el.id}
      component={Link}
      to={`/chats/${el.id}`}
      selected={activeId === el.id}
    >
      <ListItemIcon>
        <DraftsIcon/>
      </ListItemIcon>
      <ListItemText primary={el.name}/>
    </ListItem>
  );


  return (
    <div className="chat-list">
      <List component="nav" subheader={<ListSubheader component="div">Список чатов</ListSubheader>}>
        {ChatList}
      </List>
    </div>
  );
};