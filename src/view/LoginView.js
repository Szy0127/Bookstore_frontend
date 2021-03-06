import React from 'react';
import {LoginForm} from '../components/LoginForm';
import "../css/login.css"


class LoginView extends React.Component{

    constructor(props) {
        super(props);
    }

    render(){
        return(
            <div className="login-page">
                <div className="login-container">
                    <div className="login-box">
                        <div className="login-content">
                            <h1 className="page-title">Login</h1>
                            <LoginForm />
                        </div>
                    </div>
                </div>
            </div>
        );

    }
}

export default LoginView;