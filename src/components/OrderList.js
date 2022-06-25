import React from 'react';
import "../css/cart.css"
import {Button,InputNumber} from "antd";
import {Book} from "./Book";
import {getBook} from "../service/BookService";
/*

不适合检索 废弃了


 */
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

    getItemLists(orderItems){
        let lists = [];
        for(let i in  orderItems){
            let book = orderItems[i]['book'];
            let amount = orderItems[i]['amount'];
            if(i==0){
                lists.push(
                    <tr>
                        <td>
                            <Book book_width={100} book={book}/>
                        </td>
                        <td>{book['price']}</td>
                        <td>{amount}</td>
                        <td>
                            <Button>申请售后</Button>
                        </td>
                        <td>{(book['price']*amount).toFixed(2)}</td>
                        <td>
                            <div className="center">交易成功</div>
                            <Button className="center block">订单详情</Button>
                            <Button className="center block">查看物流</Button>
                        </td>
                        <td>
                            <Button className="block">追加评论</Button>
                            <Button className="block">申请开票</Button>
                        </td>
                    </tr>
                )
            }else{
                lists.push(
                    <tr>
                        <td>
                            <Book book_width={100} book={book}/>
                        </td>
                        <td>{book['price']}</td>
                        <td>{amount}</td>
                        <td/>
                        <td>{(book['price']*amount).toFixed(2)}</td>

                    </tr>
                )
            }
        }
        return lists;
    }

    formatDate(date){
        return date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate();
    }


    render() {
        console.log(this.props.orders);
        let orders = [];
        for (let order of this.props.orders) {
            console.log(order.time);
            orders.push(
                <React.Fragment>
                        <div className="order_info">
                            <span>{this.formatDate(new Date(order['time']))}</span>
                            <span>订单号：{order['orderID']}</span>
                        </div>
                    {this.getItemLists(order['orderItems'])}</React.Fragment>
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

