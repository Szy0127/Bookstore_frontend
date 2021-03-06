import {Input, Layout, Table} from "antd";
import {getBook} from "../service/BookService";
import {getOrdersByTimeAndBook, getOrdersByUserAndTimeAndBook} from "../service/UserService";
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
        const f = this.props.type == "user" ? getOrdersByUserAndTimeAndBook : getOrdersByTimeAndBook;
        f(
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
                title: '??????',
                dataIndex: 'bookname',
                key: 'bookname',
            },
            {
                title: '??????',
                dataIndex: 'bookprice',
                key: 'bookprice',
                sorter:(a,b)=>a.bookprice>b.bookprice
            },
            {
                title: '??????',
                dataIndex: 'amount',
                key: 'amount',
                sorter:(a,b)=>a.amount>b.amount
            },
            {
                title: '??????',
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
                title: '?????????',
                dataIndex: 'orderID',
                key: 'orderID',
            },
            {
                title: '??????',
                dataIndex: 'date',
                key: 'date',
                sorter:(a,b)=>a.date>b.date,//???????????????????????????
                render:(d)=> this.formatDate(d)
            },
            {
                title: '??????ID',
                dataIndex: 'user',
                key: 'user',
            },
            {
                title: '??????',
                dataIndex: 'price',
                key: 'price',
                sorter:(a,b)=>a.price > b.price
            },
            {
                title: '??????',
                dataIndex: 'address',
                key: 'address',
            },
            {
                title: '??????',
                dataIndex: 'phone',
                key: 'phone',
            },
            {
                title: '????????????',
                dataIndex: 'phase',
                key: 'phase',
                render:(phase)=>{
                    if(phase==1)return "?????????"
                    if(phase==2)return "?????????"
                    if(phase==3)return "?????????"
                    if(phase==4)return "?????????"
                    if(phase==5)return "??????"
                }
            }

        ];
        if(this.props.type=="user"){
            //????????????ID
            columns.splice(2,1);
        }

        return (
            <Layout>
                <DateRange handleChangeStart={this.handleChangeStart} handleChangeEnd={this.handleChangeEnd}/>
                <Input placeholder={"??????"} onChange={this.handleChangeBookName}/>
                <Table dataSource={dataSource} columns={columns} expandedRowRender={this.expandRow}/>
            </Layout>
        )
    }
}
