import {Input, Layout, Table} from "antd";
import {getBook} from "../service/BookService";
import {getOrdersByTimeAndBook} from "../service/UserService";
import React from "react";
import {BookCard} from "./BookCard";
import {DateRange} from "./DateRange";

export class OrderManagement extends React.Component {

    constructor(props) {
        super(props);
        this.state = {orders: null};
        this.expandRow = this.expandRow.bind(this);
        this.start = "";
        this.end = "";
        this.search = "";
        this.getData = this.getData.bind(this);
        this.handleChangeStart = this.handleChangeStart.bind(this);
        this.handleChangeEnd = this.handleChangeEnd.bind(this);
        this.handleChangeBookName= this.handleChangeBookName.bind(this);
    }
    componentDidMount() {
        this.getData();
    }

    handleChangeBookName(e){
        this.search = e.target.value.toLowerCase();
        this.getData();
    }
    handleChangeStart(dateString){
        this.start = dateString;
        this.getData();
    }
    handleChangeEnd(dateString){
        this.end = dateString;
        this.getData();
    }

    getData(){
        getOrdersByTimeAndBook(
            this.start,
            this.end,
            this.search,
            (orders)=>{
                this.setState({orders: orders})
            }
        );
    }
    formatDate(date){
        return date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate();
    }

    expandRow(record, index, indent, expanded){
        // console.log(record, index, indent, expanded);
        let dataSource = [];
        for(let item of record.items){
            dataSource.push({
                bookname: item.book.name,
                bookprice:parseFloat(item.book.price),
                amount: parseInt(item.amount),
                price: (parseFloat(item.book.price) * parseInt(item.amount)).toFixed(2)
            })

        }
        const columns = [
            {
                title: '书名',
                dataIndex: 'bookname',
                key: 'bookname',
            },
            {
                title: '单价',
                dataIndex: 'bookprice',
                key: 'bookprice',
                sorter:(a,b)=>a.bookprice>b.bookprice
            },
            {
                title: '数量',
                dataIndex: 'amount',
                key: 'amount',
                sorter:(a,b)=>a.amount>b.amount
            },
            {
                title: '总价',
                dataIndex: 'price',
                key: 'price',
                sorter:(a,b)=>a.price>b.price
            }];

        return <Table dataSource={dataSource} columns={columns}/>;
    }



    render() {
        if(!this.state.orders){
            return null;
        }
        const dataSource = [];
        for (let order of this.state.orders) {
            dataSource.push(
                {
                    orderID:order.orderID,
                    date: new Date(order.time),
                    user: order.userID,
                    price: parseFloat(order.price).toFixed(2),
                    address:order.address,
                    phone:order.phone,
                    phase:order.phase,
                    items:order.orderItems
                }
            )
        }

        const columns = [
            {
                title: '订单号',
                dataIndex: 'orderID',
                key: 'orderID',
            },
            {
                title: '时间',
                dataIndex: 'date',
                key: 'date',
                sorter:(a,b)=>a.date>b.date,//之后用时间的类再改
                render:(d)=> this.formatDate(d)
            },
            {
                title: '用户ID',
                dataIndex: 'user',
                key: 'user',
            },
            {
                title: '总价',
                dataIndex: 'price',
                key: 'price',
                sorter:(a,b)=>a.price > b.price
            },
            {
                title: '地址',
                dataIndex: 'address',
                key: 'address',
            },
            {
                title: '电话',
                dataIndex: 'phone',
                key: 'phone',
            },
            {
                title: '当前状态',
                dataIndex: 'phase',
                key: 'phase',
                render:(phase)=>{
                    if(phase==1)return "待付款"
                    if(phase==2)return "待发货"
                    if(phase==3)return "待收获"
                    if(phase==4)return "待评价"
                    if(phase==5)return "完成"
                }
            }

        ];

        return (
            <Layout>
                <DateRange handleChangeStart={this.handleChangeStart} handleChangeEnd={this.handleChangeEnd}/>
                <Input placeholder={"书名"} onChange={this.handleChangeBookName}/>
                <Table dataSource={dataSource} columns={columns} expandedRowRender={this.expandRow}/>
            </Layout>
        )
    }
}