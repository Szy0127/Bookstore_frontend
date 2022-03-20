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
        this.books = getBooks();
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
        // console.log(books);
        // console.log(bookName);
        this.setState({books: books, search_book: bookName});
    }

    handleClear() {
        this.setState({books: this.books.slice(), search_book: ""});
    }

    render() {
        console.log(this.state.books);
        return (
            <Layout>
                <HeaderInfo/>
                <div className='container'>
                    <SearchBook books={this.books} search_book={this.state.search_book} handleSearch={this.handleSearch}
                                handleClear={this.handleClear}/>
                    <BookCarousel/>
                    <BookList books={this.state.books}/>
                </div>
            </Layout>


        );
    }
}

export default HomeView;