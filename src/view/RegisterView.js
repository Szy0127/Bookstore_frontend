import React from 'react';
import RegisterForm from "../components/RegisterForm";
import "../css/login.css"


class RegisterView extends React.Component{

    constructor(props) {
        super(props);
    }

    render(){
        return(
            <div className="login-page">
                <div className="login-container">
                    <div className="login-box">
                        <div className="login-content">
                            <h1 className="page-title">Register</h1>
                            <RegisterForm/>
                        </div>
                    </div>
                </div>
            </div>
        );

    }
}

export default RegisterView;