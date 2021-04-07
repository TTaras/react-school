import './style.scss';

import { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeName } from "@store/profile/actions";

import TextField from '@material-ui/core/TextField';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';


export const UserProfile = () => {
  const [inputValue, setInputValue] = useState('');
  const name = useSelector(state => state.profile.name);
  const dispatch = useDispatch();

  const handlerInputChange = useCallback((e) => {
    setInputValue(e.target.value);
  }, []);

  const handlerSubmit = useCallback((e) => {
    e.preventDefault();

    const value = inputValue.trim();
    if (!value) return;

    dispatch(changeName(value));

    setInputValue('');
  }, [inputValue, dispatch]);

  return (
    <div className="user-profile">
      <h3>имя: {name}</h3>
      <form onSubmit={handlerSubmit}>
        <TextField label="Новое имя" value={inputValue} onChange={handlerInputChange}/>
        <Fab color="primary" aria-label="add" type="submit">
          <AddIcon />
        </Fab>
      </form>
    </div>
  );
};