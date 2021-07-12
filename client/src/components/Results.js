import React, {useState} from 'react'
import "@reach/combobox/styles.css";
import axios from "axios";


function Results(){
    const [restaurant,setRestaurant]=useState()

    async function getRestaurants(){
        try{
            let response = await axios.get('http://127.0.0.1:8000/api/')
            console.log(response.data)
        }catch(e){
            console.log(e)
        }
    }

    getRestaurants()

    return(
        <div>hello</div>
    )
}

export default Results



