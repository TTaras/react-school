import React, {useEffect, useState, useCallback} from "react";
import '@/style.scss';


// props = {
//   goal: { x: 1},
//   name: 'Me'
// }

const Child = ({childName, goal}) => {
    return (
        <div>I Am A Child, {childName}</div>
    )
}

const Main = ({goal, name}) => {
    const className = "red";
    const [counter, setCounter] = useState(0);

    const increase = () => {
        setCounter(counter + 1);
    }

    return (
        <>
            <h1 className={`${className} second-class`} style={{top: "25px", color: "wheat"}}>
                Hello React
            </h1>
            <h2>{counter}</h2>
            <button onClick={increase}>Increase</button>
            <Child childName='child' goal={goal}/>
        </>
    );
};

export {Main};