import React from 'react';
import "../css/cart.css"
import {Button,InputNumber,Table} from "antd";
import {Book} from "./Book";
import {getBook} from "../service/BookService";
import {getCart, updateCart, removeCart, buyBooks} from "../service/UserService";
const CartFooter = function (props) {
    return (
        <div className="fixed-bottom cart_footer">
            <div className="cart_footer_item col-lg-2">
                <input type="checkbox" onChange={props.handleAll} checked={props.all}/>全选
            </div>
            <a className="cart_footer_item col-lg-3" onClick={props.handleRemove}>删除</a>
            <div className="cart_footer_item col-lg-3">
                已选商品{props.number}件
            </div>
            <div className="cart_footer_item col-lg-3">
                合计{props.money.toFixed(2)}元
            </div>
            <Button className="cart_footer_item" onClick={props.handleBuy}>结算</Button>
        </div>
    )
}

export class CartList extends React.Component {

    constructor(props) {
        super(props);


        this.state = {cart:[],all:false,checked: [],books: []};

        this.handleAll = this.handleAll.bind(this);
        this.handleRemoveMulti = this.handleRemoveMulti.bind(this);
        this.handleBuy = this.handleBuy.bind(this);
    }

    async componentDidMount() {
        getCart((data)=>{
            data.reverse();
            this.setState({cart:data, checked: new Array(data.length).fill(false)});
        }
        )
    }

    getPrice(){
        let price = 0;
        for(let i in this.state.cart){
            if(this.state.checked[i]){
                price += parseFloat(this.state.cart[i]['book']['price']) * this.state.cart[i]['amount'];
            }
        }
        return price;
    }

    getNumber(){
        let amount = 0;
        for(let i in this.state.cart){
            if(this.state.checked[i]){
                amount += this.state.cart[i]['amount'];
            }
        }
        return amount;
    }

    handleCheck(index, e) {
        let checked = this.state.checked;
        checked[index] = e.target.checked;
        let all = checked[index]? this.state.all:false;
        this.setState({all:all,checked: checked});
    }

    handleAll(e) {
        let checked = this.state.checked;
        let all = e.target.checked;
        if (all) {
            for (let i in checked) {
                checked[i] = true;
            }
        } else {
            for (let i in checked) {
                checked[i] = false;
            }
        }
        this.setState({all: all, checked: checked});
    }

    // getRemovedState(index) {
    //     let books = this.state.books;
    //     let checked = this.state.checked;
    //     books.splice(index, 1);
    //     checked.splice(index, 1);
        // amounts.splice(index, 1);
        // return {checked: checked,books:books};//,amounts:amounts};
    // }

    handleRemoveOne(index, e) {
        e.preventDefault();
        let del = window.confirm("确认删除吗？");
        if(!del){
            return;
        }
        removeCart(this.state.cart[index]['book']['bookID']);
        getCart((data)=> {
            data.reverse();
            this.setState({cart: data, checked: new Array(data.length).fill(false)});
        })
    }

    handleRemoveMulti(e) {
        e.preventDefault();
        let del = window.confirm("确认删除吗？");
        if(!del){
            return;
        }
        let checked = this.state.checked;
        for (let index = 0; index < checked.length; index++) {
            if (checked[index]) {
                // books.splice(index, 1);
                checked.splice(index, 1);
                index--
                removeCart(this.state.cart[index]['book']['bookID']);
                getCart((data)=>
                    this.setState({cart:data,checked:new Array(data.length).fill(false)})
                )
            }
        }
        // this.setState({books:books,checked:checked});
    }

    handleAmount(index,amount){
        let cart = {};
        cart['bookID'] = this.state.cart[index]['book']['bookID'];
        cart['amount'] = parseInt(amount);
        this.state.cart[index]['amount'] = parseInt(amount);
        updateCart(cart);
        this.setState({cart:this.state.cart});

    }

    handleBuy(e){
        e.preventDefault();
        let buy = window.confirm("是否立刻下单");
        if(!buy){
            return;
        }
        let checked = this.state.checked;
        let buys = [];
        for (let index in checked) {
            if (checked[index]) {
                let item = {};
                item['bookID'] = this.state.cart[index]['book']['bookID'];
                item['amount'] = this.state.cart[index]['amount'];
                buys.push(item);
            }
        }
        buyBooks(buys);
    }

    render() {


        const dataSource = [];
        for (let index in this.state.cart) {
            let book = this.state.cart[index]['book'];
            let amount = this.state.cart[index]['amount'];
            dataSource.push(
                {
                    checked:this.state.checked[index],
                    book: book,
                    unitPrice: book['price'],
                    amount:amount,
                    totalPrice:(parseFloat(book['price'])*amount).toFixed(2)
                }
            )
        }
        console.log(dataSource);

        const columns = [
            {
                title: '全选',
                dataIndex: 'checked',
                key: 'checked',
                render:(text,recorde,index)=><input type="checkbox" onChange={this.handleCheck.bind(this, index)}
                                         checked={this.state.checked[index]}/>
            },
            {
                title: '商品信息',
                dataIndex: 'book',
                key: 'book',
                render:(text)=><Book book={text} book_width={300}/>
            },
            {
                title: '单价',
                dataIndex: 'unitPrice',
                key: 'unitPrice'
            },
            {
                title: '数量',
                dataIndex: 'amount',
                key: 'amount',
                render:(text,record,index)=><InputNumber size="large" min={1} max={999}  value={this.state.cart[index]['amount']} onChange={this.handleAmount.bind(this,index)}/>
            },
            {
                title: '总价',
                dataIndex: 'totalPrice',
                key: 'totalPrice',
            },
            {
                title: '操作',
                dataIndex: 'del',
                key: 'del',
                render:(text,record,index)=> <Button onClick={this.handleRemoveOne.bind(this, index)}>删除</Button>
            },

        ];



        return (
            <React.Fragment>
                <Table dataSource={dataSource} columns={columns}/>
                <CartFooter number={this.getNumber()} money={this.getPrice()} all={this.state.all}
                            handleRemove={this.handleRemoveMulti} handleAll={this.handleAll} handleBuy={this.handleBuy}/>
            </React.Fragment>
        );
    }

}

