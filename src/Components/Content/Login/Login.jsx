import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { requiredField } from '../../../Validator/validator';
import { createField, Input } from '../../FormsControls/FormControls';
import {connect} from 'react-redux';
import {login} from '../../../Redux/reducers/authReducer';
import {Redirect} from 'react-router-dom';
import "../../../Components/FormsControls/FormControls.scss";


const LoginForm = ({handleSubmit, error, captchaUrl}) => {
    return (
        <form class="form-login" onSubmit={handleSubmit}>
            <div>
                {createField("Email", "email", [requiredField], Input, )}
            </div>
            <div>
                <Field placeholder="Password" name="password" type="password" component={Input} validate={[requiredField]}/>
            </div>
            <div>
                <Field component={Input} name="rememberMe" type="checkbox"/> remember me
            </div>
            {error && <div className="form-error">
                {error}
            </div>}
            {captchaUrl && <>
                <img style={{width: '200px', height: '100px'}} src={captchaUrl} alt='pic'/>
                <Field placeholder="captcha" name="captcha" type="text" component={Input} validate={[requiredField]}/>
            </>}
            <div>
                <button>Login</button>
            </div>
        </form>
    )
}

const LoginReduxForm = reduxForm({form: 'login'})(LoginForm)

const Login = ({login, isAuth, captchaUrl}) => {
    const onSubmit = (formData) => {
        login(formData.email, formData.password, formData.rememberMe, formData.captcha)
    }
    if (isAuth) {
        return <Redirect  to={'/Profile'}/>
    }

    return (
        <div>
            <h1>LOGIN</h1>
           <LoginReduxForm captchaUrl={captchaUrl} onSubmit={onSubmit}/>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        captchaUrl : state.auth.captchaUrl,
        isAuth: state.auth.isAuth
    }
}

export default connect(mapStateToProps, {login})(Login)
