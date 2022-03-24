import React from 'react';
import {Link} from 'react-router-dom'
import {Card, List} from "antd";
const {Meta} = Card;

const BookCard = (props)=>{
    return (
        <Link to={{
        pathname: '/bookDetails',
        search: '?id=' + props.book[0]}}
          target="_blank"
    >
        <Card
            hoverable
            style={{width: 181}}
            cover={<img alt="image" src={props.book[8]} className={"bookImg"}/>}
        >
            <Meta title={props.book[2]} description={'¥' + props.book[5]}/>
        </Card>
    </Link>
    )
}
export class BookList extends React.Component {

    constructor(props) {
        super(props);
        // console.log(this.props.books);
    }

    render() {

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

