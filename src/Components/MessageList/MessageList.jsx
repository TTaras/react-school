//import {Component} from 'react';
import {useState} from "react";
import {Message} from '@components/Message';
import './style.scss';


/*export class MessageList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            messages: [
                {name: 'one', text: 'Hey!'},
                {name: 'one', text: 'How are you?'}
            ],
        };
    }

    sendMessage = () => {
        this.setState({
            messages: [...this.state.messages, {
                name: 'bot', text: 'fine'
            }]
        });
    }

    render() {
        const {messages} = this.state;
        const Messages = messages.map((el, i) =>
            <Message
                key={'msg_' + i}
                name={el.name}
                text={el.text}
            />);

        return <div>
            <button onClick={this.sendMessage}>add</button>
            {Messages}
        </div>;

    }
}*/

export const MessageList = () => {
    const [messages, setMessages] = useState([{name: 'one', text: 'Hey!'}, {name: 'one', text: 'How are you?'}]);

    const sendMessage = () => {
        setMessages([...messages, {
            name: 'bot', text: 'fine'
        }]);
    }

    const Messages = messages.map((el, i) => <Message
        key={'msg_' + i}
        name={el.name}
        text={el.text}
    />);

    return <div>
        <button onClick={sendMessage}>add</button>
        {Messages}
    </div>;
};