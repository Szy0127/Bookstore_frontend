import React from 'react';
import "../css/cart.css"
import {Button,InputNumber} from "antd";
import {Book} from "./Book";
import {getBook} from "../service/BookService";

export class OrderList extends React.Component {

    constructor(props) {
        super(props);
        // this.state={orders:this.props.orders.slice()};
        //父元素的state只能作为子元素的props 父元素state修改后只调用子元素的render constructor只执行一遍
        //支持删除则需要把信息都存在父元素的state里  但那样getOrder就没用了 等之后有后端了直接统一访问后端接口
    }

    // handleRemove(index){
    //     let orders = this.state.orders;
    //     orders.splice(index,1);
    //     this.setState({orders:orders});
    // }

    render() {
        console.log(3);
        let orders = [];
        for (let order of this.props.orders) {
            let book = getBook(order[0])
            orders.push(
                <React.Fragment>
                        <div className="order_info">
                            <span>{order[2]}</span>
                            <span>订单号：{order[3]}</span>
                            <Button className="order_delete">删除</Button>
                        </div>
                <tr>
                    <td>
                        <Book book_width={100} bookId={book[0]}/>
                    </td>
                    <td>{book[5]}</td>
                    <td>{order[1]}</td>
                    <td>
                        <Button>申请售后</Button>
                    </td>
                    <td>{(book[5]*order[1]).toFixed(2)}</td>
                    <td>
                        <div className="center">交易成功</div>
                        <Button className="center block">订单详情</Button>
                        <Button className="center block">查看物流</Button>
                    </td>
                    <td>
                        <Button className="block">追加评论</Button>
                        <Button className="block">申请开票</Button>
                    </td>
                </tr></React.Fragment>
            )
        }

        return (
            <React.Fragment>
                <table className="table order_content">
                    <thead>
                    <tr>
                        <th scope="col">宝贝</th>
                        <th scope="col">单价</th>
                        <th scope="col">数量</th>
                        <th scope="col">商品操作</th>
                        <th scope="col">实付款</th>
                        <th scope="col">交易状态</th>
                        <th scope="col">交易操作</th>
                    </tr>
                    </thead>
                    <tbody>
                    {orders}
                    </tbody>
                </table>
            </React.Fragment>
        );
    }

}

