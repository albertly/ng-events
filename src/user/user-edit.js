import React, { useState, useEffect } from 'react';
import axios from 'axios';

import useForm from 'react-hook-form';

function UserEdit({ match }) {
    const { register, handleSubmit, errors, reset } = useForm(); // initialise the hook

    useEffect(() => {
        console.log(match.params.id);
        axios.get(`/api/users/${match.params.id}`)
            // .then(result => result.json())
            .then(res => {
                // setUserData(rowData.data.data);
                console.log(res.data);
                reset({
                    id: res.data._id,
                    firstName: res.data.firstName,
                    lastName: res.data.lastName,
                    email: res.data.email
                });
            })
            .catch(err => {
                console.log(err);
            });
    }, [match]);

    const onSubmit = data => {
        console.log(data);
    };

    return (
        <form className="form-horizontal" onSubmit={handleSubmit(onSubmit)}>

            <div className="col-md-10">

                <div className="form-group">
                    <label className="col-sm-1" htmlFor="id">Id</label>
                    <div class="col-sm-11">
                        <input name="id" className="form-control" ref={register} readOnly/>
                    </div>
                </div>

                <div className="form-group">
                    <label className="col-sm-1" htmlFor="email">Email</label>
                    <div class="col-sm-11">
                        <input name="email" className="form-control" ref={register} />
                    </div>
                </div>

                <div className="form-group">
                    <label className="col-sm-1" htmlFor="firstName">First Name</label>
                    <div class="col-sm-11">
                        <input name="firstName" className="form-control" ref={register} /> {/* register an input */}
                    </div>
                </div>

                <div className="form-group">
                    <label className="col-sm-1" htmlFor="lastName">Last Name</label>
                    <div class="col-sm-11">
                        <input name="lastName" className="form-control" ref={register({ required: true })} />
                        {errors.lastName && 'Last name is required.'}
                    </div>
                </div>

                <div className="form-group">
                    <input name="age" ref={register({ pattern: /\d+/ })} />
                    {errors.age && 'Please enter number for age.'}
                </div>

                <button type="submit" className="btn btn-primary">Submit</button>
            </div>
        </form>

    );
}

export default UserEdit;