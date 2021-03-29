import './style.scss';

import {Message} from '@components/Message';


export const MessageField = (props) => {
    const {messages} = props;

    const Messages = messages.map((el) => <Message
        key={el.id}
        author={el.author}
        text={el.text}
    />);

    return <div className='message-field'>
        {Messages}
    </div>;
};