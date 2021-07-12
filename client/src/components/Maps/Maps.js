import React, { useState, useEffect} from 'react'
import {GoogleMap, useLoadScript, Marker} from '@react-google-maps/api'
import {Form, Row, Col, Button} from "react-bootstrap";
import usePlacesAutocomplete, {getGeocode, getLatLng,} from "use-places-autocomplete";
import {Combobox, ComboboxInput, ComboboxPopover, ComboboxOption,} from "@reach/combobox";
import MapStyles from "./MapStyles";
import "@reach/combobox/styles.css";
import axios from "axios";




function Maps(){
    let coord
    const [test,setTest]=useState({})
    const [restaurant,setRestaurant]=useState('')
    const [targetMarker,setTargetMarker]=useState({})


    const libraries=["places"]
    const mapContainerStyle={
        width:'100vw',
        height:'50vw'
    }
    let center={
        lat:1.3521,
        lng:103.8198
    }
    const options={
        styles:MapStyles,
        disableDefaultUI:true,
    }
    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: 'AIzaSyAbE5oW_KVEDundMDGXDUe94Fz5xwqqf0s',
        libraries,
    })

    const mapRef = React.useRef();
    const onMapLoad = React.useCallback((map) => {
        mapRef.current = map;
    }, []);
    const panTo = React.useCallback(({ lat, lng }) => {
        mapRef.current.panTo({ lat, lng });
        mapRef.current.setZoom(15);
    }, []);

    navigator.geolocation.getCurrentPosition((position)=>{
        coord={'lat':position.coords.latitude,'lng':position.coords.longitude}
        console.log(position)
        console.log(coord)
    },()=>null)

    if (loadError) return 'Error Loading Maps'
    if (!isLoaded) return 'Loading Maps'

    async function searchFood(e){
        e.preventDefault()
        try{
            let genreTemp = e.target[1].value
            let priceTemp = e.target[2].value

            let locationTemp
            if (coord){
                console.log(1)
                locationTemp = coord
                setTest(coord)
                console.log(locationTemp)
            } else {
                console.log(2)
                locationTemp=test

            }


            if (locationTemp){
                let result = await axios.post('http://127.0.0.1:8000/api/',{
                    location:locationTemp,
                    genre:genreTemp,
                    price:priceTemp
                })
                console.log(result)

                let data = result.data
                data = data.filter(e=>(e.price_level<=priceTemp.length))
                data = data[Math.floor(Math.random()*data.length)]
                setRestaurant(data)

                let targetCoordinates = data.geometry.location
                setTargetMarker(targetCoordinates)
                panTo(targetCoordinates)

                window.location.href=("#mainPageSearch")

            } else {window.alert('Please enter the correct inputs!')}}catch(e){console.log(e)}
    }

    function Search(){

        const {ready, value, suggestions:{status,data}, setValue, clearSuggestions}=usePlacesAutocomplete()

        async function selectLocationDropdown(address){
            try{
                setValue(address,false)
                clearSuggestions()
                let result = await getGeocode({address})
                let resCoor = await getLatLng(result[0])
                coord=resCoor
            }catch(e){console.log(e)}
        }

        return(
            <div>
                <Combobox onSelect={selectLocationDropdown} >
                    <ComboboxInput
                        value={value}
                        onChange={(e)=>{setValue(e.target.value)}}
                        disabled={!ready}
                        placeholder='Leave blank to use current location'
                        className='mainPageInput'
                    />
                    <ComboboxPopover>
                        {status==='OK'&& data.map(({place_id, description})=><ComboboxOption key={place_id} value={description} className='searchDropDown'/>)}
                    </ComboboxPopover>
                </Combobox>
            </div>

        )
    }

    return(
        <>
            <Row className='justify-content-center'>
                <Col className='col-10 col-md-8'>
                    <Row className='justify-content-center'>
                        <img src="img/icon.png" width='30' height='35' className="mt-2 mr-1"/>
                        <h1>What2Eat?</h1>
                    </Row>
                    <Row className='justify-content-center text-center'><h5>Too busy to think about lunch? Is indecisive your middle name? Let W2E decide for you lah.</h5></Row>
                    <Row className='justify-content-center text-center' style={{'fontSize':'10px'}}>Searches are limited to a 500m radius because you're probably too lazy to walk anyway</Row>
                    <Row>
                        <Col>
                            <Form onSubmit={searchFood}>
                                <Row className='m-3'>
                                    <Col>
                                        <Search></Search>
                                    </Col>
                                </Row>
                                <Row className='mr-3 ml-3'>
                                    <Col className='col-12 col-sm-12 col-md-6 col-lg-6 mb-3'>
                                        <Form.Control placeholder='Cuisine: Surprise Me!' className='mainPageInput'>
                                        </Form.Control>
                                    </Col>
                                    <Col className='col-12 col-sm-12 col-md-6 col-lg-6'>
                                        <Form.Control as='select' className='mainPageInput'>
                                            <option value='Surprise Me!'>Price: Default $$</option>
                                            <option value="$">$</option>
                                            <option value="$$">$$</option>
                                            <option value="$$$">$$$</option>
                                            <option value="$$$$">$$$$</option>
                                        </Form.Control>
                                    </Col>
                                </Row>
                                <Row className='m-3 text-center' >
                                    <Col >
                                        <Button type='submit' id='mainPageSearch'>
                                            {restaurant? 'Something Else!':'Feed Me Now!'}
                                        </Button>
                                    </Col>
                                </Row>
                            </Form>
                        </Col>
                    </Row>
                </Col>
            </Row>
            {restaurant?
                <>
                    <Row className='justify-content-center text-center ml-2 mr-2'>
                        <div>
                            <h5>Here you go friend, something to eat so you wouldn't starve.</h5>
                            <h3>{restaurant.name}</h3>
                            <h4>{restaurant.vicinity}</h4>
                            <h4>{restaurant.rating? `Rating: ${restaurant.rating}/5`:'No Rating'}</h4>
                        </div>
                    </Row>
                    <Row className='m-3'>
                        <GoogleMap
                            mapContainerStyle={mapContainerStyle}
                            zoom={10}
                            center={center}
                            options={options}
                            onLoad={onMapLoad}
                            id='mapsection'>
                            {targetMarker?
                                <Marker
                                    position={{lat:targetMarker.lat,lng:targetMarker.lng}}
                                    icon={{
                                        url:'img/icon.png',
                                        scaledSize: new window.google.maps.Size(30,30),
                                        origin: new window.google.maps.Point(0,0)
                                    }}
                                    ></Marker>:''}
                        </GoogleMap>
                    </Row>
                </>:''}


        </>
    )
}



export default Maps
