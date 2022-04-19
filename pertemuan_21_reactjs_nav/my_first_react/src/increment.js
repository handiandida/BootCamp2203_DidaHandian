import { useState } from 'react';

function Increment(props) {
    return (
        <button onClick={props.onClickFunc}> Add </button>
    )
}

function Display(props) {
    return (
    <label>{props.message}</label>
    )
}

function App() {
    const [counter, setCounter] = useState(1);
    const incrementCounter = () => setCounter(counter + 1);;

    return (
    <div> 
    <Increment onClickFunc={incrementCounter}/>
        <br/><br/>
        <label>Quantity : </label><Display message={counter}/> 
    </div>
    );
}

export default App;