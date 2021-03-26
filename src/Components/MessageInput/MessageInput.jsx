import './style.scss';

import {useRef} from "react";

export const MessageInput = (props) => {
    const {handlerAddMessage} = props;

    const refInput = useRef();

    function handlerOnClick() {
        const value = refInput.current.value.trim();
        if (!value) return;

        handlerAddMessage(value);
        refInput.current.value = '';
        refInput.current.focus();
    }

    function handlerKeyDown(e) {
        if (e.keyCode !== 13) return;
        handlerOnClick();
    }

    return <div className='message-input'>
        <input type='text' ref={refInput} onKeyDown={handlerKeyDown} />
        <button onClick={handlerOnClick}>Send</button>
    </div>;
};