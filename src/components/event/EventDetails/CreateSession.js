import React, {useState, useEffect} from 'react';
import { Formik, Form, Field } from 'formik';

import CustomInputComponent from '../../../shared/CustomInputComponent';

import './CreateSession.css';

function CreateSession({match, history}) {

    const validateForm = values => {
        {
            let errors = {};
    
            if (!values.name) {
                errors.name = 'Required';
            }

            if (!values.presenter) {
                errors.presenter = 'Required';
            }
            if (!values.duration) {
                errors.duration = 'Required';
            }
            if (!values.level) {
                errors.level = 'Required';
            }
            if (!values.abstract) {
                errors.abstract = 'Required';
            } else if (values.abstract.length > 400) {
                errors.abstract = 'Cannot exceed 400 characters'
            }

            return errors;
        }
    };

    return (
        <>
            <div className="col-md-12">
                <h3>Create Session</h3>
            </div>
            <div className="col-md-6">
                <Formik
                    initialValues={{ name: '', presenter: '', duration: '', level:'', abstract:''}}
                    validate={ (values) => validateForm(values) }
                    // onSubmit={submitHandler}
                    // handleChange
                >
                    {({ isSubmitting, dirty, values }) => (
                        <Form>
                            <Field  component={CustomInputComponent}
                                className="form-group"
                                type="text"
                                name="name"
                                lable="Session Name:"
                                placeholder="session name..." />
                            
                            <Field  component={CustomInputComponent}
                                className="form-group"
                                type="text"
                                name="presenter"
                                lable="Presenter:"
                                placeholder="presenter..." /> 

                            <Field  component={CustomInputComponent}
                                className="form-group"
                                type="select"
                                name="duration"
                                lable="Duration:">

                                <option value="">select duration...</option>
                                <option value="1">Half Hour</option>
                                <option value="2">1 Hour</option>
                                <option value="3">Half Day</option>
                                <option value="4">Full Day</option>
                            </Field>  

                            <Field  component={CustomInputComponent}
                                className="form-group"
                                type="select"
                                name="level"
                                lable="Level:"> 

                                    <option value="">select level...</option>
                                    <option value="Beginner">Beginner</option>
                                    <option value="Intermediate">Intermediate</option>
                                    <option value="Advanced">Advanced</option>
                            </Field> 

                            <Field  component={CustomInputComponent}
                                className="form-group"
                                type="textarea"
                                name="abstract"
                                rows={3}
                                lable="Abstract:"
                                placeholder="abstract..." /> 

                        </Form>
                    )}

                </Formik>
            </div>
        </>
    );
}

export default CreateSession;
