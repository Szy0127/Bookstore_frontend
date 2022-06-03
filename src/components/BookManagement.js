import {Button, Form, Input, InputNumber, Layout, Select, Table} from "antd";
import {getBooks,addBook,removeBook} from "../service/BookService";
import React from "react";
import {SearchBook} from "./SearchBook";

const {Option} = Select;

const layout = {
    labelCol: {
        span: 8,
    },
    wrapperCol: {
        span: 6,
    },
};
const tailLayout = {
    wrapperCol: {
        offset: 8,
        span: 16,
    },
};


const BookForm = (props) => {
    const [form] = Form.useForm();
    const onFinish = (values) => {
        props.handleAdd(values);
        onReset()
    };
    const onReset = () => {
        form.resetFields();
    }
    let formItems = [];
    for(let i in props.titles){
        formItems.push(
            <Form.Item
                name={props.keys[i]}
                label={props.titles[i]}
                rules={[
                    {
                        required: true,
                    },
                ]}
            >
                {i==4||i==6?<InputNumber min={0}/>:<Input/>}
            </Form.Item>
        )
    }

    return (
        <Form {...layout} className="userinfo" form={form} name="control-ref" onFinish={onFinish}>
            {formItems}
            <Form.Item {...tailLayout}>
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
                <Button htmlType="button" onClick={onReset}>
                    Reset
                </Button>
            </Form.Item>
        </Form>
    )
}

class BookTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {editRow: -1};
    }

    showEditor(rowIndex) {
        this.setState({editRow: rowIndex});
    }

    closeEditor(rowIndex) {
        if (rowIndex === this.state.editRow || this.state.editRow === -1) {
            return;
        }
        this.setState({editRow: -1});
        // console.log("close",this.is_editing_books[0][2]);
        this.props.updateBooks(this.is_editing_books);
    }

    onChange(key, col, e) {//如果每输入一次就更新state 会导致排序+输入的情况下 输入未完成表格就变了
        // console.log(key,col,e.target.value);
        for(let index in this.is_editing_books){
            if(this.is_editing_books[index][0]==key){
                this.is_editing_books[index][col + 1] = e.target.value;
                break;
            }
        }
    }

    handleRemove(book){
        let del = window.confirm("确认删除吗？");
        if(!del){
            return;
        }
        this.props.handleRemove(book);
        this.setState({editRow:-1});
    }

    render() {
        let is_editing_books_shallow = this.props.books.slice();
        //虽然可以利用浅拷贝的数据共享内存来避免复杂的调用关系 但因为数据之后是后端给的  不确定具体格式
        this.is_editing_books = [];
        for (let book of is_editing_books_shallow) {
            this.is_editing_books.push(JSON.parse(JSON.stringify(book)));//深拷贝对象
        }
        // console.log(this.is_editing_books[0][2]);
        const dataSource = [];
        for (let book of this.props.books) {
            dataSource.push(
                {
                    bookID: book.bookID,//方便定位
                    isbn:book.isbn,
                    name: book.name,
                    type: book.type,
                    author: book.author,
                    price: book.price,
                    description: book.description,
                    inventory: book.inventory,
                    image: book.image,//展示text
                }
            )
        }

        const columns = []
        for (let i in this.props.headerTitles) {
            columns.push(
                {
                    title: this.props.headerTitles[i],
                    dataIndex: this.props.headerKeys[i],
                    key: this.props.headerKeys[i],
                    onDoubleClick: this.showEditor,
                    render: (text, record, index) =>
                        // this.state.editRow == index && i != 0 && !this.props.closeInput? <Input defaultValue={text} onChange={this.onChange.bind(this, index, parseInt(i))}/> : text
                        this.state.editRow == index && i!=0 ?
                            <Input defaultValue={text} onChange={this.onChange.bind(this, record['key'], parseInt(i))} /> :
                                text
                }
            )
        }
        columns[0]['width'] = 70;
        columns[0]['sorter'] = (a, b) => a.bookID - b.bookID;
        columns[5]['sorter'] = (a, b) => a.price - b.price;
        columns[6]['ellipsis'] = true;
        columns[7]['sorter'] = (a, b) => a.inventory - b.inventory;
        columns.push(
            {
                title: '操作',
                render: (book) => (
                    <Button onClick={this.handleRemove.bind(this, book)}>删除</Button>
                )
            }
        )
        return (
            <Table
                onRow={(record, index) => {
                    return {
                        onDoubleClick: event => {
                            this.showEditor(index)
                        },
                        onClick: event => {
                            this.closeEditor(index)
                        }
                    };
                }}//onCell没用
                onHeaderRow={() => {
                    return {
                        onClick: event => {
                            this.closeEditor(-1)
                        }
                    };
                }}//onCell没用
                dataSource={dataSource} columns={columns} className="book_manage_table"
            />
        )
    }
}

