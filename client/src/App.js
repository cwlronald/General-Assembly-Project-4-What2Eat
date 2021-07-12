import React, {useState} from 'react'
import {Container} from "react-bootstrap";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Maps from "./components/Maps/Maps";
import Auth from "./components/Auth";
import Achievements from "./components/Achievements";
import dotenv from 'dotenv'

dotenv.config()

function App() {
    const[location,setLocation]=useState()
    const[genre,setGenre]=useState()
    const[price,setPrice]=useState()

  return (
        <BrowserRouter>
            <Container className='justify-content-center mt-3'>
                <Switch>
                    <Route path='/' exact>
                        <Maps/>
                    </Route>
                    <Route path='/auth' exact>
                        <Auth/>
                    </Route>
                    <Route path='/achievement/:id' exact>
                        <Achievements/>
                    </Route>
                </Switch>
            </Container>
        </BrowserRouter>
  );
}

export default App;
