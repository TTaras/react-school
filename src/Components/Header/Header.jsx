import './style.scss';

import { Link } from 'react-router-dom';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import HomeIcon from '@material-ui/icons/Home';
import ChatIcon from '@material-ui/icons/Chat';

export const Header = () => (
  <div className="header">
    <div className="header__chat-name">React messager</div>
    <div className="header__links">
      <Link to="/" className="header__links__item">
        <HomeIcon fontSize="large" />
      </Link>
      <Link to="/chats" className="header__links__item">
        <ChatIcon fontSize="large" />
      </Link>
      <Link to="/profile" className="header__links__item">
        <AccountCircleIcon fontSize="large" />
      </Link>
    </div>
  </div>
);
