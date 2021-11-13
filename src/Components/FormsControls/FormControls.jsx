import React from 'react';
import { Field } from 'redux-form';
import './FormControls.scss'


const FormControl = ({input, meta, child, ...props}) => {
    const hasError = meta.touched && meta.error;

    return(
        <div>
            {props.children}
            {hasError &&
                <span>{meta.error}</span>
            }
        </div>
    );
}

export const TextArea = (props) => {
    const {input, meta, child, ...restProps} = props;
    return (
       <FormControl {...props}><textarea className={meta.touched && meta.error && 'error'} {...input} {...restProps}/></FormControl>
   )
}

export const Input = (props) => {
    const {input, meta, child, ...restProps} = props;
    return (
       <FormControl {...props}><input className={meta.touched && meta.error && 'error'} {...input} {...restProps}/></FormControl>
   )
}

export const createField = (placeholder, name, validators, component ) => {
    return(  <Field placeholder={placeholder} name={name} component={component} validate={validators}/>)
}