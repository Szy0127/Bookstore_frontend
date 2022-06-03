import {Layout, Table} from "antd";
import {getBook} from "../service/BookService";
import {getOrders} from "../service/UserService";
import React from "react";

export class OrderManagement extends React.Component {

    constructor(props) {
        super(props);
        this.state = {orders: null};
    }
    componentDidMount() {
        getOrders(
            (orders)=>{
                this.setState({orders: orders})
            }
        );
    }


    render() {
        if(!this.state.orders){
            return null;
        }
        const dataSource = [];
        for (let order of this.state.orders) {
            let book = getBook(order[0]);
            // console.log(order[1], book[5]);
            dataSource.push(
                {
                    date: order[2],
                    number: order[3],
                    user: 'szy0127',
                    info: {
                        key: order[0],
                        amount: order[1],
                        price: (order[1] * parseFloat(book[5])).toFixed(2)
                    }//序号 数量 金额
                }
            )
        }

        const columns = [
            {
                title: '时间',
                dataIndex: 'date',
                key: 'date',
                sorter:(a,b)=>a.date>b.date //之后用时间的类再改
            },
            {
                title: '订单号',
                dataIndex: 'number',
                key: 'number',
            },
            {
                title: '用户',
                dataIndex: 'user',
                key: 'user',
            },
            {
                title: '商品信息',
                dataIndex: 'info',
                key: 'info',
                render: (info) =>
                    <React.Fragment>
                        <div>商品序号：{info.key}</div>
                        <div>购买数量：{info.amount}</div>
                        <div>总价格：{info.price}</div>
                    </React.Fragment>


            },

        ];


        return (
            <Layout>
                <Table dataSource={dataSource} columns={columns}/>
            </Layout>
        )
    }
}