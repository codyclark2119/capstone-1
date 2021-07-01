import React, { useRef, useEffect } from 'react'
import { useGlobalContext } from '../../utils/GlobalState';
import API from '../../utils/API';
import { USER_LOADED, AUTH_ERROR, LOGOUT, LOGIN_USER } from '../../utils/actions';

export default function Navbar({isSearched, listReset, itemSearch}) {
    const [state, dispatch] = useGlobalContext();
    const userSearch = useRef("")
    const userEmail = useRef("")
    const userPass = useRef("")

    const searchCheck = () => {
        if(isSearched) {listReset()} else itemSearch(userSearch.current.value)
    }

    const userLogin = async () => {
        let res = await API.login({email: userEmail.current.value, password: userPass.current.value})
        console.log(res)
        if (res.status === 200){
            dispatch({type: LOGIN_USER, token: res.token})
        } else {
            dispatch({type: AUTH_ERROR})
        }
    }

    const logout = () => {
        dispatch({type: LOGOUT})
    }

    useEffect(() => {
        async function getUserData(){
            let res = await API.loadUser();
            if (res.status === 200){
                dispatch({type: USER_LOADED, user:res.user})
            } else {
                dispatch({type: AUTH_ERROR})
            }
        }
        getUserData();
    },[state.token]);

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid ">
                <a className="navbar-brand px-5" href="/">FakeAzon</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <form className="d-flex mx-auto">
                        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" id="searchBar" ref={userSearch} />
                        <button className={`btn btn-outline-${isSearched ? 'danger' : 'success'} me-5`} type="button" onClick={searchCheck}>{isSearched ? "Reset" : "Search"}</button>
                    </form>
                    <ul className="navbar-nav mb-2 mb-lg-0 ">
                        <li className="nav-item">
                            <a className="nav-link active" aria-current="page" href="/">Home</a>
                        </li>
                        <li className="nav-item dropstart">
                            <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                User
                            </a>
                                {!state.user ? 
                                (
                                    <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                    <li><span className="dropdown-item-text">Login</span></li>
                                    <li className="dropdown-item"><input type="text" aria-label="Username" placeholder="Username" className="form-control" ref={userEmail} /></li>
                                    <li className="dropdown-item"><input type="password" aria-label="Password" placeholder="Password"className="form-control" ref={userPass} /></li>
                                    <li><hr className="dropdown-divider" /></li>
                                    <li className="dropdown-item-text"><button type="button" className="btn btn-success" onClick={userLogin}>Login</button></li>
                                </ul>
                                )
                                : 
                                (
                                    <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                    <li><span className="dropdown-item-text">User</span></li>
                                    <li className="dropdown-item"><a href='/profile'>{`${state.user.first_name} ${state.user.last_name}`}</a></li>
                                    <li><hr className="dropdown-divider" /></li>
                                    <li className="dropdown-item-text"><button type="button" className="btn btn-success" onClick={logout}>Logout</button></li>
                                </ul>
                                )}
                        </li>
                    </ul>
                    <button className='btn btn-outline-secondary' type="button" >Cart</button>
                </div>
            </div>
        </nav>
    )
}
