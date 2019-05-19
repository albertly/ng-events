import React, {useState, useEffect, useContext}  from 'react';

import {AuthContext, AUTH_USER} from '../../shared/ContextAuth';
import './Login.css';

function Login() {

    const [userName, setUserName] = useState('');
    const [userNameValid, setUserNameValid] = useState(true);
    const [userNameTouched, setUserNameTouched] = useState(false);

    const [password, setPassword] = useState('');
    const [passwordValid, setPasswordValid] = useState(true);
    const [passwordTouched, setPasswordTouched] = useState(false);


    let { state, dispatch } = useContext(AuthContext);

    useEffect(() => {
        // Update the document title using the browser API
       // logged = useContext(LoggedContext)
    });

    const handleSubmit = (event) => {
        event.preventDefault();
        const action = {
            type: AUTH_USER,
            userName,
            password,
        }
        dispatch(action);
    };

    return (
    <>
        <h1>Login</h1>
        <hr/>
        <div className="col-md-4">
            <form   autoComplete="off" noValidate onSubmit={handleSubmit}>
                <div className="form-group" >
                    <label htmlFor="userName">User Name:</label>
                    {!userNameValid && <em>Required</em> }
                    <input  name="userName"
                            value={userName}
                            onChange={(event) => {
                                setUserName(event.target.value);
                                setUserNameValid(!!event.target.value);
                                }
                            }
                            onBlur={() => !userNameTouched ? setUserNameTouched(true) : null} 
                            required
                            id="userName"
                            type="text"
                            className="form-control"
                            placeholder="User Name..." />
                </div>
                <div className="form-group" >
                    <label htmlFor="password">Password:</label>
                    {!passwordValid && <em>Required</em> }
                    <input  name="password"
                            value={password}
                            onChange={(event) => {
                                setPassword(event.target.value);
                                setPasswordValid(!!event.target.value);
                                }
                            }
                            onBlur={() => !passwordTouched ? setPasswordTouched(true) : null}
                            required
                            id="password"
                            type="password"
                            className="form-control"
                            placeholder="Password..." />
                </div>
                
                <span onMouseEnter={()=>{}} onMouseLeave={()=>{}}>
                    <button type="submit"  className="btn btn-primary">Login</button>
                </span>
                <button type="button" onClick={()=>{}} className="btn btn-default">Cancel</button>
            </form>
        </div>
    </>   
    );
}

export default Login;
