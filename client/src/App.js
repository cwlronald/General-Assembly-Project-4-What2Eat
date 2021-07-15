import React, {useEffect, useState} from 'react'
import {Container} from "react-bootstrap";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import Maps from "./components/Maps/Maps";
import Signup from "./components/Auth/Signup";
import Login from "./components/Auth/Login";
import NavigationBar from "./components/Navbar";
import Profile from "./components/Auth/Profile";
import dotenv from 'dotenv'
// import axios from "axios"
import Axios from './Axios.js'

dotenv.config()

function App() {

    const [auth, setAuth] = useState(false)
    const [user, setUser] = useState({})
    const [userRestaurants, setUserRestaurants]=useState([])

    useEffect(() => {
        async function user() {
            try {
                let {data} = await Axios.get(`/accounts/user/`,)
                setUser(data.user_profile)
                setUserRestaurants(data.user_stats)
            } catch (e) {
                setAuth(false)
                setUser(null)
                console.log(e)
            }
        }
        user()
    }, [auth])

    return (
        <BrowserRouter>
            <NavigationBar user={user} setUser={setAuth} setAuth={setAuth}/>
            <Container className='justify-content-center mt-3'>
                <Switch>
                    <Route path='/' exact>
                        <Maps user={user}/>
                    </Route>
                    <Route path='/signup'>
                        <Signup setAuth={setAuth}/>
                    </Route>
                    <Route path='/login'>
                        <Login setAuth={setAuth}/>
                    </Route>
                    <Route path='/profile'>
                        <Profile user={user} userRestaurants={userRestaurants}/>
                    </Route>
                </Switch>

            </Container>
        </BrowserRouter>
    );
}

export default App;
