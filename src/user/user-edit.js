import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Select from 'react-select';
import useForm from 'react-hook-form';
import chroma from 'chroma-js';

const colourStyles = {
    control: styles => ({ ...styles, backgroundColor: 'white' }),
    option: (styles, { data, isDisabled, isFocused, isSelected }) => {
        const color = chroma(data.color);
        return {
            ...styles,
            backgroundColor: isDisabled
                ? null
                : isSelected
                    ? data.color
                    : isFocused
                        ? color.alpha(0.1).css()
                        : null,
            color: isDisabled
                ? '#ccc'
                : isSelected
                    ? chroma.contrast(color, 'white') > 2
                        ? 'white'
                        : 'black'
                    : data.color,
            cursor: isDisabled ? 'not-allowed' : 'default',

            ':active': {
                ...styles[':active'],
                backgroundColor: !isDisabled && (isSelected ? data.color : color.alpha(0.3).css()),
            },
        };
    },
    multiValue: (styles, { data }) => {
        const color = chroma(data.color);
        return {
            ...styles,
            backgroundColor: color.alpha(0.1).css(),
        };
    },
    multiValueLabel: (styles, { data }) => ({
        ...styles,
        color: data.color,
    }),
    multiValueRemove: (styles, { data }) => ({
        ...styles,
        color: data.color,
        ':hover': {
            backgroundColor: data.color,
            color: 'white',
        },
    }),
};

function UserEdit({ match }) {

    const rolesOptions = [
        { value: 'user', label: 'User', color: '#00B8D9' },
        { value: 'admin', label: 'Admin', color: '#0052CC' }
    ];

    const [roles, setRoles] = useState('');
    const { register, handleSubmit, errors, reset } = useForm(); // initialise the hook

    useEffect(() => {

        axios.get(`/api/users/${match.params.id}`)
            .then(res => {

                setRoles(res.data.roles);

                reset({
                    id: res.data._id,
                    firstName: res.data.firstName,
                    lastName: res.data.lastName,
                    email: res.data.email,
                    roles: res.data.roles,
                });
            })
            .catch(err => {
                console.log(err);
            });
    }, [match]);

    const onSubmit = data => {
        console.log(data);
    };

    const handleChange = selectedOption => {
        console.log(`Option selected:`, selectedOption)
    };

    return (
        <form className="form-horizontal" onSubmit={handleSubmit(onSubmit)}>

            <div className="col-md-10">

                <div className="form-group">
                    <label className="col-sm-1" htmlFor="id">Id</label>
                    <div class="col-sm-11">
                        <input name="id" className="form-control" ref={register} readOnly />
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
                    <label className="col-sm-1" htmlFor="roles">Roles</label>
                    <div class="col-sm-11">
                        <Select
                            value={rolesOptions.filter(({ value }) => roles.split(' ').includes(value))}
                            isMulti
                            name="roles"
                            options={rolesOptions}
                            className="basic-multi-select"
                            classNamePrefix="select"
                            styles={colourStyles}
                            onChange={handleChange}
                        />
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