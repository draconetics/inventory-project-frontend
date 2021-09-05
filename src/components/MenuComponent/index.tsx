import React from 'react';
import {Navbar, Nav} from 'react-bootstrap';

export default function MenuComponent() {
  return (
    <>
        <Navbar bg="dark" variant="dark">
            <Navbar.Brand href="/home">Abigail</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="justify-content-end" style={{ width: "100%" }}>
                    <Nav.Link href="/home">Home</Nav.Link>
                    <Nav.Link href="/products">Products</Nav.Link>
                    <Nav.Link href="/sales">Sales</Nav.Link>
                    <Nav.Link href="/clients">Clients</Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    </>
  );
}
