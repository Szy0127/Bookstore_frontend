import React from 'react';
import "../css/book.css";
export class Book extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {

        // let book = getBook(this.props.bookId);
        let img_width = this.props.book_width? this.props.width : 230;
        return (
            <React.Fragment>
                <img className="book_img" src={this.props.book['image']} style={{width:img_width}}/>
                <div className="book_info">
                    <div className="book_name">{this.props.book['name']}</div>
                    <span className="book_description">{this.props.book['description']}</span></div>
            </React.Fragment>
        );
    }

}

