import './style.scss';

import { AUTHORS } from '@utils/constants';

export const Message = (props) => {
  const { author, text } = props;
  const cssClass = author === AUTHORS.ME ? 'message message_me' : 'message';

  return <div className={cssClass}>
    <div className='message__inner'>
      <b>{author}</b>:
      <span>{text}</span>
    </div>
  </div>;
}