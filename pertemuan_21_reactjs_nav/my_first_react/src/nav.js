import React from "react";


class nav extends React.Component {
    constructor(props) {
        super(props);
        this.updateDate = this.updateDate.bind(this);

        this.state = {
        date: new Date().toLocaleTimeString(),
        }
        this.interval = setInterval(this.updateDate, 1000);
    }
    
    componentWillUnmount() {
        clearInterval(this.interval);
    }
    
    updateDate() {
        this.setState({
        date: new Date().toLocaleTimeString(),
        });
    }

    render(){
    return (
    //untuk menggantikan div dengan menggunakan react fragment
    <React.Fragment>
        <header className='navbar'>
    
        <div>
            <h2>Bootcamp Batch - 1 : Experimet with React JS</h2>
        </div>
    
        <div className='right-nav'>
            <ul>
                <li>Home</li>
                <li>About</li>
                <li>Contact</li>
                <li>{new Date().toLocaleTimeString()} AM</li>
            </ul>
        </div>
        </header>
    </React.Fragment>
        )
    }
}


export default nav
