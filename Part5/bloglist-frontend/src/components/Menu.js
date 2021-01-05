import React from 'react'
import { Navbar, Nav } from 'react-bootstrap'

import { Link } from 'react-router-dom'

const Menu = () => {
    const padding = {
        paddingRight: 5
    }
    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link href="#" as="span">
                        <Link style={padding} to="/blogs">blogs</Link>
                    </Nav.Link>
                    <Nav.Link href="#" as="span">
                        <Link style={padding} to="/about">about</Link>
                    </Nav.Link>
                </Nav>
            </Navbar.Collapse >
        </Navbar >
    )
}

export default Menu