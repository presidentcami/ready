import React, { useState, useReducer } from 'react'
import * as ioicons from 'react-icons/io5'
import styled from 'styled-components';

const initialValue = {
    trip_name: '',
    trip_start_date: '',
    trip_end_date: '',
    location: '',
    user_id: '',
    trip_description: '',
}

const reducer = (state, action) => {
    switch (action.type) {
        case 'add':
            return {
                ...state,
                [action.payload.key]: action.payload.value,
            };
        case 'reset': 
            return { ...initialValue } 
        default:
            throw new Error(`Unknown action type: ${action.type}`);
    }
};

  const Button = styled.button`
    border-radius: 10px;
    font-family: 'Lato', sans-serif;
    font-weight: lighter;
    border: none;
    background-color: #fddc95;
    margin: 5px;
    width: 200px;
`;

const AddTrip = ({ setTrips, user }) => {

    const [state, dispatch] = useReducer(reducer, initialValue);
    const [show, setShow] = useState(false);

    const handleClose = () => dispatch({ type: "reset", initialValue });
    const handleShow = () => {
        // console.log(initialValue)
        setShow(!show)

    };

    const inputAction = (event) => {
        event.preventDefault();

        dispatch({
            type: 'add',
            payload: { key: event.target.name, value: event.target.value },
        });
        state.user_id = user[0].user_id;
        // console.log(state)
    };

    // console.log(user)

    //A function to handle the post request
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            fetch('/addtrip', {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(state),
            })
                .then((response) => response.json())
                .then(trips => {
                    // console.log('trips fetched when new trips is added', trips);
                    trips.sort(function (a, b) {
                      let tripA = a.trip_start_date;
                      let tripB = b.trip_start_date;
                      return tripA < tripB ? -1 : tripA > tripB ? 1 : 0;
                    });
                    setTrips(trips);
                    handleClose()
                })
                dispatch ({ type: 'reset', initialValue })
            // console.log(state)
            // window.location = "/"; 
        } catch (error) {
            console.error(error.message)
        }
    }

    // let someDate = new Date();
    // someDate.setDate(someDate.getDate() + 3);
    // let date = someDate.toISOString().substring(0, 10);

    return (
        <>
                <form onSubmit={handleSubmit} id="addNewTripForm" className='profile' style={{ paddingTop: '10%'}}>
                    <h2>Add New Trip</h2>
                    <div><label><h3>Trip Name</h3></label></div>
                    <input
                        type="text"
                        id="add-new-trip-name"
                        name="trip_name"
                        value={state.trip_name}
                        onChange={inputAction}
                    />
                    <div><label><h3>Location</h3></label></div>
                    <input
                        type="text"
                        id="add-location"
                        name="location"
                        value={state.location}
                        onChange={inputAction}
                    />
                    <div><label><h3>Trip Description</h3></label></div>
                    <textarea
                        rows="13"
                        cols="96"
                        type="text-area"
                        id="add-trip-description"
                        name="trip_description"
                        value={state.trip_description}
                        onChange={inputAction}
                    />
                    <div><label><h3>Start Date</h3></label></div>
                    <div>
                        <input
                            type="date"
                            id="add-start-date"
                            name="trip_start_date"
                            required
                            onChange={inputAction}
                        />
                    </div>
                    <div><label><h3>End Date</h3></label></div>
                    <div>
                        <input
                            type="date"
                            id="add-end-date"
                            name="trip_end_date"
                            required
                            onChange={inputAction}
                        />
                    </div>
                    <section>
                        <Button type="submit">Submit</Button>
                        <Button type="button" onClick={handleClose}>Cancel</Button>
                    </section>
                </form>
        </>
    );
};


export default AddTrip

