import React from 'react';
import {Redirect} from "./service/UserService";

export default class PrivateRoute extends React.Component{
    constructor(props) {
        super(props);
        if (localStorage.getItem("username")) {
            this.auth = true;
        }else{
            this.auth = false;
        }
        // if(this.props.admin && ! localStorage.getItem("admin")){
        //     this.auth = false;
        // }
    }


    render() {

        return this.auth? this.props.component : <Redirect/>
    }
}

