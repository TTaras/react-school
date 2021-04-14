import './style.scss';
import { About } from '@components/About';
import { Link } from 'react-router-dom';

export const Home = () => {
  return (
    <div className="home">
      <p>Home page</p>
      <p>
        <Link to="/chats">Список чатов</Link>
      </p>
      <About />
    </div>
  );
}