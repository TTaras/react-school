import './style.scss';

import { ChatList } from '@components/ChatList';

export const Chats = () => {
  return (
    <div className="chats">
      <ChatList />
    </div>
  );
}