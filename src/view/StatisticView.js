import React from "react";

import {checkSession, getUserStatistic} from "../service/UserService";
import {Pie} from "@ant-design/plots";
import {DateRange} from "../components/DateRange";
import Text from "antd/es/typography/Text";
import {Layout} from "antd";
import {HeaderInfo} from "../components/HeaderInfo";
import {history} from "../utils/history";
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
        this.state = {config: null,amount:0,consumed:0};
        this.type_now = null;
        this.start = "";
        this.end = "";
        this.handleChangeStart = this.handleChangeStart.bind(this);
        this.handleChangeEnd = this.handleChangeEnd.bind(this);
    }

    componentDidMount() {
        console.log(1);
        this.getData('', '');
        checkSession((succuss)=>{
            if(!succuss){
                history.push("/login");
                history.go();
            }
        })
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

        let callback = (data_ret) => {
            console.log(data_ret);
            let data = [];
            for (let book of data_ret.books) {
                data.push(
                    {
                        type: book.book.name,
                        value: book.amount
                    }
                )
            }
            config.data = data;
            this.setState({config: config,amount:data_ret.bookAmount,consumed:data_ret.consumed});
        };
        getUserStatistic(start, end, callback);

    }

    render() {
        // console.log(this.type_now);
        let fig = null;
        if (this.state.config) {
            fig = <Pie {...this.state.config} style={{width:'600px'}}/>;
        }
        return <Layout>
            <HeaderInfo navID={4}/>
            <div style={{margin:'100px auto'}}>
                <DateRange handleChangeStart={this.handleChangeStart} handleChangeEnd={this.handleChangeEnd}/>
                <div style={{'text-align':'center',margin:'20px'}}><Text style={{fontSize:20}}>{this.state.amount}本</Text></div>
                <div style={{'text-align':'center',margin:'20px'}}><Text style={{fontSize:20}}>{this.state.consumed}元</Text></div>
                {fig}
            </div>
        </Layout>

    }
}



export default StatisticView;
