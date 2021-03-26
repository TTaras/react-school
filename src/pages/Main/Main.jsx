import './style.scss';

import {useState, useEffect} from "react";
import {MessageField} from '@components/MessageField';
import {MessageInput} from '@components/MessageInput';
import {AUTHORS} from '@utils/constants';


export const Main = () => {
    const [messages, setMessages] = useState([{id: 'id_1', author: AUTHORS.BOT, text: 'Hey!'}]);

    const handlerAddMessage = (text) => {
        setMessages([...messages, {
            id: `id_${messages.length + 1}`, author: AUTHORS.ME, text
        }]);
    }

    useEffect(() => {
        const lastMessage = messages[messages.length - 1];

        if (lastMessage.author === AUTHORS.ME) {
            setMessages([...messages, {
                id: `id_${messages.length + 1}`, author: AUTHORS.BOT, text: 'Ok'
            }]);
        }
    }, [messages]);

    return <>
        <MessageField messages={messages} />
        <MessageInput handlerAddMessage={handlerAddMessage} />
    </>
}
