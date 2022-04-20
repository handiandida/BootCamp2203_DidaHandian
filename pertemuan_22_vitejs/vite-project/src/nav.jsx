import React from "react";
import { Container, Navbar, Nav } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';

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
        <Navbar bg="primary" expand="lg">
        <Container>
            <Navbar.Brand href="#home">Navbar</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
                <Nav.Link href="#">Home</Nav.Link>
                <Nav.Link href="#">Link</Nav.Link>
            </Nav>
            <Nav>
                <Nav>
                {new Date().toLocaleTimeString()}
                </Nav>
            </Nav>
            </Navbar.Collapse>
        </Container>
        </Navbar>
    </React.Fragment>
        )
    }
}


export default nav