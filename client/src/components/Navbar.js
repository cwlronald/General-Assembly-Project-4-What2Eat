import React from 'react';
import {Container, Nav, Navbar,} from "react-bootstrap";
import {useHistory} from "react-router-dom";



function NavigationBar({user,setUser,setAuth}){
    const history = useHistory()

    const logout = (e) => {
        e.preventDefault()
        localStorage.clear()
        setAuth(false)
        setUser(null)
        history.push('/')
    }

    return(
        <Navbar style={{'background-color':'#97a97c'}} expand="md">
            <Container>
                <Navbar.Brand href="/">What2Eat?</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
                    <Nav className="me-auto" >
                        {user?.username?
                            <>
                                <Nav.Link href="/" style={{color:'black'}} onClick={logout}>Logout</Nav.Link>
                                <Nav.Link href="/profile" style={{color:'black'}}>Profile: {user.username}</Nav.Link>
                            </>
                            :
                            <>
                                <Nav.Link href="/signup" style={{color:'black'}}>Signup</Nav.Link>
                                <Nav.Link href="/login" style={{color:'black'}}>Login</Nav.Link>
                            </>}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}
export default NavigationBar
