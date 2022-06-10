import React from "react";
import {DatePicker, Space} from "antd";

export class DateRange extends React.Component {

    constructor(props) {
        super(props);
        this.changeStart = this.changeStart.bind(this);
        this.changeEnd = this.changeEnd.bind(this);
    }

    changeStart(date,dateString){
        this.props.handleChangeStart(dateString);
    }
    changeEnd(date,dateString){
        this.props.handleChangeEnd(dateString);

    }

    render() {

        return <Space>
            <DatePicker placeholder={"开始日期"} onChange={this.changeStart} />
            <DatePicker placeholder={"结束日期"} onChange={this.changeEnd}/>
        </Space>
    }

}
