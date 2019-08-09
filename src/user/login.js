/* react-hooks/exhaustive-deps: 0 */

import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { GoogleLogin } from 'react-google-login';

import { authUser } from '../actions/user-actions';
import { selectUser, isAuth } from '../selectors/user-selector';

import config from '../config.json';
import './login.css';

function Login({ isAuth, user, authUserHandler, history }) {

    const [userName, setUserName] = useState('bradgreen');
    const [userNameValid, setUserNameValid] = useState(true);
    const [userNameTouched, setUserNameTouched] = useState(false);

    const [password, setPassword] = useState('');
    const [passwordValid, setPasswordValid] = useState(true);
    const [passwordTouched, setPasswordTouched] = useState(false);

    useEffect(() => {
        if (isAuth) {
            history.push('/events');
        }
    },
        // eslint-disable-next-line
        [user]);

   const onFailure = (error, desc) => {
        console.log(error, desc);
    };



    const googleResponse = (response) => {
        console.log(response);
        const tokenBlob = new Blob([JSON.stringify({ access_token: response.accessToken }, null, 2)], { type: 'application/json' });
        const options = {
            method: 'POST',
            body: tokenBlob,
            mode: 'cors',
            cache: 'default'
        };
        fetch('http://localhost:8080/api/v1/auth/google', options).then(r => {
            const token = r.headers.get('x-auth-token');
            console.log(token);
            r.json().then(user => {
                if (token) {
                    this.setState({ isAuthenticated: true, user, token })
                }
            });
        })
            .catch(err => console.log(err));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        authUserHandler(userName, password);
    };

    return (
        <>
            <h1>Login</h1>
            <GoogleLogin
                clientId={config.GOOGLE_CLIENT_ID}
                buttonText="Login with Google"
                onSuccess={googleResponse}
                onFailure={onFailure}
                theme="dark"
            />
            <hr />
            <div className="col-md-4">
                <form autoComplete="off" noValidate onSubmit={handleSubmit}>
                    <div className="form-group" >
                        <label htmlFor="userName">User Name:</label>
                        {!userNameValid && <em>Required</em>}
                        <input name="userName"
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
                        {!passwordValid && <em>Required</em>}
                        <input name="password"
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
                    {user.errorMessage && <div className="alert alert-danger">{user.errorMessage}</div>}
                    <span onMouseEnter={() => { }} onMouseLeave={() => { }}>
                        <button type="submit" className="btn btn-primary">Login</button>
                    </span>
                    <button type="button" onClick={() => history.push('/events')} className="btn btn-default">Cancel</button>
                </form>
            </div>
        </>
    );
}

const mapStateToProps = state => {
    return {
        user: selectUser(state),
        isAuth: isAuth(state)
    };
};

const mapDispatchToProps = dispatch => {
    return {
        authUserHandler: (userName, password) => {
            dispatch(authUser(userName, password));
        }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Login);

