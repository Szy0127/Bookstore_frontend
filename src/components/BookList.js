import React from 'react';
import {Link} from 'react-router-dom'
export class BookList extends React.Component {

    constructor(props) {
        super(props);
        console.log(this.props.books);
    }

    render() {
        let bookDisplay = [];
        let row = [];
        const col_number = 4;
        let index = 0;
        for (let book of this.props.books) {
            console.log(1);
            row.push(
                <div className="col-lg-3">
                    <Link
                        to={{
                            pathname: '/bookDetails/' ,
                            search: '?id=' + book[0]}}
                        target="_blank"
                    >
                        <img className="home_book_img" src={book[8]} alt={book[2]}/>
                    </Link>
                </div>
            );
            index += 1;
            if(index === col_number){
                bookDisplay.push(
                    <div className="row">
                        {row}
                    </div>
                );
                row = [];
                index = 0;
            }
        }
        bookDisplay.push(
            <div className="row">
                {row}
            </div>
        );

        return (
            <div className="bookstore">
                {bookDisplay}
            </div>
        );
    }

}

