import React from "react";
import {BookManagement} from "../components/BookManagement";
import {UserManagement} from "../components/UserManagement";
import {OrderManagement} from "../components/OrderManagement";
import {AdminStatistic} from "../components/AdminStatistic";
import {Layout} from "antd";
import {HeaderInfo} from "../components/HeaderInfo";
import {MyMenu} from "../components/Menu";
import {
    getBookSaledByTimeBetween,
    getBookSaledByUserAndTime,
    getUserConsumedByTimeBetween
} from "../service/UserService";
import {Pie} from "@ant-design/plots";
import {DateRange} from "../components/DateRange";

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

class StatisticView extends React.Component {

    constructor(props) {
        super(props);
        this.state = {config: null}
        this.type_now = null;
        this.start = "";
        this.end = "";
        this.handleChangeStart = this.handleChangeStart.bind(this);
        this.handleChangeEnd = this.handleChangeEnd.bind(this);
    }

    componentDidMount() {
        console.log(1);
        this.getData('', '');
    }

    handleChangeStart(dateString) {
        this.start = dateString;
        this.getData();
    }

    handleChangeEnd(dateString) {
        this.end = dateString;
        this.getData();
    }

    getData() {
        let start = this.start;
        let end = this.end;

        let callback = (books) => {
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
        getBookSaledByUserAndTime(start, end, callback);

    }

    render() {
        // console.log(this.type_now);
        let fig = null;
        if (this.state.config) {
            fig = <Pie {...this.state.config} />;
        }
        return <React.Fragment>
            <DateRange handleChangeStart={this.handleChangeStart} handleChangeEnd={this.handleChangeEnd}/>
            {/*<RangePicker onChange={this.rangeChange}/>*/}
            {fig}
        </React.Fragment>
    }
}


export default StatisticView;