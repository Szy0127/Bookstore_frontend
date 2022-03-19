import React from 'react';
import {getBook} from "../service/BookService";
import "../css/book.css";
export class Book extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {

        let book = getBook(this.props.bookId);
        let img_width = this.props.book_width? this.props.width : 230;
        return (
            <React.Fragment>
                <img className="book_img" src={book[8]} style={{width:img_width}}/>
                <div className="book_info">
                    <div className="book_name">{book[2]}</div>
                    <span className="book_description">{book[3]}</span></div>
            </React.Fragment>
        );
    }

}

