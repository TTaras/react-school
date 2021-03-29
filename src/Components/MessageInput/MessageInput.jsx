import './style.scss';

import {useState, useRef} from "react";

export const MessageInput = (props) => {
    const {handlerAddMessage} = props;
    const [inputValue, setInputValue] = useState('');
    const refInput = useRef();

    function handlerInputChange(e) {
        setInputValue(e.target.value);
    }

    function handlerSubmit(e) {
        e.preventDefault();

        const value = inputValue.trim();
        if (!value) return;

        handlerAddMessage(value);
        refInput.current.value = '';
        refInput.current.focus();
    }

    return <form className='message-form' onSubmit={handlerSubmit}>
        <input type='text' ref={refInput} value={inputValue} onChange={handlerInputChange} />
        <button type='submit'>Send</button>
    </form>;
};