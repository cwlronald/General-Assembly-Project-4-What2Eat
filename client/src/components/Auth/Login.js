import {Form,Container,Button} from "react-bootstrap";
import React, {useState} from "react";
import './Auth.css';
import {useHistory} from "react-router-dom";
import Axios from '../../Axios'




function Login({setAuth}){
    const initialState = { username: '',  password: ''}
    const [formData, setFormData]=useState(initialState)
    const history = useHistory()

    async function submitLogin(e){
        e.preventDefault()
        try{
            let {data}=await Axios.post('http://localhost:8000/accounts/login/', formData)
            localStorage.setItem("access", data.access)
            localStorage.setItem("refresh", data.refresh)
            setAuth(true)
            history.push('/')
        }catch(e){
            console.log(e)
        }

    }


    function handleChange(e){
        setFormData({...formData,[e.target.name]:e.target.value})
    }

    return(
        <Container className='justify-content-center' style={{maxWidth:'300px'}}>
            <Form className='FormBackground p-4 mt-5'>
                <h3 className='text-center'>Login</h3>
                <div className="form-group">
                    <label>User name</label>
                    <input type="text" className="form-control" placeholder="Username" name='username' onChange={handleChange}/>
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input type="password" className="form-control" placeholder="Enter password" name='password' onChange={handleChange}/>
                </div>
                <Button type="submit" className="btn btn-primary btn-block" variant="danger" onClick={submitLogin}>Login</Button>
                <p className="forgot-password text-center mt-1">
                    <a href='/signup'>Not yet registered? Click here to Signup!</a>
                </p>
            </Form>
        </Container>
    )
}

export default Login
