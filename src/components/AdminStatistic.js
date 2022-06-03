import { Pie } from '@ant-design/plots';
import React from "react";
import {getUserConsumed,getBookSaled} from "../service/UserService";

let config = {
    appendPadding: 10,
    angleField: 'value',
    colorField: 'type',
    radius: 0.8,
    label: {
        type: 'outer',
        content: '{name} {percentage}',
    },
    interactions: [
        {
            type: 'pie-legend-active',
        },
        {
            type: 'element-active',
        },
    ],
};


export  class AdminStatistic extends React.Component {
    constructor(props) {
        super(props);
        this.state = {config:null}
        this.type_now = null;
    }

    getData() {
        console.log(1);
        if(this.props.type=="book"){
            getBookSaled((books)=> {
                let data = [];
                for (let book of books) {
                    data.push(
                        {
                            type: book.book.name,
                            value: book.amount
                        }
                    )
                }
                config.data = data;
                this.setState({config: config});
            });
            return;
        }
        if(this.props.type=="user"){
            getUserConsumed((users)=> {
                let data = [];
                for (let user of users) {
                    data.push(
                        {
                            type: user.user.username,
                            value: user.consumed
                        }
                    )
                }
                config.data = data;
                this.setState({config: config});
            });
            return;
        }
    }

    render() {
        console.log(this.type_now);
        if(this.type_now!=this.props.type){
            this.getData();
            this.type_now = this.props.type;

        }
        if(!this.state.config){
            return null;
        }
        return <Pie {...this.state.config} />;
    }
}