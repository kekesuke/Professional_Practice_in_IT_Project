import "./App.css";
import {
    Form,
    Button,
    Navbar,
    FormControl,
    NavDropdown, 
    Nav,
    Jumbotron,
    Container
    
} from "react-bootstrap";
import Carousel from 'react-bootstrap/Carousel';
import Graph from './components/Graph';




 


function App() {
    return (
        <div className="App">
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" >
            <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link href="#features">Stocks</Nav.Link>
                    <Nav.Link href="#pricing">For-ex</Nav.Link>
                    <Nav.Link href="#pricing">Crypto</Nav.Link>
                </Nav>
                <Nav>
                    <Nav.Link href="#deets">Login</Nav.Link>
                    <Nav.Link eventKey={2} href="#memes">
                        Register
            </Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
        <Jumbotron fluid>
        <Container>
         <Graph></Graph>
            </Container>
        </Jumbotron>
        </div>

    );
}


       
        

export default App;