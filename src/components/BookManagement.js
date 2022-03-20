import {Layout, Table,Input} from "antd";
import {getBooks} from "../service/BookService";
import React from "react";
import {SearchBook} from "./SearchBook";
export class BookManagement extends React.Component {

    constructor(props) {
        super(props);

        this.books = getBooks();
        this.is_editing_books = this.books.slice();
        this.editRow = -1;
        this.state = {books: this.books.slice(), search_book: ""};
        this.handleSearch = this.handleSearch.bind(this);
        this.handleClear = this.handleClear.bind(this);
    }
    handleSearch(bookName) {
        if (bookName === "") {
            this.setState({books: this.books.slice(), search_book: bookName});
            return;
        }
        let books = this.books.filter(
            (book) => {
                return book[2].toLowerCase().indexOf(bookName) > -1;
            }
        );
        this.setState({books: books, search_book: bookName});
    }

    handleClear() {
        this.setState({books: this.books.slice(), search_book: ""});
    }

    showEditor(rowIndex){
        this.setState({editRow:rowIndex});
    }
    closeEditor(rowIndex){
        if(rowIndex===this.state.editRow){
            return;
        }
        this.setState({editRow:-1,books:this.is_editing_books});
    }


    onChange(row,col,e){//如果每输入一次就更新state 会导致排序+输入的情况下 输入未完成表格就变了
        console.log(row,col,e.target.value);
        // let books = this.state.books;
        // books[row-1][col+1] = e.target.value;
        this.is_editing_books[row-1][col+1] = e.target.value;
        // this.setState({books:books});
    }
    render() {
        const dataSource = [];
        for (let book of this.state.books) {
            dataSource.push(
                {
                    key:book[1],//方便定位
                    name: book[2],
                    type: book[3],
                    author: book[4],
                    price: book[5],
                    description: book[6],
                    storage: book[7],
                    image: book[8],//展示text
                }
            )
        }

        const headers_title = ['序号','书名', '分类', '作者', '价格', '描述', '库存量', '封面'];
        const headers_key = ['key','name', 'type', 'author', 'price', 'description', 'storage', 'image'];
        const columns = []
        for (let i in headers_title) {
            columns.push(
                {
                    title: headers_title[i],
                    dataIndex: headers_key[i],
                    key: headers_key[i],
                    onDoubleClick:this.showEditor,
                    render:(text,record,index)=>
                        this.state.editRow == index && i!=0 ? <Input  defaultValue={text} onChange={this.onChange.bind(this,record['key'],parseInt(i))}/> : text

                }
            )
        }
        columns[0]['width']=70;
        columns[4]['sorter'] = (a,b)=>a.price-b.price;
        columns[5]['ellipsis']=true;
        columns[6]['sorter'] = (a,b)=>a.storage-b.storage;


        return (
            <Layout>
                 <SearchBook books={this.books} search_book={this.state.search_book} handleSearch={this.handleSearch}
                            handleClear={this.handleClear}/>
                <Table
                    onRow={(record,index) => {
                        return {
                            onDoubleClick: event => {this.showEditor(index)},
                            onClick:event=>{this.closeEditor(index)}
                        };
                    }}//onCell没用
                    onHeaderRow={() => {
                        return {
                            onClick:event=>{this.closeEditor(-1)}
                        };
                    }}//onCell没用
                    dataSource={dataSource} columns={columns} className="book_manage_table"/>
            </Layout>
        )
    }
}