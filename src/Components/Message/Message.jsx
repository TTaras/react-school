import './style.scss';

// props === {
//     name: 'some',
//     text: 'lorem'
// }

export const Message = (props) => {
    const {name, text} = props;

    return <div>
        <p><b>{name}</b></p>
        <p>{text}</p>
    </div>;
}