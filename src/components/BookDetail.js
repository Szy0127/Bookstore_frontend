import React from 'react';
import {Button, Layout,Image} from 'antd'
import {getBook} from "../service/BookService";
import "../css/detail.css"
export class BookDetail extends React.Component {
    constructor(props) {
        super(props);
    }
    //
    // add(i) {
    //     console.log(i);
    //     addCart(i);
    // }

    render() {
        const book = getBook(this.props.bookId);
        return (

            <Layout>
                <div className="book_detail">
                        <Image className="detail_img" src={book[8]} alt={book[8]}/>
                    <div className="book_content">
                        <h1>
                            {book[2]}
                        </h1>
                        <div >
                            {'作者 :' + book[4]}
                        </div>
                        <div>
                            {'分类 :' + book[3]}
                        </div>
                        <div>
                            {'定价 :' + book[5]}
                        </div>
                        <div>
                            {'库存 :' + book[7]}
                        </div>
                        <div>
                            作品简介
                        </div>
                        <div>
                            {book[6]}
                        </div>
                    </div>
                </div>
                <div className="buttons">
                    <div className="add_book">
                        {/*<Button onClick={this.add.bind(this,this.props.bookId)}>加入购物车</Button>*/}
                        <Button>加入购物车</Button>
                    </div>
                    <div className="buy_book">
                        <Button>立即购买</Button>
                    </div>
                </div>
            </Layout>

        )

    }

}
