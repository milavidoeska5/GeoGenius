import React from 'react';
import { Navbar, Nav, Button, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Design.css'; // if you want to keep consistent custom styles

function CustomNavbar() {
    const navigate = useNavigate();

    const handleSearchPageRedirect = () => {
        navigate('/search');
    };

    const HomePageNav = () => {
        navigate('/');
    };

    const PremiumNav = () => {
        navigate('/pricing');
    };

    const Chatbot = () => {
        navigate('/chatbot');
    };

    return (
        <Navbar className="navbar-transparent bg-body-tertiary justify-content-between ms-1" data-bs-theme="dark">
            <Container>
                <Navbar.Brand onClick={HomePageNav} style={{ cursor: 'pointer' }}>
                    <img
                        src="https://cdn.prod.website-files.com/66d47171e73000e1183f49d9/66d47171e73000e1183f4a54_logo-spoon-white.svg"
                        width="146"
                        height="36"
                        className="d-inline-block align-top"
                        alt="Logo"
                    />
                </Navbar.Brand>
                <Nav className="justify-content-end ms-1">
                    <Nav.Link onClick={HomePageNav} style={{ color: 'white' }} className="navlink">Home</Nav.Link>
                    <Nav.Link onClick={handleSearchPageRedirect} style={{ color: 'white' }} className="navlink">Search</Nav.Link>
                    <Nav.Link onClick={handleSearchPageRedirect} style={{ color: 'white' }} className="navlink">About us</Nav.Link>
                    <Nav.Link onClick={handleSearchPageRedirect} style={{ color: 'white' }} className="navlink">Contact</Nav.Link>
                    <Nav.Link onClick={Chatbot} style={{ color: 'white' }} className="navlink">Chatbot</Nav.Link>
                    <Button variant="outline-light" size="lg" onClick={PremiumNav}>Premium</Button>
                </Nav>
            </Container>
        </Navbar>
    );
}

export default CustomNavbar;