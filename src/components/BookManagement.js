import {Button, Form, Image, Input, InputNumber, Layout, Select, Table} from "antd";
import {getBooks, addBook, removeBook, updateBook, getBooks_now} from "../service/BookService";
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
        console.log(this.is_editing_books[this.state.editRow]);
        let del = window.confirm("确认修改吗？");
        if(!del){
            this.props.updateBook(null);
        }else{
            this.props.updateBook(this.is_editing_books[this.state.editRow]);
        }
        this.setState({editRow: -1});
    }

    onChange(book, col, e) {//如果每输入一次就更新state 会导致排序+输入的情况下 输入未完成表格就变了
        for(let index in this.is_editing_books){
            if(this.is_editing_books[index].bookID===book.bookID){
                this.is_editing_books[index][this.props.headerKeys[col]] = e.target.value;
                break;
            }
        }
        // console.log(this.is_editing_books);
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
                    render: (text, book, index) =>
                        this.state.editRow == index && i!=0 ?
                            <Input defaultValue={text} onChange={this.onChange.bind(this, book, parseInt(i))} /> :
                            i!= 8 ? text : <Image src = {text} alt={text}/>

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
        this.updateBook = this.updateBook.bind(this);
        this.handleRemove = this.handleRemove.bind(this);
        this.handleAdd = this.handleAdd.bind(this);
    }

    copyData(data){
        let res = data.slice();
        for(let i in res){
            res[i] = JSON.parse(JSON.stringify(res[i]));
        }
        return res;
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
            this.setState({savedBooks: data,books:this.copyData(data)});
        })
    }

    updateBooks(){
        getBooks((data) => {
            this.setState({savedBooks: data,books:this.copyData(data)});
        });
    }

    handleSearch(books) {
        // console.log(books.length);
        this.setState({books: books,closeInput:true});
    }

    handleClear() {
        // console.log("handle");
        this.setState({books: this.state.savedBooks,closeInput:true});
    }

    async handleAdd(book) {
        // book.unshift(this.state.savedBooks.length+1);
        // book.unshift(this.state.savedBooks.length+1);
        // // console.log(book);
        // let books = this.state.books;
        // let saved = this.state.savedBooks;
        // books.unshift(book);
        // saved.unshift(book);//默认插在第一行 可以按序号排序  后续可以通过后端再排序
        // this.setState({books:books,savedBooks:saved});
        await addBook(book);
        this.updateBooks();

    }

    async handleRemove(book) {
        await removeBook(book.bookID);
        this.updateBooks();
        // let saved = this.state.savedBooks;
        // for(let index in saved){
        //     if(saved[index][0]==key){
        //         saved.splice(index,1);
        //         break;
        //     }
        // }
        // this.setState({books:books,savedBooks:saved});
    }
    /*
    需要保证更新后可以立马看到数据
    如果update操作是异步的  那不管之后的getBooks是同步的还是异步的  得到的可能都是修改之前的数据
    所以必须保证update操作是同步的（阻塞）

    另外两种解决方法：
    1、前端直接修改数据 但是这可能和后端的不匹配
    2、后端update返回Books 异步setState 但这样传递的大量数据都是浪费的

    必须保证所有的函数调用都有async await

     */
    async updateBook(book) {
        console.log(book);
        await updateBook(book);

        this.updateBooks();
    }

    render() {
        if(!this.state.savedBooks){
            return <div/>;
        }
        // console.log('render savedBooks:', this.state.savedBooks);
        return (

            <Layout>
                <BookForm titles={this.headerTitles.slice(1,this.headerTitles.length)} keys={this.headerKeys.slice(1,this.headerKeys.length)} handleAdd={this.handleAdd}/>
                <SearchBook initialBooks={this.state.savedBooks} books={this.state.books}
                            handleSearch={this.handleSearch} handleClear={this.handleClear}/>
                {/*<BookTable closeInput={this.state.closeInput}books={this.state.books} updateBooks={this.updateBooks} handleRemove={this.handleRemove}/>*/}
                <BookTable headerTitles={this.headerTitles} headerKeys={this.headerKeys}books={this.state.books} updateBook={this.updateBook} handleRemove={this.handleRemove}/>
            </Layout>
        )
    }
}