import React from 'react';

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
    delete propsForInput.children

    return (
        <div className={props.className}>
        {props.lable &&
            <label htmlFor={field.name}>{props.lable}</label>
        }
        { errors[field.name] && touched[field.name] &&
            <em>{errors[field.name]}</em>}
        {props.type !== 'select' && props.type !== 'textarea' ? (
            <>
                <input {...field} className="form-control" {...propsForInput} />
                {props.children}
            </>
        ) :
        (
            // React.createElement(
            //     props.type ,
            //     [...propsForInput, ...field],
            //     [...props.children]
            // )
            <props.type {...field} className="form-control" {...propsForInput}>
               {props.children}
            </props.type>
        )
        }
        
        </div>
    )
  };

  export default CustomInputComponent;