export class BookManagement extends React.Component {

    constructor(props) {
        super(props);

        // const books = getBooks();
        this.translate = {'bookID':'序号','name':'书名','type':'分类','author':'作者','price':'价格','description':'描述','image':'图片','inventory':'库存'};
        this.headerTitles =[]// ['序号', '书名', '分类', '作者', '价格', '描述', '库存量', '封面'];
        this.headerKeys = []//['key', 'name', 'type', 'author', 'price', 'description', 'storage', 'image'];
        this.editRow = -1;
        this.state = {savedBooks: null, books: null ,searchName: "",closeInput:false};
        this.handleSearch = this.handleSearch.bind(this);
        this.handleClear = this.handleClear.bind(this);
        this.updateBooks = this.updateBooks.bind(this);
        this.handleRemove = this.handleRemove.bind(this);
        this.handleAdd = this.handleAdd.bind(this);
    }

    componentDidMount(){
        getBooks((data) => {
            let book  = data[0];
            console.log(book);
            for(let key in book){
                // console.log(key);
                if(this.translate[key]){
                    this.headerTitles.push(this.translate[key]);
                }else{
                    this.headerTitles.push(key);
                }
                this.headerKeys.push(key);
            }
            this.setState({savedBooks: data,books:data.slice()});
        })
    }

    handleSearch(books) {
        // console.log(books.length);
        this.setState({books: books,closeInput:true});
    }

    handleClear() {
        // console.log("handle");
        this.setState({books: this.state.savedBooks,closeInput:true});
    }

    handleAdd(book){
        // book.unshift(this.state.savedBooks.length+1);
        // book.unshift(this.state.savedBooks.length+1);
        // // console.log(book);
        // let books = this.state.books;
        // let saved = this.state.savedBooks;
        // books.unshift(book);
        // saved.unshift(book);//默认插在第一行 可以按序号排序  后续可以通过后端再排序
        // this.setState({books:books,savedBooks:saved});
        addBook(book);
        getBooks((data) => {
            this.setState({savedBooks: data,books:data.slice()});
        });

    }

    handleRemove(book){
        removeBook(book.bookID);
        getBooks((data) => {
            this.setState({savedBooks: data,books:data.slice()});
        });
        // let saved = this.state.savedBooks;
        // for(let index in saved){
        //     if(saved[index][0]==key){
        //         saved.splice(index,1);
        //         break;
        //     }
        // }
        // this.setState({books:books,savedBooks:saved});
    }
    updateBooks(books) {
        // console.log(books[0][2],"?");
        let saved = this.state.savedBooks;
        for(let index in saved){
            for(let book of books){
                if(book[0] === saved[index][0]){
                    saved[index] = book.slice();
                    break;
                }
            }
        }
        this.setState({books: books, savedBooks: saved});
    }

    render() {
        if(!this.state.savedBooks){
            return <div/>;
        }
        console.log('render savedBooks:', this.state.savedBooks);
        return (

            <Layout>
                <BookForm titles={this.headerTitles.slice(1,this.headerTitles.length)} keys={this.headerKeys.slice(1,this.headerKeys.length)} handleAdd={this.handleAdd}/>
                <SearchBook initialBooks={this.state.savedBooks} books={this.state.books}
                            handleSearch={this.handleSearch} handleClear={this.handleClear}/>
                {/*<BookTable closeInput={this.state.closeInput}books={this.state.books} updateBooks={this.updateBooks} handleRemove={this.handleRemove}/>*/}
                <BookTable headerTitles={this.headerTitles} headerKeys={this.headerKeys}books={this.state.books} updateBooks={this.updateBooks} handleRemove={this.handleRemove}/>
            </Layout>
        )
    }
}