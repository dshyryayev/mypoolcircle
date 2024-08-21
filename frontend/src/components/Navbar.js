import { Button } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

const NavbarMenu = ({
    connect, connected, registerMember, isMember
}) => {
    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Container fluid>
                <Navbar.Brand href="/">Pools Circle</Navbar.Brand>
                <Navbar.Toggle />
                <Navbar.Collapse className="justify-content-end">
                    <Nav className="me-auto">
                        <Nav.Link href="/pools">Pools</Nav.Link>
                    </Nav>
                    <Nav>
                        {!isMember && <Button onClick={registerMember} disabled={!connected || isMember} className="btn btn-primary me-2">Register</Button>}

                        {!connected ?
                            <Button onClick={connect} variant="success">Connect to Metamask</Button>
                            : <Button variant="success" disabled>Connected to Metamask</Button>
                        }
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default NavbarMenu;