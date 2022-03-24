import React from 'react';
import {Redirect} from "./service/UserService";

export default class PrivateRoute extends React.Component{
    constructor(props) {
        super(props);
        this.auth = localStorage.getItem("user");
        if(this.props.admin && ! localStorage.getItem("admin")){
            this.auth = false;
        }
    }


    render() {

        return this.auth? this.props.component : <Redirect/>
    }
}

