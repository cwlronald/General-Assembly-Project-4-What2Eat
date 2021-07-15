import {Container,Table} from "react-bootstrap";
import React, {useState} from "react";
import './Auth.css';
// import {Form,Container,Button,Table} from "react-bootstrap";




function Profile({user, userRestaurants}){

    const [toggleEdit,setToggleEdit]=useState(false)
    // const [username,setUsername]=useState(user.username)
    // const [email,setEmail]=useState(user.email)
    // const [password,setPassword]=useState(user.password)
    // const [confirmPassword,setConfirmPassword]=useState(user.password)
    //
    //
    // function setEdit(){
    //     setToggleEdit((prev)=>!prev)
    // }


    return(
        <Container className='justify-content-center' style={{maxWidth:'500px'}}>
            {toggleEdit?
                <></>
            // <Form className='FormBackground p-4 mt-5'>
            //     <h3 className='text-center'>Edit Profile</h3>
            //     <div className="form-group">
            //         <label>User name</label>
            //         <input type="text" className="form-control" value={username} placeholder={username}/>
            //     </div>
            //     <div className="form-group">
            //         <label>Email address</label>
            //         <input type="email" className="form-control" value={email} placeholder={email}/>
            //     </div>
            //     <div className="form-group">
            //         <label>Password</label>
            //         <input type="password" className="form-control" value={password} placeholder={password}/>
            //     </div>
            //     <div className="form-group">
            //         <label>Confirm Password</label>
            //         <input type="password" className="form-control" value={confirmPassword} placeholder={confirmPassword}/>
            //     </div>
            //     <Button onClick={setEdit} className="btn btn-primary btn-block" variant="danger">Submit Changes</Button>
            //     <div className='text-center'>
            //         <a onClick={setEdit}>Go back to profile</a>
            //     </div>
            //
            // </Form>
                :
                <div className='FormBackground p-4 mt-4 text-center'>
                    <h3 className='text-center'>Profile</h3>
                    <div className>Username: {user.username}</div>
                    <div>Email: {user.email}</div>
                    {/*<div className='text-center'>*/}
                    {/*    <a onClick={setEdit}>Click here to edit profile</a>*/}
                    {/*</div>*/}
                    <div className='text-center mt-3'>
                        <h4 className='text-center'>Places Visited</h4>
                        <Table striped bordered hover size="sm" >
                            <thead>
                            <tr>
                                <th>Restaurant</th>
                                <th>Vists</th>
                            </tr>
                            </thead>
                            <tbody>
                            {userRestaurants?.map(restaurant=>(
                                <tr>
                                    <td>
                                        {restaurant.favorite? '⭐' :''}{restaurant.restaurant_name}
                                    </td>
                                    <td>{restaurant.visits}</td>
                                </tr>
                            ))}
                            </tbody>
                        </Table>
                    </div>
                </div>
            }

        </Container>
    )
}

export default Profile
