import './style.scss';

import { AUTHORS } from '@utils/constants';
import { useCallback } from 'react';

export const Message = (props) => {
  const { author, text, id, handlerDeleteMessage } = props;
  const cssClass = author === AUTHORS.ME ? 'message message_me' : 'message';

  const handlerClickDelete = useCallback(() => {
    handlerDeleteMessage(id);
  }, [id, handlerDeleteMessage]);

  return <div className={cssClass}>
    <div className="message__inner">
      { author === AUTHORS.ME && <span onClick={handlerClickDelete} className="message__delete">&times;</span> }
      <b>{author}</b>:
      <span>{text}</span>
    </div>
  </div>;
}