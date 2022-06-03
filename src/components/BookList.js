import React from 'react';
import {Link} from 'react-router-dom'
import {Card, List} from "antd";
import {BookCard} from "./BookCard";


export class BookList extends React.Component {

    constructor(props) {
        super(props);
        // console.log(this.props.books);
    }

    render() {

        if(!this.props.books){
            return <div></div>;
        }
        console.log(this.props.books);
        return (
            <div className="bookstore">
                <List
                    grid={{gutter: 10, column: 5}}
                    dataSource={this.props.books}
                    pagination={{
                        onChange: page => {
                            console.log(page);
                        },
                        pageSize: 15,
                    }}

                    renderItem={book => (
                        <List.Item>
                            <BookCard book={book} />
                        </List.Item>
                    )}
                />
            </div>
        );
    }

}

