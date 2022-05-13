import React from 'react';
import {Button, Layout,Image} from 'antd'
import {getBook} from "../service/BookService";
import "../css/detail.css"
import {addCart, buyBooks} from "../service/UserService";
export class BookDetail extends React.Component {
    constructor(props) {
        super(props);

        this.state = {book: null};
    }

    componentDidMount() {
        getBook(this.props.bookID,(data)=>{
            this.setState({book:data});
        }
        );
    }
    add(bookID){
        addCart(bookID);
    }

    buy(bookID){
        let buy = window.confirm("是否立刻下单");
        if(!buy){
            return;
        }
        buyBooks([{'bookID':bookID, 'amount': 1}]);
    }

    render() {
        if(!this.state.book){
            return <div/>;
        }
        return (
            <Layout>
                <div className="book_detail">
                        <Image className="detail_img" src={this.state.book['image']} alt={this.state.book['name']}/>
                    <div className="book_content">
                        <h1>
                            {this.state.book['name']}
                        </h1>
                        <div >
                            {'作者 :' + this.state.book['author']}
                        </div>
                        <div>
                            {'分类 :' + this.state.book['type']}
                        </div>
                        <div>
                            {'定价 :' + this.state.book['price']}
                        </div>
                        <div>
                            {'库存 :' + this.state.book['inventory']}
                        </div>
                        <div>
                            作品简介
                        </div>
                        <div>
                            {this.state.book['description']}
                        </div>
                    </div>
                </div>
                <div className="buttons">
                    <div className="add_book">
                        <Button onClick={this.add.bind(this,this.state.book['bookID'])}>加入购物车</Button>
                    </div>
                    <div className="buy_book">
                        <Button onClick={this.buy.bind(this,this.state.book['bookID'])}>立即购买</Button>
                    </div>
                </div>
            </Layout>

        )

    }

}
