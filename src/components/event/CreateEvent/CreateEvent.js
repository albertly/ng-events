import React, {useState, useEffect} from 'react';
import { Prompt } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import Yup from 'yup';

import './CreateEvent.css';
const CustomInputComponent = ({
    field, // { name, value, onChange, onBlur }
    form: { touched, errors, isValid, values, dirty }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
    ...props
  }) => {
    console.log('Field ',  field);
    console.log('touched ', touched);
    console.log('errors ', errors);
    console.log('values ', values);
    console.log('isValid ', isValid);
    console.log('dirty ', dirty);
    return (
        <div className="form-group">
        <label htmlFor={field.name}>{props.lable}</label>
        { errors[field.name] && touched[field.name] &&
            <em>Required</em>}
        <input type="text" {...field} className="form-control" {...props} />
        </div>
    )
  };

function CreateEvent({history}) {

    const [isDirty, setDirty] = useState(true);

    const cancelHandler = () => history.push('/events');

    const  event = {
        id: 0,
        name: '',
        date: '',
        time: '',
        price: 0,
        imageUrl: '',
        location: {
          address: '',
          city: '',
          country: '',
        },
        onlineUrl: '',
    }

    return (
    <>
        <Prompt when={isDirty}
            message="You have not saved this event, do you really want to cancel?"
        />
        <h1>New Event</h1>
        <hr/>
        <div className="col-md-6">

            <Formik
                initialValues={{ eventName: '', eventDate: '', eventTime:'', email: '', }}
                validate={values => {
                    let errors = {};
                    if (!values.email) {
                        errors.email = 'Required';
                    } else if (
                        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                    ) {
                        errors.email = 'Invalid email address';
                    }
                    if (!values.eventName) {
                        errors.eventName = 'Required';
                    }
                    if (!values.eventDate) {
                        errors.eventDate = 'Required';
                    }
                    if (!values.eventTime) {
                        errors.eventTime = 'Required';
                    }
                    return errors;
                }}
                onSubmit={(values, { setSubmitting }) => {
                    setTimeout(() => {
                    alert(JSON.stringify(values, null, 2));
                    setSubmitting(false);
                    }, 400);
                }}
            >
                {({ isSubmitting }) => (
                <Form>
                    <Field  component={CustomInputComponent}
                            type="text"
                            name="eventName"
                            lable="Event Name:"
                            placeholder="Name of your event..." />

                    <Field  component={CustomInputComponent}
                        type="text"
                        name="eventDate"
                        lable="Event Date:"
                        placeholder="format (mm/dd/yyyy)..." />

                    <Field  component={CustomInputComponent}
                        type="text"
                        name="eventTime"
                        lable="Event Time:"
                        placeholder="start and end time..." />

                    <div className="form-group">
                    <label htmlFor="email">Event Name:</label>        
                    <Field type="email" name="email" className="form-control" placeholder="Name of your event..." />
                    <ErrorMessage name="email" component="div" />
                    </div>


                    <button type="submit" disabled={isSubmitting}>
                        Submit
                    </button>
                </Form>
            )}
            </Formik>

            <br/>
            <br/>
            <button type="submit" className="btn btn-primary">Save</button>
            <button type="button" className="btn btn-default" onClick={cancelHandler}>Cancel</button>
        </div>    
    </>   
    );
}

export default CreateEvent;