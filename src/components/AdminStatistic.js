import { Pie } from '@ant-design/plots';
import React from "react";
import {getBook,getBookSaled} from "../service/BookService";
import {getUserConsumed} from "../service/UserService";

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
const BookPie = () => {
    let data = []
    for(let book of getBookSaled()){
        data.push(
            {
                type:getBook(book[0])[2],
                value:book[1]
            }
        )
    }
    config.data = data;
    return <Pie {...config} />;
};
const UserPie = () => {
    let data = []
    for(let user of getUserConsumed()){
        data.push(
            {
                type:user[0],
                value:user[1]
            }
        )
    }
    config.data = data;
    return <Pie {...config} />;
};
export  class AdminStatistic extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        console.log(this.props.type);
        if(this.props.type=="book"){
            return <BookPie/>
        }
        return <UserPie/>
    }
}