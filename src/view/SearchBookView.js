import React from 'react';
import {Button, Image, Input, Layout, message, Table} from 'antd'
import {HeaderInfo} from "../components/HeaderInfo";
import {OrderList} from "../components/OrderList";
import '../css/order.css'
import {checkSession, getOrdersByUserID} from "../service/UserService";
import {MyMenu} from "../components/Menu";
import {OrderManagement} from "../components/OrderManagement";
import {history} from "../utils/history";
import {getBooks, searchBooksByDescription} from "../service/BookService";
class SearchBookView extends React.Component {


    constructor(props) {
        super(props);
        this.state = {books:[]};
        this.handleChangeDescription = this.handleChangeDescription.bind(this);

    }

    componentDidMount() {
        getBooks((data)=>this.setState({books:data}));

    }

    handleChangeDescription(e){
        let description = e.target.value;
        if(description==""){
            getBooks((data)=>this.setState({books:data}));
            return;
        }
        // console.log("description",description);
        searchBooksByDescription(description,(data)=>this.setState({books:data}));
    }



    render() {
        const dataSource = [];
        for (let book of this.state.books) {
            dataSource.push(
                {
                    // bookID:book.bookID,
                    name: book.name,
                    author: book.author,
                    description: book.description,
                    // image: book.image
                }
            )
        }

        const columns = [
            {
                title: '书名',
                dataIndex: 'name',
                key: 'name',
            },
            {
                title: '作者',
                dataIndex: 'author',
                key: 'author',
            },
            {
                title: '简介',
                dataIndex: 'description',
                key: 'description',
            },
            // {
            //     title: '封面',
            //     dataIndex: 'image',
            //     key: 'image',
            //     render: (text, book, index) =>
            //         <Image src = {text} alt={text}/>
            // }
        ];
        return (
            <Layout>
                <HeaderInfo navID={0}/>
                <div className='container'>
                    <Input placeholder={"关键词"} onChange={this.handleChangeDescription}/>
                    <Table
                        onRow={(record, index) => {
                            //可以在这里直接跳转 但是这个项目的导航写得实在太烂了 不想改了
                            //实际上展示的内容有书名 可以回到主页用书名跳转
                            return {
                                onClick: event => {
                                    console.log(record);
                                }
                            };
                        }}
                        dataSource={dataSource} columns={columns} className="book_manage_table"
                    />
                </div>
            </Layout>
        );
    }
}


export default SearchBookView;
