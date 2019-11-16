import React from 'react';

function UserCreated( {history} ) {
    return (
        <div>
            <h2>User has been successfully created</h2>
            <h3>One more step ahead.</h3>
            <h4>A verification email has been sent. Please check your email account and click on confirmation link</h4>
            <hr></hr>
            <button type="button" className="btn btn-default" onClick={() => history.push('/events')}>Go Back</button>
        </div>
    );
}

export default UserCreated;