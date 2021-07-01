import React, { useState, useEffect } from 'react'
import { useGlobalContext } from '../utils/GlobalState';


export default function Order() {
    const [state, dispatch] = useGlobalContext();

    return (
        <>
            <h1>Profile Page</h1>
            {state.user ? (<div className="container row d-flex justify-contetnt-center">
                <div className="col-8"><h1>Welcome {`${state.user.first_name} ${state.user.last_name}`}</h1></div>
            </div>) : (<div className="container-fluid spinner-border text-secondary" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>)}
        </>
    )
}
