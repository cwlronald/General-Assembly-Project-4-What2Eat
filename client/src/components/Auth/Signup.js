import {Form,Container,Button} from "react-bootstrap";
import React, {useState} from "react";
import './Auth.css';
import axios from "axios";
import Axios from '../../Axios'
import {useHistory} from 'react-router-dom'




function Signup({setAuth}){

    const initialState = { username: '', email: '', password: '', confirmPassword: ''}
    const [formData, setFormData]=useState(initialState)
    const history = useHistory()

    async function submitRegister(e){
        e.preventDefault()
        try{
            await axios.post('http://localhost:8000/accounts/register/', formData,)
            window.alert('Registration successful!')
            let {data}=await Axios.post('http://localhost:8000/accounts/login/', formData)
            localStorage.setItem("access", data.access)
            localStorage.setItem("refresh", data.refresh)
            setAuth(true)
            history.push('/')
        }catch(e){
            let errorMessage = e.response.data
            let errorAll = []
            for (let i in errorMessage){
                for(let j in errorMessage[i]){
                    errorAll.push('- '+errorMessage[i][j])
                }
            }
            if (errorAll.length < 10){
                window.alert(`The following errors have occured: \n` + errorAll.join('\n'))
            } else {
                window.alert('An error has occured, please try again!')
            }
            console.log(e)
        }

    }

    function handleChange(e){
        setFormData({...formData,[e.target.name]:e.target.value})
    }

    return(
        <Container className='justify-content-center' style={{maxWidth:'300px'}}>
                <Form className='FormBackground p-4 mt-5'>
                    <h3 className='text-center'>Sign Up</h3>
                    <div className="form-group">
                        <label>User name</label>
                        <input type="text" className="form-control" placeholder="Username" name='username' onChange={handleChange} />
                    </div>
                    <div className="form-group">
                        <label>Email address</label>
                        <input type="email" className="form-control" placeholder="Enter email" name='email' onChange={handleChange} />
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input type="password" className="form-control" placeholder="Enter password" name='password' onChange={handleChange} />
                    </div>
                    <div className="form-group">
                        <label>Confirm Password</label>
                        <input type="password" className="form-control" placeholder="Confirm password" name='confirmPassword' onChange={handleChange}/>
                    </div>
                    <Button type="submit" className="btn btn-primary btn-block" variant="danger" onClick={submitRegister}>Sign
                        Up</Button>
                    <p className="forgot-password text-center mt-1">
                        <a href='/login'>Already registered? Click here to Login!</a>
                    </p>
                </Form>
        </Container>
    )
}

export default Signup
