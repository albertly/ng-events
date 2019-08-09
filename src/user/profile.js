import React from 'react';
import { connect } from 'react-redux';
import { Formik, Form, Field } from 'formik';

import toastr from 'toastr';
import 'toastr/build/toastr.min.css'

import { updateUser } from '../actions/user-actions';
import { selectUser } from '../selectors/user-selector';
import CustomInputComponent from '../shared/custom-input-component';

function Profile({ user, onUpdateUser, history, location }) {

  const mode = location.pathname === '/profile' ? 'upd' : 'add';

  let title = 'Edit Your Profile';
  if (mode === 'add') {
    title = 'Registration';
  }

  const cancelHandler = () => history.push('/events');

  const submitHandler = (values, actions) => {

    onUpdateUser(user.id, values.firstName, values.lastName)
      .then(() => {
        actions.setSubmitting(false);
        toastr.success('Profile Saved');
        history.push('/events');
      }
      )
  };

  const validateForm = values => {
    let errors = {};
    if (!values.email) {
      errors.email = 'Required';
    }
    if (!values.firstName) {
      errors.firstName = 'Required';
    }
    if (!values.lastName) {
      errors.lastName = 'Required';
    }
    return errors;
  };

  return (
    <div>
      <h1>{title}</h1>
      <hr />
      <div className="col-md-4">

        <Formik initialValues={{ email: user.email, firstName: user.firstName, lastName: user.lastName }}
          validate={(values) => validateForm(values)}
          onSubmit={submitHandler}
          handleChange
        >
          {() => (
            <>
              <Form>
              <Field component={CustomInputComponent}
                  className="form-group"
                  type="email"
                  name="email"
                  lable="E-Mail:"
                  placeholder="E-Mail..." />

                <Field component={CustomInputComponent}
                  className="form-group"
                  type="text"
                  name="firstName"
                  lable="First Name:"
                  placeholder="First Name..." />

                <Field component={CustomInputComponent}
                  className="form-group"
                  type="text"
                  name="lastName"
                  lable="Last Name:"
                  placeholder="Last Name..." />

                <button type="submit" className="btn btn-primary">Save</button>
                <button type="button" className="btn btn-default" onClick={cancelHandler}>Cancel</button>
              </Form>
            </>
          )}
        </Formik>
      </div>
    </div>
  );
}


const mapStateToProps = state => {
  return {
    user: selectUser(state)
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onUpdateUser: async (userId, firstName, lastName) => {
      return await dispatch(updateUser(userId, firstName, lastName));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Profile);


