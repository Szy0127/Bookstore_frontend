import React from 'react';
import "../css/cart.css"
import {Button,InputNumber,Table} from "antd";
import {Book} from "./Book";
import {getCart,getBook} from "../service/BookService";
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
            <Button className="cart_footer_item">结算</Button>
        </div>
    )
}

export class CartList extends React.Component {

    constructor(props) {
        super(props);

        let checked = [];
        let amounts = [];//单个物品
        let books = [];
        for (let cart of this.props.carts) {
            checked.push(false);
            amounts.push(cart[1]);
            books.push(getBook(cart[0]));
        }
        this.state = {all:false,checked: checked, amounts: amounts,books: books};
        this.handleAll = this.handleAll.bind(this);
        this.handleRemoveMulti = this.handleRemoveMulti.bind(this);
    }
    getMoney(){
        let money = 0;
        for(let i in this.state.books){
            if(this.state.checked[i]){
                money += parseFloat(this.state.books[i][5]) * this.state.amounts[i];
            }
        }
        return money;
    }

    getNumber(){
        let amount = 0;
        for(let i in this.state.books){
            if(this.state.checked[i]){
                amount += this.state.amounts[i];
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

    getRemovedState(index) {
        let books = this.state.books;
        let checked = this.state.checked;
        let amounts = this.state.amounts;
        books.splice(index, 1);
        checked.splice(index, 1);
        amounts.splice(index, 1);
        return {checked: checked,books:books,amounts:amounts};
    }

    handleRemoveOne(index, e) {
        e.preventDefault();
        this.setState(this.getRemovedState(index));
    }

    handleRemoveMulti(e) {
        e.preventDefault();
        let books = this.state.books;
        let checked = this.state.checked;
        for (let index = 0; index < checked.length; index++) {
            if (checked[index]) {
                books.splice(index, 1);
                checked.splice(index, 1);
                index--
            }
        }
        this.setState({books:books,checked:checked});
    }

    handleAmount(index,amount){
        let amounts = this.state.amounts;
        amounts[index] = parseInt(amount);
        console.log(index,amount);
        this.setState({amounts:amounts});
    }


    render() {
        // let carts = [];
        // for (let index in this.state.books) {
        //     let book = this.state.books[index];
        //     carts.push(
        //         <tr>
        //             <th scope="row">
        //                 <input type="checkbox" onChange={this.handleCheck.bind(this, index)}
        //                        checked={this.state.checked[index]}/>
        //             </th>
        //             <td>
        //                 <Book bookId={book[0]} book_width={300}/>
        //             </td>
        //             <td className="cart_book_content">{book[5]}</td>
        //             <td className="cart_book_content">
        //                 <InputNumber size="large" min={1} max={999} value={this.state.amounts[index]} onChange={this.handleAmount.bind(this,index)}/>
        //             </td>
        //             <td className="cart_book_content">{book[5]}</td>
        //             <td>
        //                 <Button onClick={this.handleRemoveOne.bind(this, index)}>删除</Button>
        //             </td>
        //         </tr>
        //     )
        // }

        const dataSource = [];
        for (let index in this.state.books) {
            let book = this.state.books[index];
            dataSource.push(
                {
                    checked:this.state.checked[index],
                    book: book[0],
                    unitPrice: book[5],
                    amount:this.state.amounts[index],
                    totalPrice:(parseFloat(book[5])*this.state.amounts[index]).toFixed(2)
                }
            )
        }

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
                render:(text)=><Book bookId={text} book_width={300}/>
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
                render:(text,record,index)=><InputNumber size="large" min={1} max={999}  value={this.state.amounts[index]} onChange={this.handleAmount.bind(this,index)}/>
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
                {/*<table className="table">*/}
                {/*    <thead>*/}
                {/*    <tr>*/}
                {/*        <th scope="col">*/}
                {/*            <input type="checkbox" onChange={this.handleAll} checked={this.state.all}/>*/}
                {/*            全选*/}
                {/*        </th>*/}
                {/*        <th scope="col">商品信息</th>*/}
                {/*        <th scope="col">单价</th>*/}
                {/*        <th scope="col">数量</th>*/}
                {/*        <th scope="col">金额</th>*/}
                {/*        <th scope="col">操作</th>*/}
                {/*    </tr>*/}
                {/*    </thead>*/}
                {/*    <tbody>*/}
                {/*    {carts}*/}
                {/*    </tbody>*/}
                {/*</table>*/}
                <Table dataSource={dataSource} columns={columns}/>
                <CartFooter number={this.getNumber()} money={this.getMoney()} all={this.state.all}
                            handleRemove={this.handleRemoveMulti} handleAll={this.handleAll}/>
            </React.Fragment>
        );
    }

}

