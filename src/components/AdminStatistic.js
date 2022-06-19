import { Pie } from '@ant-design/plots';
import React from "react";
import {
    getBookSaledByTimeBetween,
    getUserConsumedByTimeBetween
} from "../service/UserService";
import {DatePicker} from "antd";
import {DateRange} from "./DateRange";

const { RangePicker } = DatePicker;

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
        this.start = "";
        this.end = "";
        this.handleChangeStart = this.handleChangeStart.bind(this);
        this.handleChangeEnd = this.handleChangeEnd.bind(this);
    }

    handleChangeStart(dateString){
        this.start = dateString;
        this.getData();
    }
    handleChangeEnd(dateString){
        this.end = dateString;
        this.getData();
    }

    getData() {
        let start = this.start;
        let end = this.end;

        if(this.props.type=="book"){
            let callback = (books)=> {
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
            };
            getBookSaledByTimeBetween(start, end, callback);

            return;
        }
        if(this.props.type=="user"){
            let callback = (users)=> {
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
            }
            getUserConsumedByTimeBetween(start, end, callback);

            return;
        }
    }

    render() {
        // console.log(this.type_now);
        if(this.type_now!=this.props.type){
            this.getData('','');
            this.type_now = this.props.type;

        }
        let fig = null;
        if(this.state.config){
            fig =  <Pie {...this.state.config} />;
        }
        return <React.Fragment>
            <DateRange handleChangeStart={this.handleChangeStart} handleChangeEnd={this.handleChangeEnd}/>
            {/*<RangePicker onChange={this.rangeChange}/>*/}
            {fig}
        </React.Fragment>
    }
}