import React from 'react';
// import {Layout, Carousel} from 'antd'
// import {HeaderInfo} from "../components/HeaderInfo";
// import {SideBar} from "../components/SideBar";
import '../css/home.css'
import '../css/bootstrap.min.css'
import {Layout} from 'antd'
import {BookList} from "../components/BookList";
import {HeaderInfo} from "../components/HeaderInfo";
import {SearchBook} from "../components/SearchBook";
import {BookCarousel} from "../components/BookCarousel";
import {getBooks} from "../service/BookService";

class HomeView extends React.Component {

    constructor(props) {
        super(props);
        this.state = {books: null};
        this.handleSearch = this.handleSearch.bind(this);
        this.handleClear = this.handleClear.bind(this);
    }

    componentDidMount(){

        getBooks((data) => {
            console.log(data);
            this.setState({books: data});
            this.books = data;
        })
    }
    handleSearch(books) {
        this.setState({books: books});
    }

    handleClear() {
        this.setState({books: this.books.slice()});
    }

    /*
    this.book保存了getBooks拿到的所有书的备份
    this.state.book 结合search进行展示


     */
    render() {

        return (
            <Layout>
                <HeaderInfo navID={0}/>
                <div className='container'>
                    <SearchBook books={this.books} handleSearch={this.handleSearch} handleClear={this.handleClear}/>
                    <BookCarousel/>
                    <BookList books={this.state.books}/>
                </div>
            </Layout>


        );
    }
}

export default HomeView;
