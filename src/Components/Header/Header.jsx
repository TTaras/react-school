import './style.scss';

import { Link } from 'react-router-dom';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ChatIcon from '@material-ui/icons/Chat';
import { useSelector } from 'react-redux';

export const Header = () => {
  const name = useSelector(state => state.profile.name);

  return (
    <div className="header">
      <div className="header__chat-name">
        <Link to="/" className="header__links__item">
          React messager
        </Link>
      </div>
      <div className="header__links">
        <Link to="/chats" className="header__links__item">
          <ChatIcon fontSize="large"/>
        </Link>
        <Link to="/profile" className="header__links__item">
          <AccountCircleIcon fontSize="large"/>
          {name}
        </Link>
      </div>
    </div>
  )
};
