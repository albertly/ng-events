import React, {useState, useEffect} from 'react';
import { Prompt } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { saveEvent as saveEventG } from '../../../shared/events';

import Yup from 'yup';

import './CreateEvent.css';
const CustomInputComponent = ({
    field, // { name, value, onChange, onBlur }
    form: { touched, errors, isValid, values, dirty }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
    ...props
  }) => {
    // console.log('Field ',  field);
    // console.log('touched ', touched);
    // console.log('errors ', errors);
    // console.log('values ', values);
    // console.log('isValid ', isValid);
    // console.log('dirty ', dirty);
    // console.log('props ', props);
    
    const propsForInput = Object.assign({}, props);
    delete propsForInput.className;

    return (
        <div className={props.className}>
        {props.lable &&
            <label htmlFor={field.name}>{props.lable}</label>
        }
        { errors[field.name] && touched[field.name] &&
            <em>{errors[field.name]}</em>}
        <input {...field} className="form-control" {...propsForInput} />
        </div>
    )
  };

function CreateEvent({history}) {

    const [isDirty, setDirty] = useState(true);

    const cancelHandler = () => history.push('/events');

    const saveEvent = (values, actions) => {
        saveEventG(values);
        actions.setSubmitting(false);
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
                initialValues={{ name: '', eventDate: '', eventTime:'', eventPrice:0,
                                 location: {address:'', city:'', country:''}, onlineUrl:'', imageUrl: '' }}
                validate={values => {
                    let errors = {};

                    if (!values.name) {
                        errors.name = 'Required';
                    }
                    if (!values.eventDate) {
                        errors.eventDate = 'Required';
                    }
                    if (!values.eventTime) {
                        errors.eventTime = 'Required';
                    }
                    if (!values.eventPrice) {
                        errors.eventPrice = 'Required';
                    }
                    if (!values.imageUrl) {
                        errors.imageUrl = 'Required';
                    } else if (!/[\/.](jpg|png)$/i.test(values.imageUrl)) {
                        errors.imageUrl = 'Must be a png or jpg url';
                    }
                    return errors;
                }}
                onSubmit={saveEvent}
            >
                {({ isSubmitting }) => (
                <Form>
                    <Field  component={CustomInputComponent}
                            className="form-group"
                            type="text"
                            name="name"
                            lable="Event Name:"
                            placeholder="Name of your event..." />

                    <Field  component={CustomInputComponent}
                        className="form-group"
                        type="text"
                        name="eventDate"
                        lable="Event Date:"
                        placeholder="format (mm/dd/yyyy)..." />

                    <Field  component={CustomInputComponent}
                        className="form-group"
                        type="text"
                        name="eventTime"
                        lable="Event Time:"
                        placeholder="start and end time..." />

                    <Field  component={CustomInputComponent}
                        className="form-group"
                        type="number"
                        name="eventPrice"
                        lable="Event Price:"
                        placeholder="event price..." />

                    <div>
                        <Field  component={CustomInputComponent}
                            className="form-group"
                            type="text"
                            name="location.address"
                            lable="Event Location:"
                            placeholder="Address of event..." />                        
                            <div className="row">
                                <Field  component={CustomInputComponent}
                                    className="col-md-6"
                                    type="text"
                                    name="location.city"
                                    placeholder="City..." />            
                                <Field  component={CustomInputComponent}
                                    className="col-md-6"
                                    type="text"
                                    name="location.country"
                                    placeholder="Country..." />                                                     
                            </div>                    
                    </div>
                    <Field  component={CustomInputComponent}
                        className="form-group"
                        type="text"
                        name="onlineUrl"
                        lable="Online Url:"
                        placeholder="Online Url..." /> 
        
                    <Field  component={CustomInputComponent}
                        className="form-group"
                        type="text"
                        name="imageUrl"
                        lable="Image:"
                        placeholder="url of image..." />          
                    <button type="submit">
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